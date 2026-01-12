// ============================================
// FILE: back-end/src/services/TemporaryResidenceServices.js
// ============================================
import TemporaryResidence from '../models/TemporaryResidence.js';
import Household from '../models/Household.js';
import User from '../models/User.js';

export const getAllResidences = async () => {
    return await TemporaryResidence.findAll({
        include: [
            { model: Household, attributes: ['RoomNumber', 'HouseholdHead'] },
            { model: User, as: 'Approver', attributes: ['FullName'] }
        ],
        order: [['StartDate', 'DESC']]
    });
};

export const getResidenceById = async (id) => {
    return await TemporaryResidence.findByPk(id, {
        include: [
            { model: Household, attributes: ['RoomNumber'] }
        ]
    });
};

export const getResidencesByHousehold = async (householdId) => {
    return await TemporaryResidence.findAll({
        where: { HouseholdID: householdId },
        order: [['StartDate', 'DESC']]
    });
};

export const createResidence = async (data) => {
    return await TemporaryResidence.create(data);
};

export const updateResidence = async (id, data) => {
    const residence = await TemporaryResidence.findByPk(id);
    if (!residence) return null;
    await residence.update(data);
    return residence;
};

export const deleteResidence = async (id) => {
    const residence = await TemporaryResidence.findByPk(id);
    if (!residence) return null;
    await residence.destroy();
    return true;
};
