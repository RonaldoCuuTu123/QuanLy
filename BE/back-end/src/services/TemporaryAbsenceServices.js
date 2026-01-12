// ============================================
// FILE: back-end/src/services/TemporaryAbsenceServices.js
// ============================================
import TemporaryAbsence from '../models/TemporaryAbsence.js';
import Resident from '../models/Resident.js';
import Household from '../models/Household.js';
import User from '../models/User.js';

export const getAllAbsences = async () => {
    return await TemporaryAbsence.findAll({
        include: [
            { model: Resident, attributes: ['FullName', 'DateOfBirth'] },
            { model: Household, attributes: ['RoomNumber'] },
            { model: User, as: 'Approver', attributes: ['FullName'] }
        ],
        order: [['StartDate', 'DESC']]
    });
};

export const getAbsenceById = async (id) => {
    return await TemporaryAbsence.findByPk(id, {
        include: [
            { model: Resident, attributes: ['FullName'] },
            { model: Household, attributes: ['RoomNumber'] }
        ]
    });
};

export const getAbsencesByHousehold = async (householdId) => {
    return await TemporaryAbsence.findAll({
        where: { HouseholdID: householdId },
        include: [
            { model: Resident, attributes: ['FullName'] }
        ],
        order: [['StartDate', 'DESC']]
    });
};

export const createAbsence = async (data) => {
    return await TemporaryAbsence.create(data);
};

export const updateAbsence = async (id, data) => {
    const absence = await TemporaryAbsence.findByPk(id);
    if (!absence) return null;
    await absence.update(data);
    return absence;
};

export const deleteAbsence = async (id) => {
    const absence = await TemporaryAbsence.findByPk(id);
    if (!absence) return null;
    await absence.destroy();
    return true;
};
