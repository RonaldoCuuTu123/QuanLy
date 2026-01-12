// ============================================
// FILE: back-end/src/models/TemporaryAbsence.js
// ============================================
import { DataTypes } from "sequelize";
import sequelize from "../config/dbsetup.js";
import Resident from "./Resident.js";
import Household from "./Household.js";
import User from "./User.js";

const TemporaryAbsence = sequelize.define("TemporaryAbsence", {
    AbsenceID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ResidentID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Resident, key: "ResidentID" }
    },
    HouseholdID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Household, key: "HouseholdID" }
    },
    StartDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    EndDate: {
        type: DataTypes.DATEONLY
    },
    Destination: {
        type: DataTypes.STRING(200)
    },
    Reason: {
        type: DataTypes.TEXT
    },
    Status: {
        type: DataTypes.ENUM('Đang vắng', 'Đã về'),
        defaultValue: 'Đang vắng'
    },
    ApprovedBy: {
        type: DataTypes.INTEGER,
        references: { model: User, key: "UserID" }
    },
    ApprovalDate: {
        type: DataTypes.DATEONLY
    },
    Notes: {
        type: DataTypes.TEXT
    },
    CreatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "TemporaryAbsence",
    timestamps: false
});

TemporaryAbsence.belongsTo(Resident, { foreignKey: "ResidentID" });
TemporaryAbsence.belongsTo(Household, { foreignKey: "HouseholdID" });
TemporaryAbsence.belongsTo(User, { foreignKey: "ApprovedBy", as: "Approver" });

export default TemporaryAbsence;
