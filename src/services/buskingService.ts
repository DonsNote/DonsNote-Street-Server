import { supabase } from '../config/supabase';
import { Database, Tables } from '../types/database.types';

type Busking = Tables<'Busking'>;
type CreateBuskingData = Database['public']['Tables']['Busking']['Insert'];
type UpdateBuskingData = Database['public']['Tables']['Busking']['Update'];

export class BuskingService {
    async getAllBuskings() {
        const { data, error } = await supabase
            .from('Busking')
            .select(`
                *,
                Artist!Busking_artistId_fkey (
                    artistName,
                    artistImgURL,
                    genres,
                    User!Artist_userId_fkey (name)
                )
            `)
            .order('startTime', { ascending: true });

        if (error) throw error;
        return data;
    }

    async getBuskingById(id: number) {
        const { data, error } = await supabase
            .from('Busking')
            .select(`
                *,
                Artist!Busking_artistId_fkey (
                    artistName,
                    artistInfo,
                    artistImgURL,
                    genres,
                    youtubeURL,
                    instarURL,
                    soundURL,
                    User!Artist_userId_fkey (name, email)
                )
            `)
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    }

    async getBuskingsByArtist(artistId: number) {
        const { data, error } = await supabase
            .from('Busking')
            .select('*')
            .eq('artistId', artistId)
            .order('startTime', { ascending: true });

        if (error) throw error;
        return data;
    }

    async createBusking(buskingData: CreateBuskingData) {
        const { data, error } = await supabase
            .from('Busking')
            .insert(buskingData)
            .select(`
                *,
                Artist (artistName, User (name))
            `)
            .single();

        if (error) throw error;
        return data;
    }

    async updateBusking(id: number, buskingData: UpdateBuskingData) {
        const { data, error } = await supabase
            .from('Busking')
            .update(buskingData)
            .eq('id', id)
            .select(`
                *,
                Artist (artistName)
            `)
            .single();

        if (error) throw error;
        return data;
    }

    async deleteBusking(id: number) {
        const { error } = await supabase
            .from('Busking')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return true;
    }

    async getBuskingsByLocation(latitude: number, longitude: number, radius = 5) {
        // 반경 내 버스킹 검색 (간단한 거리 계산)
        const { data, error } = await supabase
            .from('Busking')
            .select(`
                *,
                Artist (artistName, artistImgURL, genres)
            `)
            .gte('latitude', latitude - radius * 0.01)
            .lte('latitude', latitude + radius * 0.01)
            .gte('longitude', longitude - radius * 0.01)
            .lte('longitude', longitude + radius * 0.01)
            .order('startTime', { ascending: true });

        if (error) throw error;
        return data;
    }

    async getUpcomingBuskings(limit = 10) {
        const now = new Date().toISOString();
        
        const { data, error } = await supabase
            .from('Busking')
            .select(`
                *,
                Artist (artistName, artistImgURL, genres)
            `)
            .gte('startTime', now)
            .order('startTime', { ascending: true })
            .limit(limit);

        if (error) throw error;
        return data;
    }
}

export const buskingService = new BuskingService();