import { Request, Response } from 'express';
import { buskingService } from '../services/buskingService';
import * as responseUtils from '../utils/response';

export class BuskingController {
    async getAllBuskings(req: Request, res: Response) {
        try {
            const buskings = await buskingService.getAllBuskings();
            res.json(responseUtils.success(buskings, 'Buskings retrieved successfully'));
        } catch (error: any) {
            console.error('Error fetching buskings:', error);
            res.status(500).json(responseUtils.error('Failed to fetch buskings', error.message));
        }
    }

    async getBuskingById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            
            if (isNaN(id)) {
                return res.status(400).json(responseUtils.error('Invalid busking ID'));
            }

            const busking = await buskingService.getBuskingById(id);
            
            if (!busking) {
                return res.status(404).json(responseUtils.error('Busking not found'));
            }

            res.json(responseUtils.success(busking, 'Busking retrieved successfully'));
        } catch (error: any) {
            console.error('Error fetching busking:', error);
            res.status(500).json(responseUtils.error('Failed to fetch busking', error.message));
        }
    }

    async createBusking(req: Request, res: Response) {
        try {
            const { artistId, buskingName, buskingInfo, startTime, endTime, latitude, longitude } = req.body;

            // 필수 필드 검증
            if (!artistId || !buskingName || !buskingInfo || !startTime || !endTime || !latitude || !longitude) {
                return res.status(400).json(responseUtils.error('All fields are required'));
            }

            // 날짜 검증
            const start = new Date(startTime);
            const end = new Date(endTime);
            
            if (start >= end) {
                return res.status(400).json(responseUtils.error('End time must be after start time'));
            }

            if (start < new Date()) {
                return res.status(400).json(responseUtils.error('Start time cannot be in the past'));
            }

            const buskingData = {
                artistId,
                buskingName,
                buskingInfo,
                startTime,
                endTime,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude)
            };

            const newBusking = await buskingService.createBusking(buskingData);
            res.status(201).json(responseUtils.created(newBusking, 'Busking created successfully'));
        } catch (error: any) {
            console.error('Error creating busking:', error);
            res.status(500).json(responseUtils.error('Failed to create busking', error.message));
        }
    }

    async updateBusking(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            
            if (isNaN(id)) {
                return res.status(400).json(responseUtils.error('Invalid busking ID'));
            }

            const existingBusking = await buskingService.getBuskingById(id);
            if (!existingBusking) {
                return res.status(404).json(responseUtils.error('Busking not found'));
            }

            const updateData = {
                ...(req.body.buskingName && { buskingName: req.body.buskingName }),
                ...(req.body.buskingInfo && { buskingInfo: req.body.buskingInfo }),
                ...(req.body.startTime && { startTime: req.body.startTime }),
                ...(req.body.endTime && { endTime: req.body.endTime }),
                ...(req.body.latitude && { latitude: parseFloat(req.body.latitude) }),
                ...(req.body.longitude && { longitude: parseFloat(req.body.longitude) })
            };

            // 날짜 검증 (업데이트할 때)
            if (updateData.startTime && updateData.endTime) {
                const start = new Date(updateData.startTime);
                const end = new Date(updateData.endTime);
                
                if (start >= end) {
                    return res.status(400).json(responseUtils.error('End time must be after start time'));
                }
            }

            const updatedBusking = await buskingService.updateBusking(id, updateData);
            res.json(responseUtils.updated(updatedBusking, 'Busking updated successfully'));
        } catch (error: any) {
            console.error('Error updating busking:', error);
            res.status(500).json(responseUtils.error('Failed to update busking', error.message));
        }
    }

    async deleteBusking(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            
            if (isNaN(id)) {
                return res.status(400).json(responseUtils.error('Invalid busking ID'));
            }

            const existingBusking = await buskingService.getBuskingById(id);
            if (!existingBusking) {
                return res.status(404).json(responseUtils.error('Busking not found'));
            }

            await buskingService.deleteBusking(id);
            res.json(responseUtils.deleted('Busking deleted successfully'));
        } catch (error: any) {
            console.error('Error deleting busking:', error);
            res.status(500).json(responseUtils.error('Failed to delete busking', error.message));
        }
    }

    async getBuskingsByLocation(req: Request, res: Response) {
        try {
            const { latitude, longitude, radius } = req.query;
            
            if (!latitude || !longitude) {
                return res.status(400).json(responseUtils.error('Latitude and longitude are required'));
            }

            const lat = parseFloat(latitude as string);
            const lng = parseFloat(longitude as string);
            const rad = radius ? parseFloat(radius as string) : 5;

            if (isNaN(lat) || isNaN(lng) || isNaN(rad)) {
                return res.status(400).json(responseUtils.error('Invalid coordinates or radius'));
            }

            const buskings = await buskingService.getBuskingsByLocation(lat, lng, rad);
            res.json(responseUtils.success(buskings, `Buskings within ${rad}km retrieved successfully`));
        } catch (error: any) {
            console.error('Error fetching buskings by location:', error);
            res.status(500).json(responseUtils.error('Failed to fetch buskings by location', error.message));
        }
    }

    async getUpcomingBuskings(req: Request, res: Response) {
        try {
            const { limit } = req.query;
            const limitNum = limit ? parseInt(limit as string) : 10;

            const buskings = await buskingService.getUpcomingBuskings(limitNum);
            res.json(responseUtils.success(buskings, 'Upcoming buskings retrieved successfully'));
        } catch (error: any) {
            console.error('Error fetching upcoming buskings:', error);
            res.status(500).json(responseUtils.error('Failed to fetch upcoming buskings', error.message));
        }
    }

    async getBuskingsByArtist(req: Request, res: Response) {
        try {
            const artistId = parseInt(req.params.artistId);
            
            if (isNaN(artistId)) {
                return res.status(400).json(responseUtils.error('Invalid artist ID'));
            }

            const buskings = await buskingService.getBuskingsByArtist(artistId);
            res.json(responseUtils.success(buskings, 'Artist buskings retrieved successfully'));
        } catch (error: any) {
            console.error('Error fetching artist buskings:', error);
            res.status(500).json(responseUtils.error('Failed to fetch artist buskings', error.message));
        }
    }
}

export const buskingController = new BuskingController();