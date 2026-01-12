import express from 'express';
import * as tempResidenceController from '../controllers/TemporaryResidenceController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: TemporaryResidence
 *     description: Quản lý giấy tạm trú
 */

/**
 * @swagger
 * /api/temporary-residence/get-all:
 *   get:
 *     summary: Lấy tất cả giấy tạm trú
 *     tags: [TemporaryResidence]
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/get-all', tempResidenceController.getAllTemporaryResidences);

/**
 * @swagger
 * /api/temporary-residence/household/{householdId}:
 *   get:
 *     summary: Lấy giấy tạm trú theo hộ
 *     tags: [TemporaryResidence]
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
router.get('/household/:householdId', tempResidenceController.getResidencesByHousehold);

/**
 * @swagger
 * /api/temporary-residence/create:
 *   post:
 *     summary: Tạo giấy tạm trú
 *     tags: [TemporaryResidence]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FullName:
 *                 type: string
 *               Sex:
 *                 type: string
 *                 enum: [Nam, Nữ]
 *               PermanentAddress:
 *                 type: string
 *               HouseholdID:
 *                 type: integer
 *               StartDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Tạo thành công
 */
router.post('/create', tempResidenceController.createTemporaryResidence);

/**
 * @swagger
 * /api/temporary-residence/update-status/{id}:
 *   put:
 *     summary: Cập nhật trạng thái
 *     tags: [TemporaryResidence]
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
 *                 enum: [Đang tạm trú, Đã kết thúc]
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put('/update-status/:id', tempResidenceController.updateResidenceStatus);

export default router;
