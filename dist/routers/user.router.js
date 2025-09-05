"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
// GET /users - 모든 사용자 조회
router.get('/', userController_1.userController.getAllUsers.bind(userController_1.userController));
// GET /users/:id - 특정 사용자 조회
router.get('/:id', userController_1.userController.getUserById.bind(userController_1.userController));
// GET /users/:id/profile - 사용자 프로필 (아티스트 정보 포함)
router.get('/:id/profile', userController_1.userController.getUserProfile.bind(userController_1.userController));
// POST /users - 새 사용자 생성
router.post('/', userController_1.userController.createUser.bind(userController_1.userController));
// PUT /users/:id - 사용자 정보 수정
router.put('/:id', userController_1.userController.updateUser.bind(userController_1.userController));
// DELETE /users/:id - 사용자 삭제
router.delete('/:id', userController_1.userController.deleteUser.bind(userController_1.userController));
exports.default = router;
