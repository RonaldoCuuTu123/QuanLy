// ============================================
// FILE: back-end/src/models/HouseholdHistory.js
// ============================================
import { DataTypes } from "sequelize";
import sequelize from "../config/dbsetup.js";
import Household from "./Household.js";
import User from "./User.js";

const HouseholdHistory = sequelize.define("HouseholdHistory", {
    HistoryID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    HouseholdID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Household, key: "HouseholdID" }
    },
    ChangeType: {
        type: DataTypes.ENUM('Thay đổi chủ hộ', 'Thay đổi địa chỉ', 'Thay đổi thông tin khác'),
        allowNull: false
    },
    ChangeContent: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    OldValue: {
        type: DataTypes.TEXT
    },
    NewValue: {
        type: DataTypes.TEXT
    },
    ChangeDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    ChangedBy: {
        type: DataTypes.INTEGER,
        references: { model: User, key: "UserID" }
    },
    Notes: {
        type: DataTypes.TEXT
    },
    CreatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "HouseholdHistory",
    timestamps: false
});

HouseholdHistory.belongsTo(Household, { foreignKey: "HouseholdID" });
HouseholdHistory.belongsTo(User, { foreignKey: "ChangedBy", as: "Changer" });

export default HouseholdHistory;