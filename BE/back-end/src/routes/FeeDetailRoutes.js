import express from 'express';
import * as feeDetailController from '../controllers/FeeDetailController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: FeeDetails
 *     description: Chi tiết đóng phí của hộ gia đình
 */

/**
 * @swagger
 * /api/fee-detail/get-all-fee-detail:
 *   get:
 *     summary: Danh sách chi tiết đóng phí
 *     tags: [FeeDetails]
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get('/get-all-fee-detail', feeDetailController.getAllFeeDetails);

router.get('/get-fee-detail-by-id/:id', feeDetailController.getFeeDetailById);
router.post('/create-fee-detail', feeDetailController.createFeeDetail);
router.put('/update-fee-detail/:id', feeDetailController.updateFeeDetail);
router.delete('/delete-fee-detail/:id', feeDetailController.deleteFeeDetail);
router.get('/stats/:collectionId', feeDetailController.getFeeDetailStats);

/**
 * @swagger
 * /api/fee-detail/update-vehicle-fee/{id}:
 *   put:
 *     summary: Cập nhật phí gửi xe tự động cho đợt thu dựa trên số lượng xe
 *     tags: [FeeDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của đợt thu phí
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put('/update-vehicle-fee/:id', feeDetailController.updateVehicleFeedetail);


/**
 * @swagger
 * /api/fee-detail/update-sanitation-fee/{id}:
 *   put:
 *     summary: Cập nhật phí vệ sinh tự động dựa trên số thành viên
 *     tags: [FeeDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của đợt thu phí
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put('/update-sanitation-fee/:id', feeDetailController.updateSanitationFeeDetail);

export default router;