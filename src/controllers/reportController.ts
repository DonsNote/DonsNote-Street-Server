import { Request, Response } from 'express';
import { reportService } from '../services/reportService';
import * as responseUtils from '../utils/response';

export class ReportController {
    async getAllReports(req: Request, res: Response) {
        try {
            const reports = await reportService.getAllReports();
            res.json(responseUtils.success(reports, 'Reports retrieved successfully'));
        } catch (error: any) {
            console.error('Error fetching reports:', error);
            res.status(500).json(responseUtils.error('Failed to fetch reports', error.message));
        }
    }

    async getReportById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            
            if (isNaN(id)) {
                return res.status(400).json(responseUtils.error('Invalid report ID'));
            }

            const report = await reportService.getReportById(id);
            
            if (!report) {
                return res.status(404).json(responseUtils.error('Report not found'));
            }

            res.json(responseUtils.success(report, 'Report retrieved successfully'));
        } catch (error: any) {
            console.error('Error fetching report:', error);
            res.status(500).json(responseUtils.error('Failed to fetch report', error.message));
        }
    }

    async createReport(req: Request, res: Response) {
        try {
            const { userId, artistId, reportType, report } = req.body;

            // 필수 필드 검증
            if (!userId || !artistId || !reportType || !report) {
                return res.status(400).json(responseUtils.error('UserId, artistId, reportType, and report are required'));
            }

            // 자기 자신을 신고하는 것 방지 (아티스트가 자기 자신을 신고할 수는 없음)
            // 이 로직은 비즈니스 요구사항에 따라 조정 가능

            const reportData = {
                userId,
                artistId,
                reportType,
                report
            };

            const newReport = await reportService.createReport(reportData);
            res.status(201).json(responseUtils.created(newReport, 'Report created successfully'));
        } catch (error: any) {
            console.error('Error creating report:', error);
            res.status(500).json(responseUtils.error('Failed to create report', error.message));
        }
    }

    async updateReport(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const { reportType, report } = req.body;
            
            if (isNaN(id)) {
                return res.status(400).json(responseUtils.error('Invalid report ID'));
            }

            const existingReport = await reportService.getReportById(id);
            if (!existingReport) {
                return res.status(404).json(responseUtils.error('Report not found'));
            }

            const updateData = {
                ...(reportType !== undefined && { reportType }),
                ...(report && { report })
            };

            const updatedReport = await reportService.updateReport(id, updateData);
            res.json(responseUtils.updated(updatedReport, 'Report updated successfully'));
        } catch (error: any) {
            console.error('Error updating report:', error);
            res.status(500).json(responseUtils.error('Failed to update report', error.message));
        }
    }

    async deleteReport(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            
            if (isNaN(id)) {
                return res.status(400).json(responseUtils.error('Invalid report ID'));
            }

            const existingReport = await reportService.getReportById(id);
            if (!existingReport) {
                return res.status(404).json(responseUtils.error('Report not found'));
            }

            await reportService.deleteReport(id);
            res.json(responseUtils.deleted('Report deleted successfully'));
        } catch (error: any) {
            console.error('Error deleting report:', error);
            res.status(500).json(responseUtils.error('Failed to delete report', error.message));
        }
    }

    async getReportsByType(req: Request, res: Response) {
        try {
            const { type } = req.query;
            
            if (!type) {
                return res.status(400).json(responseUtils.error('Type parameter is required'));
            }

            const reportType = parseInt(type as string);
            if (isNaN(reportType)) {
                return res.status(400).json(responseUtils.error('Invalid report type'));
            }

            const reports = await reportService.getReportsByType(reportType);
            res.json(responseUtils.success(reports, `Reports with type "${reportType}" retrieved successfully`));
        } catch (error: any) {
            console.error('Error fetching reports by type:', error);
            res.status(500).json(responseUtils.error('Failed to fetch reports by type', error.message));
        }
    }

    async getReportsByUser(req: Request, res: Response) {
        try {
            const userId = parseInt(req.params.userId);
            
            if (isNaN(userId)) {
                return res.status(400).json(responseUtils.error('Invalid user ID'));
            }

            const reports = await reportService.getReportsByReporter(userId);
            res.json(responseUtils.success(reports, 'User reports retrieved successfully'));
        } catch (error: any) {
            console.error('Error fetching user reports:', error);
            res.status(500).json(responseUtils.error('Failed to fetch user reports', error.message));
        }
    }

    async getReportsByArtist(req: Request, res: Response) {
        try {
            const artistId = parseInt(req.params.artistId);
            
            if (isNaN(artistId)) {
                return res.status(400).json(responseUtils.error('Invalid artist ID'));
            }

            const reports = await reportService.getReportsByArtist(artistId);
            res.json(responseUtils.success(reports, 'Artist reports retrieved successfully'));
        } catch (error: any) {
            console.error('Error fetching artist reports:', error);
            res.status(500).json(responseUtils.error('Failed to fetch artist reports', error.message));
        }
    }
}

export const reportController = new ReportController();