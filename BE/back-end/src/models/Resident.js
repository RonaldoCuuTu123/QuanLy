import { DataTypes } from "sequelize";
import sequelize from "../config/dbsetup.js";
import Household from "./Household.js";

const Resident = sequelize.define("Resident", {
  ResidentID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  HouseholdID: {
    type: DataTypes.INTEGER,
    references: { model: Household, key: "HouseholdID" }
  },
  FullName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Nickname: {
    type: DataTypes.STRING(50)
  },
  DateOfBirth: {
    type: DataTypes.DATEONLY
  },
  PlaceOfBirth: {
    type: DataTypes.STRING(100)
  },
  Hometown: {
    type: DataTypes.STRING(100)
  },
  Ethnicity: {
    type: DataTypes.STRING(50),
    defaultValue: 'Kinh'
  },
  Sex: {
    type: DataTypes.ENUM('Nam', 'Nữ'),
    allowNull: false
  },
  Relationship: {
    type: DataTypes.ENUM('Chủ hộ', 'Vợ', 'Chồng', 'Con', 'Cha', 'Mẹ', 'Anh', 'Chị', 'Em', 'Khác'),
    allowNull: false
  },
  PhoneNumber: {
    type: DataTypes.STRING(20)
  },
  EducationLevel: {
    type: DataTypes.STRING(50)
  },
  Occupation: {
    type: DataTypes.STRING(100)
  },
  Workplace: {
    type: DataTypes.STRING(200)
  },
  IDCardNumber: {
    type: DataTypes.STRING(20)
  },
  IDCardIssueDate: {
    type: DataTypes.DATEONLY
  },
  IDCardIssuePlace: {
    type: DataTypes.STRING(100)
  },
  ResidencyStatus: {
    type: DataTypes.ENUM('Thường trú', 'Tạm trú', 'Tạm vắng', 'Đã chuyển đi'),
    allowNull: false,
    defaultValue: 'Thường trú'
  },
  RegistrationDate: {
    type: DataTypes.DATEONLY
  },
  PreviousAddress: {
    type: DataTypes.TEXT
  }
}, {
  tableName: "Residents",
  timestamps: false
});

Resident.belongsTo(Household, { foreignKey: "HouseholdID" });

export default Resident;