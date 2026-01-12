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
    references: { model: Household, key: "HouseholdID" },
    allowNull: false // Bắt buộc phải thuộc về 1 hộ
  },
  FullName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Sex: {
    // Giữ nguyên Enum cho giới tính vì FE có select box chuẩn
    type: DataTypes.ENUM('Nam', 'Nữ'),
    allowNull: false
  },
  DateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: true
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
  // 🔥 SỬA: Đổi từ ENUM sang STRING để tránh lỗi khi nhập liệu từ FE
  Relationship: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'Thành viên'
  },
  Occupation: {
    type: DataTypes.STRING(100)
  },
  IDCardNumber: {
    type: DataTypes.STRING(20)
  },
  ResidencyStatus: {
    type: DataTypes.ENUM('Thường trú', 'Tạm trú', 'Tạm vắng', 'Đã chuyển đi'),
    allowNull: false,
    defaultValue: 'Thường trú'
  },
  RegistrationDate: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW
  },
  PhoneNumber: DataTypes.STRING(20),
  EducationLevel: DataTypes.STRING(50),
  Workplace: DataTypes.STRING(200),
  IDCardIssueDate: DataTypes.DATEONLY,
  IDCardIssuePlace: DataTypes.STRING(100),
  PreviousAddress: DataTypes.TEXT
}, {
  tableName: "Residents",
  timestamps: false
});

Resident.belongsTo(Household, { foreignKey: "HouseholdID" });

export default Resident;