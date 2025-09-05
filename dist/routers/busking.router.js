"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const buskingController_1 = require("../controllers/buskingController");
const router = (0, express_1.Router)();
// GET /buskings - 모든 버스킹 조회
router.get('/', buskingController_1.buskingController.getAllBuskings.bind(buskingController_1.buskingController));
// GET /buskings/upcoming?limit=10 - 다가오는 버스킹 조회
router.get('/upcoming', buskingController_1.buskingController.getUpcomingBuskings.bind(buskingController_1.buskingController));
// GET /buskings/location?latitude=37.5563&longitude=126.9238&radius=5 - 위치 기반 버스킹 검색
router.get('/location', buskingController_1.buskingController.getBuskingsByLocation.bind(buskingController_1.buskingController));
// GET /buskings/artist/:artistId - 특정 아티스트의 버스킹 조회
router.get('/artist/:artistId', buskingController_1.buskingController.getBuskingsByArtist.bind(buskingController_1.buskingController));
// GET /buskings/:id - 특정 버스킹 조회
router.get('/:id', buskingController_1.buskingController.getBuskingById.bind(buskingController_1.buskingController));
// POST /buskings - 새 버스킹 생성
router.post('/', buskingController_1.buskingController.createBusking.bind(buskingController_1.buskingController));
// PUT /buskings/:id - 버스킹 정보 수정
router.put('/:id', buskingController_1.buskingController.updateBusking.bind(buskingController_1.buskingController));
// DELETE /buskings/:id - 버스킹 삭제
router.delete('/:id', buskingController_1.buskingController.deleteBusking.bind(buskingController_1.buskingController));
exports.default = router;
