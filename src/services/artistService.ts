import { supabase } from '../config/supabase';
import { Database, Tables } from '../types/database.types';

type Artist = Tables<'Artist'>;
type CreateArtistData = Database['public']['Tables']['Artist']['Insert'];
type UpdateArtistData = Database['public']['Tables']['Artist']['Update'];

export class ArtistService {
    async getAllArtists() {
        const { data, error } = await supabase
            .from('Artist')
            .select(`
                *,
                User!Artist_userId_fkey (name, email, userImgURL)
            `)
            .order('id', { ascending: false });

        if (error) throw error;
        return data;
    }

    async getArtistById(id: number) {
        const { data, error } = await supabase
            .from('Artist')
            .select(`
                *,
                User!Artist_userId_fkey (name, email, userImgURL)
            `)
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    }

    async getArtistByUserId(userId: number) {
        const { data, error } = await supabase
            .from('Artist')
            .select('*')
            .eq('userId', userId)
            .single();

        if (error && error.code !== 'PGRST116') throw error;
        return data;
    }

    async createArtist(artistData: CreateArtistData) {
        const { data, error } = await supabase
            .from('Artist')
            .insert(artistData)
            .select(`
                *,
                User (name, email)
            `)
            .single();

        if (error) throw error;
        return data;
    }

    async updateArtist(id: number, artistData: UpdateArtistData) {
        const { data, error } = await supabase
            .from('Artist')
            .update(artistData)
            .eq('id', id)
            .select(`
                *,
                User (name, email)
            `)
            .single();

        if (error) throw error;
        return data;
    }

    async deleteArtist(id: number) {
        const { error } = await supabase
            .from('Artist')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return true;
    }

    async searchArtistsByGenre(genre: string) {
        const { data, error } = await supabase
            .from('Artist')
            .select(`
                *,
                User!Artist_userId_fkey (name, userImgURL)
            `)
            .ilike('genres', `%${genre}%`);

        if (error) throw error;
        return data;
    }

    async getFollowersCount(artistId: number) {
        const { count, error } = await supabase
            .from('UserFollowArtist')
            .select('*', { count: 'exact', head: true })
            .eq('artistId', artistId);

        if (error) throw error;
        return count || 0;
    }
}

export const artistService = new ArtistService();