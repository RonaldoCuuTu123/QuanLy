import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import sequelize from "./src/config/dbsetup.js";
import { createDefaultUser } from "./src/utils/createDefaultUser.js";
import { setupAssociations } from "./src/config/associations.js";

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

// Models
import User from "./src/models/User.js";
import Household from "./src/models/Household.js";
import Vehicle from "./src/models/Vehicle.js";
import FeeCollection from "./src/models/FeeCollection.js";
import FeeDetail from "./src/models/FeeDetail.js";
import FeeType from "./src/models/FeeType.js";
import Resident from "./src/models/Resident.js";
import HouseholdHistory from "./src/models/HouseholdHistory.js";
import ResidentHistory from "./src/models/ResidentHistory.js";
import TemporaryAbsence from "./src/models/TemporaryAbsence.js";
import TemporaryResidence from "./src/models/TemporaryResidence.js";

// Import routes
import UserRoutes from "./src/routes/UserRoutes.js";
import HouseholdRoutes from "./src/routes/HouseholdRoutes.js";
import ResidentRoutes from "./src/routes/ResidentRoutes.js";
import FeeTypeRoutes from "./src/routes/FeeTypeRoutes.js";
import FeeDetailRoutes from "./src/routes/FeeDetailRoutes.js";
import FeeCollectionRoutes from "./src/routes/FeeCollectionRoutes.js";
import VehicleRoutes from "./src/routes/VehicleRoutes.js";
import HouseholdHistoryRoutes from "./src/routes/HouseholdHistoryRoutes.js";
import TemporaryAbsenceRoutes from "./src/routes/TemporaryAbsenceRoutes.js";
import TemporaryResidenceRoutes from "./src/routes/TemporaryResidenceRoutes.js";
import StatisticsRoutes from "./src/routes/StatisticsRoutes.js";
import PaymentRoutes from "./src/routes/PaymentRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Cấu hình Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'KTPM Project API - Quản lý chung cư',
      version: '2.0.0',
      description: 'API hoàn chỉnh cho hệ thống quản lý chung cư (Hộ khẩu + Thu phí)',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// ============================================
// MIDDLEWARE - QUAN TRỌNG: THỨ TỰ CỰC KỲ QUAN TRỌNG!
// ============================================

// 1. CORS - PHẢI ĐẶT ĐẦU TIÊN
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// 2. Manual CORS headers (backup)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// 3. Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Helmet - TẮT HOÀN TOÀN CSP
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: false
}));

// 5. Morgan logger
app.use(morgan("dev"));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "API đang chạy...",
    version: "2.0.0",
    documentation: `http://localhost:${PORT}/api-docs`,
    status: "OK"
  });
});

// ============================================
// ROUTES
// ============================================
app.use("/api/users", UserRoutes);
app.use("/api/households", HouseholdRoutes);
app.use("/api/residents", ResidentRoutes);
app.use("/api/fee-type", FeeTypeRoutes);
app.use("/api/fee-detail", FeeDetailRoutes);
app.use("/api/fee-collection", FeeCollectionRoutes);
app.use("/api/vehicle", VehicleRoutes);
app.use("/api/household-history", HouseholdHistoryRoutes);
app.use("/api/temporary-absence", TemporaryAbsenceRoutes);
app.use("/api/temporary-residence", TemporaryResidenceRoutes);
app.use("/api/statistics", StatisticsRoutes);
app.use("/api/payment", PaymentRoutes);

// ============================================
// ERROR HANDLERS
// ============================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: true,
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(err.status || 500).json({
    error: true,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ============================================
// KHỞI ĐỘNG SERVER
// ============================================
(async () => {
  try {
    // Setup model associations
    setupAssociations();

    // Tạo người dùng mặc định
    await createDefaultUser();

    app.listen(PORT, () => {
      console.log('='.repeat(50));
      console.log(`✅ Server đang chạy tại http://localhost:${PORT}`);
      console.log(`📚 Swagger UI: http://localhost:${PORT}/api-docs`);
      console.log(`🔧 Môi trường: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔓 CORS: Enabled (*)`);
      console.log(`🛡️  CSP: Disabled`);
      console.log('='.repeat(50));
    });
  } catch (error) {
    console.error("❌ Lỗi khởi động server:", error);
    process.exit(1);
  }
})();