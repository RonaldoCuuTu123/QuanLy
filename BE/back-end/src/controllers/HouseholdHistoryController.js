import * as householdHistoryService from '../services/HouseholdHistoryServices.js';

// Lấy lịch sử thay đổi của một hộ
export const getHouseholdHistory = async (req, res) => {
    try {
        const { householdId } = req.params;
        const history = await householdHistoryService.getHistoryByHouseholdId(householdId);
        res.status(200).json({ error: false, history });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Error retrieving history', detail: error.message });
    }
};

// Thêm lịch sử thay đổi thủ công
export const createHouseholdHistory = async (req, res) => {
    try {
        const { HouseholdID, ChangeType, ChangeContent, OldValue, NewValue, ChangeDate, ChangedBy, Notes } = req.body;

        if (!HouseholdID || !ChangeType || !ChangeContent || !ChangeDate) {
            return res.status(400).json({ error: true, message: 'Missing required fields' });
        }

        const newHistory = await householdHistoryService.createHistory({
            HouseholdID, ChangeType, ChangeContent, OldValue, NewValue, ChangeDate, ChangedBy, Notes
        });

        res.status(201).json({ error: false, history: newHistory });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Error creating history', detail: error.message });
    }
};