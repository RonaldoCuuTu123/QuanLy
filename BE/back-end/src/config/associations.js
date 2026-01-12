// Setup tất cả associations giữa models
// File này phải được import sau khi tất cả models đã được define

import Household from '../models/Household.js';
import Resident from '../models/Resident.js';
import HouseholdHistory from '../models/HouseholdHistory.js';
import Vehicle from '../models/Vehicle.js';
import FeeCollection from '../models/FeeCollection.js';
import FeeDetail from '../models/FeeDetail.js';
import FeeType from '../models/FeeType.js';
import User from '../models/User.js';
import TemporaryAbsence from '../models/TemporaryAbsence.js';
import TemporaryResidence from '../models/TemporaryResidence.js';
import ResidentHistory from '../models/ResidentHistory.js';

export const setupAssociations = () => {
    // Household - Resident
    Household.hasMany(Resident, {
        foreignKey: 'HouseholdID',
        as: 'Residents',
        onDelete: 'CASCADE'
    });
    Resident.belongsTo(Household, {
        foreignKey: 'HouseholdID'
    });

    // Household - Vehicle
    Household.hasMany(Vehicle, {
        foreignKey: 'HouseholdID',
        as: 'Vehicles',
        onDelete: 'CASCADE'
    });
    Vehicle.belongsTo(Household, {
        foreignKey: 'HouseholdID'
    });

    // Household - HouseholdHistory
    Household.hasMany(HouseholdHistory, {
        foreignKey: 'HouseholdID',
        as: 'History',
        onDelete: 'CASCADE'
    });
    HouseholdHistory.belongsTo(Household, {
        foreignKey: 'HouseholdID'
    });

    // Resident - ResidentHistory
    Resident.hasMany(ResidentHistory, {
        foreignKey: 'ResidentID',
        as: 'ResidentHistory',
        onDelete: 'CASCADE'
    });
    ResidentHistory.belongsTo(Resident, {
        foreignKey: 'ResidentID'
    });

    // Resident - TemporaryAbsence
    Resident.hasMany(TemporaryAbsence, {
        foreignKey: 'ResidentID',
        as: 'TemporaryAbsences',
        onDelete: 'CASCADE'
    });
    TemporaryAbsence.belongsTo(Resident, {
        foreignKey: 'ResidentID'
    });

    // Resident - TemporaryResidence
    Resident.hasMany(TemporaryResidence, {
        foreignKey: 'ResidentID',
        as: 'TemporaryResidences',
        onDelete: 'CASCADE'
    });
    TemporaryResidence.belongsTo(Resident, {
        foreignKey: 'ResidentID'
    });

    // FeeType - FeeCollection
    FeeType.hasMany(FeeCollection, {
        foreignKey: 'FeeTypeID',
        as: 'FeeCollections',
        onDelete: 'CASCADE'
    });
    FeeCollection.belongsTo(FeeType, {
        foreignKey: 'FeeTypeID'
    });

    // FeeCollection - FeeDetail
    FeeCollection.hasMany(FeeDetail, {
        foreignKey: 'CollectionID',
        as: 'FeeDetails',
        onDelete: 'CASCADE'
    });
    FeeDetail.belongsTo(FeeCollection, {
        foreignKey: 'CollectionID'
    });

    // Household - FeeDetail
    Household.hasMany(FeeDetail, {
        foreignKey: 'HouseholdID',
        as: 'FeeDetails',
        onDelete: 'CASCADE'
    });
    FeeDetail.belongsTo(Household, {
        foreignKey: 'HouseholdID'
    });

    console.log('✅ Tất cả associations đã được setup');
};

export default setupAssociations;
