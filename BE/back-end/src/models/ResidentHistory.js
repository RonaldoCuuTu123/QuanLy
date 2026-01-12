// ============================================
// FILE: back-end/src/models/ResidentHistory.js
// ============================================
import { DataTypes } from "sequelize";
import sequelize from "../config/dbsetup.js";
import Resident from "./Resident.js";
import Household from "./Household.js";

const ResidentHistory = sequelize.define("ResidentHistory", {
    HistoryID: {
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
    ChangeType: {
        type: DataTypes.ENUM('Chuyển đi', 'Qua đời', 'Thay đổi thông tin', 'Thêm mới'),
        allowNull: false
    },
    ChangeDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Destination: {
        type: DataTypes.STRING(200)
    },
    Reason: {
        type: DataTypes.TEXT
    },
    Notes: {
        type: DataTypes.TEXT
    },
    CreatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "ResidentHistory",
    timestamps: false
});

ResidentHistory.belongsTo(Resident, { foreignKey: "ResidentID" });
ResidentHistory.belongsTo(Household, { foreignKey: "HouseholdID" });

export default ResidentHistory;
