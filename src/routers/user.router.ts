import { Router } from 'express';
import { userController } from '../controllers/userController';

const router = Router();

// GET /users - 모든 사용자 조회
router.get('/', userController.getAllUsers.bind(userController));

// GET /users/:id - 특정 사용자 조회
router.get('/:id', userController.getUserById.bind(userController));

// GET /users/:id/profile - 사용자 프로필 (아티스트 정보 포함)
router.get('/:id/profile', userController.getUserProfile.bind(userController));

// POST /users - 새 사용자 생성
router.post('/', userController.createUser.bind(userController));

// PUT /users/:id - 사용자 정보 수정
router.put('/:id', userController.updateUser.bind(userController));

// DELETE /users/:id - 사용자 삭제
router.delete('/:id', userController.deleteUser.bind(userController));

export default router;