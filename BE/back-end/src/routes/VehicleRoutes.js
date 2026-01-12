import express from 'express';
import * as vehicleController from '../controllers/VehicleController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Vehicles
 *     description: Quản lý phương tiện
 */

/**
 * @swagger
 * /api/vehicle/get-all-vehicle:
 *   get:
 *     summary: Danh sách phương tiện
 *     tags: [Vehicles]
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/get-all-vehicle', vehicleController.getAllVehicles);

/**
 * @swagger
 * /api/vehicle/create-vehicle/:
 *   post:
 *     summary: Đăng ký phương tiện
 *     tags: [Vehicles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               HouseholdID:
 *                 type: integer
 *               VehicleType:
 *                 type: string
 *                 enum: [Xe máy, Ô tô]
 *               LicensePlate:
 *                 type: string
 *               Brand:
 *                 type: string
 *               Color:
 *                 type: string
 *               RegistrationDate:
 *                 type: string
 *                 format: date
 *               Status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Thành công
 */
router.post('/create-vehicle/', vehicleController.createVehicle);

router.get('/get-vehicle-by-id/:id', vehicleController.getVehicleById);
router.put('/update-vehicle/:id', vehicleController.updateVehicle);
router.delete('/delete-vehicle/:id', vehicleController.deleteVehicle);

export default router;