import * as feeDetailServices from '../services/FeeDetailServices.js';
import sequelize from '../config/dbsetup.js';
import FeeDetail from '../models/FeeDetail.js';
import FeeCollection from '../models/FeeCollection.js';
import Household from '../models/Household.js';

// Map từ FeeDetail sang Payment format (PascalCase to camelCase)
const mapFeeDetailToPayment = (feeDetail) => {
    if (!feeDetail) return null;

    return {
        id: feeDetail.FeeDetailID,
        paymentId: feeDetail.FeeDetailID,
        householdId: feeDetail.HouseholdID,
        campaignId: feeDetail.CollectionID,
        collectionId: feeDetail.CollectionID,
        amount: feeDetail.Amount || 0,
        paymentDate: feeDetail.PaymentDate,
        paymentMethod: feeDetail.PaymentMethod || 'Tiền mặt',
        paymentStatus: feeDetail.PaymentStatus || 'Đã đóng',
        collectorName: feeDetail.CollectorName || 'Nguyễn Văn Cường',
        status: feeDetail.PaymentStatus === 'Đã đóng' ? 'Hoàn thành' : 'Chưa đóng'
    };
};

// Lấy tất cả thanh toán
export const getAllPayments = async (req, res) => {
    try {
        const feeDetails = await FeeDetail.findAll({
            attributes: [
                'FeeDetailID',
                'CollectionID',
                'HouseholdID',
                'Amount',
                'PaymentDate',
                'PaymentMethod',
                'PaymentStatus'
                // 'CollectorName'  // ❌ SKIP - không tồn tại trong DB
            ],
            include: [
                { model: FeeCollection, attributes: ['CollectionID', 'CollectionName'] },
                { model: Household, attributes: ['HouseholdID', 'HouseholdNumber'] }
            ]
        });

        const payments = feeDetails.map(mapFeeDetailToPayment);
        res.status(200).json(payments);
    } catch (error) {
        console.error('Error retrieving payments:', error);
        res.status(500).json({ error: true, message: 'Error retrieving payments', details: error.message });
    }
};

// Lấy thanh toán theo ID
export const getPaymentById = async (req, res) => {
    try {
        const { id } = req.params;
        const feeDetail = await FeeDetail.findByPk(id, {
            include: [
                { model: FeeCollection },
                { model: Household }
            ]
        });

        if (!feeDetail) {
            return res.status(404).json({ error: true, message: 'Payment not found' });
        }

        res.status(200).json(mapFeeDetailToPayment(feeDetail));
    } catch (error) {
        console.error('Error retrieving payment:', error);
        res.status(500).json({ error: true, message: 'Error retrieving payment', details: error.message });
    }
};

// Tạo thanh toán mới
export const createPayment = async (req, res) => {
    try {
        const {
            householdId, campaignId, amount, paymentDate, paymentMethod, collectorName
        } = req.body;

        // Ưu tiên lấy camelCase từ FE hoặc PascalCase nếu FE thay đổi
        const hId = householdId || req.body.HouseholdID;
        const cId = campaignId || req.body.CollectionID;

        if (!hId || !cId) {
            return res.status(400).json({ error: true, message: 'Thiếu mã hộ khẩu hoặc mã đợt thu' });
        }

        const newPayment = await FeeDetail.create({
            CollectionID: cId,
            HouseholdID: hId,
            Amount: amount || 0,
            PaymentDate: paymentDate || new Date(),
            PaymentMethod: paymentMethod || 'Tiền mặt',
            PaymentStatus: 'Đã đóng',
            CollectorName: collectorName || 'Cán bộ thu phí'
        });

        res.status(201).json({ error: false, message: 'Thu phí thành công', data: newPayment });
    } catch (error) {
        console.error('Lỗi thu phí:', error);
        res.status(500).json({ error: true, message: error.message });
    }
};

// Cập nhật thanh toán
export const updatePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            Amount,
            amount,
            PaymentDate,
            paymentDate,
            PaymentMethod,
            paymentMethod,
            PaymentStatus,
            paymentStatus
        } = req.body;

        const feeDetail = await FeeDetail.findByPk(id);
        if (!feeDetail) {
            return res.status(404).json({ error: true, message: 'Payment not found' });
        }

        // Update fields
        if (Amount !== undefined || amount !== undefined) {
            feeDetail.Amount = Amount || amount;
        }
        if (PaymentDate || paymentDate) {
            feeDetail.PaymentDate = PaymentDate || paymentDate;
        }
        if (PaymentMethod || paymentMethod) {
            feeDetail.PaymentMethod = PaymentMethod || paymentMethod;
        }
        if (PaymentStatus || paymentStatus) {
            feeDetail.PaymentStatus = PaymentStatus || paymentStatus;
        }

        await feeDetail.save();

        const updatedPayment = await FeeDetail.findByPk(id, {
            include: [
                { model: FeeCollection },
                { model: Household }
            ]
        });

        res.status(200).json(mapFeeDetailToPayment(updatedPayment));
    } catch (error) {
        console.error('Error updating payment:', error);
        res.status(500).json({ error: true, message: 'Error updating payment', details: error.message });
    }
};

// Xóa thanh toán
export const deletePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const feeDetail = await FeeDetail.findByPk(id);

        if (!feeDetail) {
            return res.status(404).json({ error: true, message: 'Payment not found' });
        }

        await feeDetail.destroy();
        res.status(200).json({ error: false, message: 'Payment deleted successfully' });
    } catch (error) {
        console.error('Error deleting payment:', error);
        res.status(500).json({ error: true, message: 'Error deleting payment', details: error.message });
    }
};
