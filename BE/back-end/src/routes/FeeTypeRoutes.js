import express from 'express';
import * as feeTypeController from '../controllers/FeeTypeController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: FeeTypes
 *     description: Quản lý các loại phí
 */

/**
 * @swagger
 * /api/fee-type/get-all-fee-type:
 *   get:
 *     summary: Lấy tất cả loại phí
 *     tags: [FeeTypes]
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/get-all-fee-type', feeTypeController.getAllFeeTypes);

router.get('/get-fee-type-by-id/:id', feeTypeController.getFeeTypeById);
router.post('/create-fee-type', feeTypeController.createFeeType);
router.put('/update-fee-type/:id', feeTypeController.updateFeeType);
router.delete('/delete-fee-type/:id', feeTypeController.deleteFeeType);

export default router;