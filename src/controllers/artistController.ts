import { Request, Response } from 'express';
import { artistService } from '../services/artistService';
import { validateArtist } from '../utils/validation';
import * as responseUtils from '../utils/response';

export class ArtistController {
    async getAllArtists(req: Request, res: Response) {
        try {
            const artists = await artistService.getAllArtists();
            res.json(responseUtils.success(artists, 'Artists retrieved successfully'));
        } catch (error: any) {
            console.error('Error fetching artists:', error);
            res.status(500).json(responseUtils.error('Failed to fetch artists', error.message));
        }
    }

    async getArtistById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            
            if (isNaN(id)) {
                return res.status(400).json(responseUtils.error('Invalid artist ID'));
            }

            const artist = await artistService.getArtistById(id);
            
            if (!artist) {
                return res.status(404).json(responseUtils.error('Artist not found'));
            }

            // 팔로워 수도 함께 조회
            const followersCount = await artistService.getFollowersCount(id);
            
            res.json(responseUtils.success({
                ...artist,
                followersCount
            }, 'Artist retrieved successfully'));
        } catch (error: any) {
            console.error('Error fetching artist:', error);
            res.status(500).json(responseUtils.error('Failed to fetch artist', error.message));
        }
    }

    async createArtist(req: Request, res: Response) {
        try {
            const validationErrors = validateArtist(req.body);
            
            if (validationErrors.length > 0) {
                return res.status(400).json(responseUtils.error('Validation failed', validationErrors));
            }

            // 이미 아티스트 프로필이 있는지 체크
            const existingArtist = await artistService.getArtistByUserId(req.body.userId);
            if (existingArtist) {
                return res.status(409).json(responseUtils.error('User already has an artist profile'));
            }

            const artistData = {
                userId: req.body.userId,
                artistName: req.body.artistName,
                artistInfo: req.body.artistInfo,
                artistImgURL: req.body.artistImgURL || '/static/images/userProfile/defaultUser.jpg',
                genres: req.body.genres,
                youtubeURL: req.body.youtubeURL || '',
                instarURL: req.body.instarURL || '',
                soundURL: req.body.soundURL || '',
                otherURL: req.body.otherURL || ''
            };

            const newArtist = await artistService.createArtist(artistData);
            res.status(201).json(responseUtils.created(newArtist, 'Artist profile created successfully'));
        } catch (error: any) {
            console.error('Error creating artist:', error);
            res.status(500).json(responseUtils.error('Failed to create artist', error.message));
        }
    }

    async updateArtist(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            
            if (isNaN(id)) {
                return res.status(400).json(responseUtils.error('Invalid artist ID'));
            }

            const existingArtist = await artistService.getArtistById(id);
            if (!existingArtist) {
                return res.status(404).json(responseUtils.error('Artist not found'));
            }

            const updateData = {
                ...(req.body.artistName && { artistName: req.body.artistName }),
                ...(req.body.artistInfo && { artistInfo: req.body.artistInfo }),
                ...(req.body.artistImgURL && { artistImgURL: req.body.artistImgURL }),
                ...(req.body.genres && { genres: req.body.genres }),
                ...(req.body.youtubeURL !== undefined && { youtubeURL: req.body.youtubeURL }),
                ...(req.body.instarURL !== undefined && { instarURL: req.body.instarURL }),
                ...(req.body.soundURL !== undefined && { soundURL: req.body.soundURL }),
                ...(req.body.otherURL !== undefined && { otherURL: req.body.otherURL })
            };

            const updatedArtist = await artistService.updateArtist(id, updateData);
            res.json(responseUtils.updated(updatedArtist, 'Artist profile updated successfully'));
        } catch (error: any) {
            console.error('Error updating artist:', error);
            res.status(500).json(responseUtils.error('Failed to update artist', error.message));
        }
    }

    async deleteArtist(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            
            if (isNaN(id)) {
                return res.status(400).json(responseUtils.error('Invalid artist ID'));
            }

            const existingArtist = await artistService.getArtistById(id);
            if (!existingArtist) {
                return res.status(404).json(responseUtils.error('Artist not found'));
            }

            await artistService.deleteArtist(id);
            res.json(responseUtils.deleted('Artist profile deleted successfully'));
        } catch (error: any) {
            console.error('Error deleting artist:', error);
            res.status(500).json(responseUtils.error('Failed to delete artist', error.message));
        }
    }

    async searchArtistsByGenre(req: Request, res: Response) {
        try {
            const { genre } = req.query;
            
            if (!genre || typeof genre !== 'string') {
                return res.status(400).json(responseUtils.error('Genre parameter is required'));
            }

            const artists = await artistService.searchArtistsByGenre(genre);
            res.json(responseUtils.success(artists, `Artists with genre "${genre}" retrieved successfully`));
        } catch (error: any) {
            console.error('Error searching artists by genre:', error);
            res.status(500).json(responseUtils.error('Failed to search artists', error.message));
        }
    }
}

export const artistController = new ArtistController();