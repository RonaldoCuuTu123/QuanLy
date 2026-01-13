import * as feeCollectionServices from '../services/FeeCollectionServices.js';
import FeeCollection from '../models/FeeCollection.js';
import FeeType from '../models/FeeType.js';

// Map FeeCollection từ DB sang FE format
const mapFeeCollectionToFE = (feeCollection) => {
  if (!feeCollection) return null;

  // Xác định type dựa trên FeeType.Category hoặc FeeTypeName
  let typeValue = 'Tự nguyện'; // default
  if (feeCollection.FeeType) {
    if (feeCollection.FeeType.Category === 'Bắt buộc' || feeCollection.FeeType.FeeTypeName === 'Bắt buộc') {
      typeValue = 'Bắt buộc';
    }
  } else if (feeCollection.FeeTypeID === 1) {
    // Fallback: nếu không có FeeType object, dựa vào ID
    typeValue = 'Bắt buộc';
  }

  return {
    id: feeCollection.CollectionID,
    CollectionID: feeCollection.CollectionID,
    name: feeCollection.CollectionName,
    CollectionName: feeCollection.CollectionName,
    type: typeValue,
    feeTypeId: feeCollection.FeeTypeID,
    FeeTypeID: feeCollection.FeeTypeID,
    amount: feeCollection.TotalAmount || 0,
    TotalAmount: feeCollection.TotalAmount || 0,
    // Bỏ AmountPerMonth nếu không có trong DB
    startDate: feeCollection.StartDate,
    StartDate: feeCollection.StartDate,
    endDate: feeCollection.EndDate,
    EndDate: feeCollection.EndDate,
    description: feeCollection.Notes || '',
    Notes: feeCollection.Notes || '',
    status: feeCollection.Status || 'Đang thu',
    Status: feeCollection.Status || 'Đang thu'
  };
};

// Lấy tất cả đợt thu phí
export const getAllFeeCollections = async (req, res) => {
  try {
    const feeCollections = await FeeCollection.findAll({
      attributes: [
        'CollectionID',
        'FeeTypeID',
        'CollectionName',
        'StartDate',
        'EndDate',
        'TotalAmount',
        'Status',
        'Notes'
      ],
      // Đồng bộ attributes của FeeType - thêm Category để xác định type
      include: [{ model: FeeType, attributes: ['FeeTypeID', 'FeeTypeName', 'Category'] }]
    });

    const formattedCollections = feeCollections.map(mapFeeCollectionToFE);
    res.status(200).json(formattedCollections);
  } catch (error) {
    console.error('Error retrieving fee collections:', error);
    res.status(500).json({ error: true, message: 'Error retrieving fee collections', details: error.message });
  }
};

// Lấy đợt thu phí theo ID
export const getFeeCollectionById = async (req, res) => {
  try {
    const { id } = req.params;
    const feeCollection = await FeeCollection.findByPk(id, {
      include: [{ model: FeeType, attributes: ['FeeTypeID', 'FeeTypeName', 'Category'] }]
    });

    if (!feeCollection) {
      return res.status(404).json({ error: true, message: 'FeeCollection not found' });
    }

    res.status(200).json(mapFeeCollectionToFE(feeCollection));
  } catch (error) {
    console.error('Error retrieving fee collection:', error);
    res.status(500).json({ error: true, message: 'Error retrieving fee collection', details: error.message });
  }
};

// Thêm đợt thu phí mới
export const createFeeCollection = async (req, res) => {
  try {
    const {
      FeeTypeID,
      feeTypeId,
      CollectionName,
      name,
      StartDate,
      startDate,
      EndDate,
      endDate,
      Amount,
      amount,
      TotalAmount,
      Description,
      description,
      Notes,
      Status,
      status
    } = req.body;

    const feeTypeID = FeeTypeID || feeTypeId || 1;
    const collectionName = CollectionName || name;
    const sDate = StartDate || startDate;
    const eDate = EndDate || endDate;
    const totalAmount = Amount || amount || TotalAmount || 0;
    const notes = Description || description || Notes || '';
    const stat = Status || status || 'Đang thu';

    if (!collectionName || !sDate) {
      return res.status(400).json({ error: true, message: 'CollectionName and StartDate are required' });
    }

    // Kiểm tra FeeTypeID có tồn tại không
    const feeType = await FeeType.findByPk(feeTypeID);
    if (!feeType) {
      return res.status(400).json({ 
        error: true, 
        message: `FeeTypeID ${feeTypeID} không tồn tại. Vui lòng kiểm tra lại.` 
      });
    }

    // Validate Status phải là một trong các giá trị ENUM
    const validStatuses = ['Đang thu', 'Hoàn thành', 'Kết thúc'];
    if (stat && !validStatuses.includes(stat)) {
      return res.status(400).json({ 
        error: true, 
        message: `Status không hợp lệ. Phải là một trong: ${validStatuses.join(', ')}` 
      });
    }

    // KHÔNG chèn AmountPerMonth vào đây nếu DB không có trường này
    const newFeeCollection = await FeeCollection.create({
      FeeTypeID: feeTypeID,
      CollectionName: collectionName,
      StartDate: sDate,
      EndDate: eDate || null,
      TotalAmount: totalAmount,
      Status: stat,
      Notes: notes
    });

    // Fetch lại bản ghi vừa tạo kèm quan hệ FeeType để trả về FE
    const created = await FeeCollection.findByPk(newFeeCollection.CollectionID, {
      include: [{ model: FeeType, attributes: ['FeeTypeID', 'FeeTypeName', 'Category'] }]
    });

    if (!created) {
      return res.status(500).json({ error: true, message: 'Không thể lấy lại dữ liệu vừa tạo' });
    }

    const mappedData = mapFeeCollectionToFE(created);
    if (!mappedData) {
      return res.status(500).json({ error: true, message: 'Lỗi khi map dữ liệu' });
    }

    res.status(201).json(mappedData);
  } catch (error) {
    console.error('Error creating fee collection:', error);
    res.status(500).json({ 
      error: true, 
      message: 'Error creating fee collection', 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Cập nhật đợt thu phí
export const updateFeeCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const feeCollection = await FeeCollection.findByPk(id);

    if (!feeCollection) return res.status(404).json({ error: true, message: 'FeeCollection not found' });

    const updates = {
      CollectionName: req.body.CollectionName || req.body.name,
      StartDate: req.body.StartDate || req.body.startDate,
      EndDate: req.body.EndDate || req.body.endDate,
      TotalAmount: req.body.TotalAmount || req.body.amount,
      Status: req.body.Status || req.body.status,
      Notes: req.body.Notes || req.body.description
    };

    Object.keys(updates).forEach(key => updates[key] === undefined && delete updates[key]);

    await feeCollection.update(updates);
    const updated = await FeeCollection.findByPk(id, {
      include: [{ model: FeeType, attributes: ['FeeTypeID', 'FeeTypeName', 'Category'] }]
    });

    res.status(200).json(mapFeeCollectionToFE(updated));
  } catch (error) {
    console.error('Error updating fee collection:', error);
    res.status(500).json({ error: true, message: 'Error updating fee collection', details: error.message });
  }
};

// Xóa đợt thu phí
export const deleteFeeCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const feeCollection = await FeeCollection.findByPk(id);

    if (!feeCollection) return res.status(404).json({ error: true, message: 'FeeCollection not found' });

    await feeCollection.destroy();
    res.status(200).json({ error: false, message: 'FeeCollection deleted successfully' });
  } catch (error) {
    console.error('Error deleting fee collection:', error);
    res.status(500).json({ error: true, message: 'Error deleting fee collection', details: error.message });
  }
};