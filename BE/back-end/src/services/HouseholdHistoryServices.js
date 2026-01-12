// ============================================
// FILE: back-end/src/services/HouseholdHistoryServices.js
// ============================================
import HouseholdHistory from '../models/HouseholdHistory.js';
import Household from '../models/Household.js';
import User from '../models/User.js';

export const getHistoryByHouseholdId = async (householdId) => {
    return await HouseholdHistory.findAll({
        where: { HouseholdID: householdId },
        include: [
            {
                model: Household,
                attributes: ['RoomNumber', 'HouseholdHead']
            },
            {
                model: User,
                as: 'Changer',
                attributes: ['FullName', 'Role']
            }
        ],
        order: [['ChangeDate', 'DESC']]
    });
};

export const createHistory = async (data) => {
    return await HouseholdHistory.create(data);
};

export const getAllHistory = async () => {
    return await HouseholdHistory.findAll({
        include: [
            { model: Household, attributes: ['RoomNumber', 'HouseholdHead'] },
            { model: User, as: 'Changer', attributes: ['FullName'] }
        ],
        order: [['ChangeDate', 'DESC']]
    });
};