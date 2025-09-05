import { Router } from 'express';
import { buskingController } from '../controllers/buskingController';

const router = Router();

// GET /buskings - 모든 버스킹 조회
router.get('/', buskingController.getAllBuskings.bind(buskingController));

// GET /buskings/upcoming?limit=10 - 다가오는 버스킹 조회
router.get('/upcoming', buskingController.getUpcomingBuskings.bind(buskingController));

// GET /buskings/location?latitude=37.5563&longitude=126.9238&radius=5 - 위치 기반 버스킹 검색
router.get('/location', buskingController.getBuskingsByLocation.bind(buskingController));

// GET /buskings/artist/:artistId - 특정 아티스트의 버스킹 조회
router.get('/artist/:artistId', buskingController.getBuskingsByArtist.bind(buskingController));

// GET /buskings/:id - 특정 버스킹 조회
router.get('/:id', buskingController.getBuskingById.bind(buskingController));

// POST /buskings - 새 버스킹 생성
router.post('/', buskingController.createBusking.bind(buskingController));

// PUT /buskings/:id - 버스킹 정보 수정
router.put('/:id', buskingController.updateBusking.bind(buskingController));

// DELETE /buskings/:id - 버스킹 삭제
router.delete('/:id', buskingController.deleteBusking.bind(buskingController));

export default router;