"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const artistController_1 = require("../controllers/artistController");
const router = (0, express_1.Router)();
// GET /artists - 모든 아티스트 조회
router.get('/', artistController_1.artistController.getAllArtists.bind(artistController_1.artistController));
// GET /artists/search?genre=포크 - 장르별 아티스트 검색
router.get('/search', artistController_1.artistController.searchArtistsByGenre.bind(artistController_1.artistController));
// GET /artists/:id - 특정 아티스트 조회
router.get('/:id', artistController_1.artistController.getArtistById.bind(artistController_1.artistController));
// POST /artists - 새 아티스트 프로필 생성
router.post('/', artistController_1.artistController.createArtist.bind(artistController_1.artistController));
// PUT /artists/:id - 아티스트 프로필 수정
router.put('/:id', artistController_1.artistController.updateArtist.bind(artistController_1.artistController));
// DELETE /artists/:id - 아티스트 프로필 삭제
router.delete('/:id', artistController_1.artistController.deleteArtist.bind(artistController_1.artistController));
exports.default = router;
