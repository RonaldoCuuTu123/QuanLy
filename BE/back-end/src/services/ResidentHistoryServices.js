// ============================================
// FILE: back-end/src/services/ResidentHistoryServices.js
// ============================================
import ResidentHistory from '../models/ResidentHistory.js';
import Resident from '../models/Resident.js';
import Household from '../models/Household.js';

export const getHistoryByResidentId = async (residentId) => {
    return await ResidentHistory.findAll({
        where: { ResidentID: residentId },
        include: [
            { model: Resident, attributes: ['FullName'] },
            { model: Household, attributes: ['RoomNumber'] }
        ],
        order: [['ChangeDate', 'DESC']]
    });
};

export const createHistory = async (data) => {
    return await ResidentHistory.create(data);
};

export const getAllHistory = async () => {
    return await ResidentHistory.findAll({
        include: [
            { model: Resident, attributes: ['FullName'] },
            { model: Household, attributes: ['RoomNumber'] }
        ],
        order: [['ChangeDate', 'DESC']]
    });
};
