import * as tempAbsenceService from '../services/TemporaryAbsenceServices.js';

// Lấy tất cả giấy tạm vắng
export const getAllTemporaryAbsences = async (req, res) => {
    try {
        const absences = await tempAbsenceService.getAllAbsences();
        res.status(200).json({ error: false, absences });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Error retrieving absences', detail: error.message });
    }
};

// Tạo giấy tạm vắng
export const createTemporaryAbsence = async (req, res) => {
    try {
        const { ResidentID, HouseholdID, StartDate, EndDate, Destination, Reason, ApprovedBy, Notes } = req.body;

        if (!ResidentID || !HouseholdID || !StartDate) {
            return res.status(400).json({ error: true, message: 'Missing required fields' });
        }

        const newAbsence = await tempAbsenceService.createAbsence({
            ResidentID, HouseholdID, StartDate, EndDate, Destination, Reason,
            ApprovedBy, ApprovalDate: new Date(), Notes
        });

        res.status(201).json({ error: false, absence: newAbsence });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Error creating absence', detail: error.message });
    }
};

// Cập nhật trạng thái (đã về)
export const updateAbsenceStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { Status } = req.body;

        const updated = await tempAbsenceService.updateAbsence(id, { Status });
        if (!updated) return res.status(404).json({ error: true, message: 'Absence not found' });

        res.status(200).json({ error: false, absence: updated });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Error updating absence', detail: error.message });
    }
};

// Lấy danh sách tạm vắng theo household
export const getAbsencesByHousehold = async (req, res) => {
    try {
        const { householdId } = req.params;
        const absences = await tempAbsenceService.getAbsencesByHousehold(householdId);
        res.status(200).json({ error: false, absences });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Error retrieving absences', detail: error.message });
    }
};
