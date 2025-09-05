import { Router } from 'express';
import { artistController } from '../controllers/artistController';

const router = Router();

// GET /artists - 모든 아티스트 조회
router.get('/', artistController.getAllArtists.bind(artistController));

// GET /artists/search?genre=포크 - 장르별 아티스트 검색
router.get('/search', artistController.searchArtistsByGenre.bind(artistController));

// GET /artists/:id - 특정 아티스트 조회
router.get('/:id', artistController.getArtistById.bind(artistController));

// POST /artists - 새 아티스트 프로필 생성
router.post('/', artistController.createArtist.bind(artistController));

// PUT /artists/:id - 아티스트 프로필 수정
router.put('/:id', artistController.updateArtist.bind(artistController));

// DELETE /artists/:id - 아티스트 프로필 삭제
router.delete('/:id', artistController.deleteArtist.bind(artistController));

export default router;