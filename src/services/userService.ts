import { supabase } from '../config/supabase';
import { Database, Tables } from '../types/database.types';

type User = Tables<'User'>;
type CreateUserData = Database['public']['Tables']['User']['Insert'];
type UpdateUserData = Database['public']['Tables']['User']['Update'];

export class UserService {
    async getAllUsers() {
        const { data, error } = await supabase
            .from('User')
            .select('*')
            .order('createdAt', { ascending: false });

        if (error) throw error;
        return data;
    }

    async getUserById(id: number) {
        const { data, error } = await supabase
            .from('User')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    }

    async getUserByEmail(email: string) {
        const { data, error } = await supabase
            .from('User')
            .select('*')
            .eq('email', email)
            .single();

        if (error && error.code !== 'PGRST116') throw error; // PGRST116 = not found
        return data;
    }

    async createUser(userData: CreateUserData) {
        const { data, error } = await supabase
            .from('User')
            .insert(userData)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    async updateUser(id: number, userData: UpdateUserData) {
        const { data, error } = await supabase
            .from('User')
            .update(userData)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    async deleteUser(id: number) {
        const { error } = await supabase
            .from('User')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return true;
    }

    async getUserWithArtist(id: number) {
        const { data, error } = await supabase
            .from('User')
            .select(`
                *,
                Artist (*)
            `)
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    }
}

export const userService = new UserService();