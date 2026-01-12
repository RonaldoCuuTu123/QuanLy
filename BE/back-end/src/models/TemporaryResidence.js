// ============================================
// FILE: back-end/src/models/TemporaryResidence.js
// ============================================
import { DataTypes } from "sequelize";
import sequelize from "../config/dbsetup.js";
import Household from "./Household.js";
import User from "./User.js";

const TemporaryResidence = sequelize.define("TemporaryResidence", {
    ResidenceID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    FullName: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    DateOfBirth: {
        type: DataTypes.DATEONLY
    },
    Sex: {
        type: DataTypes.ENUM('Nam', 'Nữ'),
        allowNull: false
    },
    IDCardNumber: {
        type: DataTypes.STRING(20)
    },
    PhoneNumber: {
        type: DataTypes.STRING(20)
    },
    PermanentAddress: {
        type: DataTypes.TEXT,
        allowNull: false
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
    Reason: {
        type: DataTypes.TEXT
    },
    Status: {
        type: DataTypes.ENUM('Đang tạm trú', 'Đã kết thúc'),
        defaultValue: 'Đang tạm trú'
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
    tableName: "TemporaryResidence",
    timestamps: false
});

TemporaryResidence.belongsTo(Household, { foreignKey: "HouseholdID" });
TemporaryResidence.belongsTo(User, { foreignKey: "ApprovedBy", as: "Approver" });

export default TemporaryResidence;
