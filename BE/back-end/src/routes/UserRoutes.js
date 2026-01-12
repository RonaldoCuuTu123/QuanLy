import express from "express";
import * as userController from "../controllers/UserController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Quản lý người dùng và tài khoản
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Đăng nhập vào hệ thống
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 default: admin1234
 *               password:
 *                 type: string
 *                 default: 1234
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 */
router.post('/login', userController.login);

/**
 * @swagger
 * /api/users/get-all-user:
 *   get:
 *     summary: Lấy danh sách tất cả người dùng
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get("/get-all-user", userController.getAllUsers);

router.get("/get-user-by-id/:id", userController.getUserById);
router.post("/create-user", userController.createUser);
router.put("/update-user/:id", userController.updateUser);
router.delete("/delete-user/:id", userController.deleteUser);

export default router;