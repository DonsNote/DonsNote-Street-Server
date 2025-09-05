"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reportController_1 = require("../controllers/reportController");
const router = (0, express_1.Router)();
// GET /reports - 모든 신고 조회 (관리자용)
router.get('/', reportController_1.reportController.getAllReports.bind(reportController_1.reportController));
// GET /reports/type?type=1 - 타입별 신고 조회
router.get('/type', reportController_1.reportController.getReportsByType.bind(reportController_1.reportController));
// GET /reports/user/:userId - 특정 사용자가 한 신고들 조회
router.get('/user/:userId', reportController_1.reportController.getReportsByUser.bind(reportController_1.reportController));
// GET /reports/artist/:artistId - 특정 아티스트에 대한 신고들 조회
router.get('/artist/:artistId', reportController_1.reportController.getReportsByArtist.bind(reportController_1.reportController));
// GET /reports/:id - 특정 신고 조회
router.get('/:id', reportController_1.reportController.getReportById.bind(reportController_1.reportController));
// POST /reports - 새 신고 생성
router.post('/', reportController_1.reportController.createReport.bind(reportController_1.reportController));
// PUT /reports/:id - 신고 정보 업데이트
router.put('/:id', reportController_1.reportController.updateReport.bind(reportController_1.reportController));
// DELETE /reports/:id - 신고 삭제 (관리자용)
router.delete('/:id', reportController_1.reportController.deleteReport.bind(reportController_1.reportController));
exports.default = router;
