import express from 'express';
import * as residentController from '../controllers/ResidentController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Residents
 *     description: Quản lý cư dân
 */

/**
 * @swagger
 * /api/residents/get-all-residents:
 *   get:
 *     summary: Lấy danh sách cư dân
 *     tags: [Residents]
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/get-all-residents', residentController.getAllResidents);

/**
 * @swagger
 * /api/residents/create-resident:
 *   post:
 *     summary: Thêm cư dân mới
 *     tags: [Residents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               HouseholdID:
 *                 type: integer
 *               FullName:
 *                 type: string
 *               Sex:
 *                 type: string
 *                 enum: [Nam, Nữ]
 *               Relationship:
 *                 type: string
 *     responses:
 *       201:
 *         description: Thêm thành công
 */
router.post('/create-resident', residentController.createResident);

router.get('/get-resident-by-id/:id', residentController.getResidentById);
router.put('/update-resident/:id', residentController.updateResident);
router.delete('/delete-resident/:id', residentController.deleteResident);

export default router;