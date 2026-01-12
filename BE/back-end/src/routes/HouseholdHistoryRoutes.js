// ============================================
// FILE: back-end/src/routes/HouseholdHistoryRoutes.js
// ============================================
import express from 'express';
import * as householdHistoryController from '../controllers/HouseholdHistoryController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: HouseholdHistory
 *     description: Lịch sử thay đổi hộ khẩu
 */

/**
 * @swagger
 * /api/household-history/{householdId}:
 *   get:
 *     summary: Lấy lịch sử thay đổi của một hộ
 *     tags: [HouseholdHistory]
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
router.get('/:householdId', householdHistoryController.getHouseholdHistory);

/**
 * @swagger
 * /api/household-history/create:
 *   post:
 *     summary: Thêm lịch sử thay đổi thủ công
 *     tags: [HouseholdHistory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               HouseholdID:
 *                 type: integer
 *               ChangeType:
 *                 type: string
 *               ChangeContent:
 *                 type: string
 *               ChangeDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Tạo thành công
 */
router.post('/create', householdHistoryController.createHouseholdHistory);

export default router;