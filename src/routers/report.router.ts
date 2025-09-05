import { Router } from 'express';
import { reportController } from '../controllers/reportController';

const router = Router();

// GET /reports - 모든 신고 조회 (관리자용)
router.get('/', reportController.getAllReports.bind(reportController));

// GET /reports/type?type=1 - 타입별 신고 조회
router.get('/type', reportController.getReportsByType.bind(reportController));

// GET /reports/user/:userId - 특정 사용자가 한 신고들 조회
router.get('/user/:userId', reportController.getReportsByUser.bind(reportController));

// GET /reports/artist/:artistId - 특정 아티스트에 대한 신고들 조회
router.get('/artist/:artistId', reportController.getReportsByArtist.bind(reportController));

// GET /reports/:id - 특정 신고 조회
router.get('/:id', reportController.getReportById.bind(reportController));

// POST /reports - 새 신고 생성
router.post('/', reportController.createReport.bind(reportController));

// PUT /reports/:id - 신고 정보 업데이트
router.put('/:id', reportController.updateReport.bind(reportController));

// DELETE /reports/:id - 신고 삭제 (관리자용)
router.delete('/:id', reportController.deleteReport.bind(reportController));

export default router;