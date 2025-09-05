import { supabase } from '../config/supabase';
import type { Database } from '../types/database.types';

type Report = Database['public']['Tables']['Report']['Row'];
type ReportInsert = Database['public']['Tables']['Report']['Insert'];
type ReportUpdate = Database['public']['Tables']['Report']['Update'];

export class ReportService {
    async getAllReports(): Promise<Report[]> {
        const { data, error } = await supabase
            .from('Report')
            .select(`
                *,
                reporter:User!userId(id, name, email),
                reported_artist:Artist!artistId(id, artistName)
            `)
            .order('id', { ascending: false });

        if (error) {
            console.error('Error fetching reports:', error);
            throw new Error(`Failed to fetch reports: ${error.message}`);
        }

        return data || [];
    }

    async getReportById(id: number): Promise<Report | null> {
        const { data, error } = await supabase
            .from('Report')
            .select(`
                *,
                reporter:User!userId(id, name, email),
                reported_artist:Artist!artistId(id, artistName)
            `)
            .eq('id', id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return null;
            }
            console.error('Error fetching report:', error);
            throw new Error(`Failed to fetch report: ${error.message}`);
        }

        return data;
    }

    async createReport(reportData: Omit<ReportInsert, 'id'>): Promise<Report> {
        const { data, error } = await supabase
            .from('Report')
            .insert([reportData])
            .select()
            .single();

        if (error) {
            console.error('Error creating report:', error);
            throw new Error(`Failed to create report: ${error.message}`);
        }

        return data;
    }

    async updateReport(id: number, updateData: ReportUpdate): Promise<Report> {
        const { data, error } = await supabase
            .from('Report')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating report:', error);
            throw new Error(`Failed to update report: ${error.message}`);
        }

        return data;
    }

    async deleteReport(id: number): Promise<void> {
        const { error } = await supabase
            .from('Report')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting report:', error);
            throw new Error(`Failed to delete report: ${error.message}`);
        }
    }

    async getReportsByType(reportType: number): Promise<Report[]> {
        const { data, error } = await supabase
            .from('Report')
            .select(`
                *,
                reporter:User!userId(id, name, email),
                reported_artist:Artist!artistId(id, artistName)
            `)
            .eq('reportType', reportType)
            .order('id', { ascending: false });

        if (error) {
            console.error('Error fetching reports by type:', error);
            throw new Error(`Failed to fetch reports by type: ${error.message}`);
        }

        return data || [];
    }

    async getReportsByReporter(userId: number): Promise<Report[]> {
        const { data, error } = await supabase
            .from('Report')
            .select(`
                *,
                reporter:User!userId(id, name, email),
                reported_artist:Artist!artistId(id, artistName)
            `)
            .eq('userId', userId)
            .order('id', { ascending: false });

        if (error) {
            console.error('Error fetching reports by reporter:', error);
            throw new Error(`Failed to fetch reports by reporter: ${error.message}`);
        }

        return data || [];
    }

    async getReportsByArtist(artistId: number): Promise<Report[]> {
        const { data, error } = await supabase
            .from('Report')
            .select(`
                *,
                reporter:User!userId(id, name, email),
                reported_artist:Artist!artistId(id, artistName)
            `)
            .eq('artistId', artistId)
            .order('id', { ascending: false });

        if (error) {
            console.error('Error fetching reports by artist:', error);
            throw new Error(`Failed to fetch reports by artist: ${error.message}`);
        }

        return data || [];
    }
}

export const reportService = new ReportService();