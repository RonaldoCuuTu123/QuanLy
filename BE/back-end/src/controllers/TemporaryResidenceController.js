import * as tempResidenceService from '../services/TemporaryResidenceServices.js';

// Lấy tất cả giấy tạm trú
export const getAllTemporaryResidences = async (req, res) => {
    try {
        const residences = await tempResidenceService.getAllResidences();
        res.status(200).json({ error: false, residences });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Error retrieving residences', detail: error.message });
    }
};

// Tạo giấy tạm trú
export const createTemporaryResidence = async (req, res) => {
    try {
        const { FullName, DateOfBirth, Sex, IDCardNumber, PhoneNumber, PermanentAddress,
            HouseholdID, StartDate, EndDate, Reason, ApprovedBy, Notes } = req.body;

        if (!FullName || !Sex || !PermanentAddress || !HouseholdID || !StartDate) {
            return res.status(400).json({ error: true, message: 'Missing required fields' });
        }

        const newResidence = await tempResidenceService.createResidence({
            FullName, DateOfBirth, Sex, IDCardNumber, PhoneNumber, PermanentAddress,
            HouseholdID, StartDate, EndDate, Reason, ApprovedBy,
            ApprovalDate: new Date(), Notes
        });

        res.status(201).json({ error: false, residence: newResidence });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Error creating residence', detail: error.message });
    }
};

// Cập nhật trạng thái
export const updateResidenceStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { Status } = req.body;

        const updated = await tempResidenceService.updateResidence(id, { Status });
        if (!updated) return res.status(404).json({ error: true, message: 'Residence not found' });

        res.status(200).json({ error: false, residence: updated });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Error updating residence', detail: error.message });
    }
};

// Lấy danh sách tạm trú theo household
export const getResidencesByHousehold = async (req, res) => {
    try {
        const { householdId } = req.params;
        const residences = await tempResidenceService.getResidencesByHousehold(householdId);
        res.status(200).json({ error: false, residences });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Error retrieving residences', detail: error.message });
    }
};
