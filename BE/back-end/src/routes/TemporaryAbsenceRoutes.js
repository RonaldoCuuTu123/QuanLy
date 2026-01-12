import express from 'express';
import * as tempAbsenceController from '../controllers/TemporaryAbsenceController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: TemporaryAbsence
 *     description: Quản lý giấy tạm vắng
 */

/**
 * @swagger
 * /api/temporary-absence/get-all:
 *   get:
 *     summary: Lấy tất cả giấy tạm vắng
 *     tags: [TemporaryAbsence]
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/get-all', tempAbsenceController.getAllTemporaryAbsences);

/**
 * @swagger
 * /api/temporary-absence/household/{householdId}:
 *   get:
 *     summary: Lấy giấy tạm vắng theo hộ
 *     tags: [TemporaryAbsence]
 *     parameters:
 *       - in: path
 *         name: householdId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/household/:householdId', tempAbsenceController.getAbsencesByHousehold);

/**
 * @swagger
 * /api/temporary-absence/create:
 *   post:
 *     summary: Tạo giấy tạm vắng
 *     tags: [TemporaryAbsence]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ResidentID:
 *                 type: integer
 *               HouseholdID:
 *                 type: integer
 *               StartDate:
 *                 type: string
 *                 format: date
 *               EndDate:
 *                 type: string
 *                 format: date
 *               Destination:
 *                 type: string
 *               Reason:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo thành công
 */
router.post('/create', tempAbsenceController.createTemporaryAbsence);

/**
 * @swagger
 * /api/temporary-absence/update-status/{id}:
 *   put:
 *     summary: Cập nhật trạng thái (đã về)
 *     tags: [TemporaryAbsence]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Status:
 *                 type: string
 *                 enum: [Đang vắng, Đã về]
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put('/update-status/:id', tempAbsenceController.updateAbsenceStatus);

export default router;
