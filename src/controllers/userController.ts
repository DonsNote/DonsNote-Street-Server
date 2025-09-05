import { Request, Response } from 'express';
import { userService } from '../services/userService';
import { validateUser } from '../utils/validation';
import * as responseUtils from '../utils/response';

export class UserController {
    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await userService.getAllUsers();
            res.json(responseUtils.success(users, 'Users retrieved successfully'));
        } catch (error: any) {
            console.error('Error fetching users:', error);
            res.status(500).json(responseUtils.error('Failed to fetch users', error.message));
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            
            if (isNaN(id)) {
                return res.status(400).json(responseUtils.error('Invalid user ID'));
            }

            const user = await userService.getUserById(id);
            
            if (!user) {
                return res.status(404).json(responseUtils.error('User not found'));
            }

            res.json(responseUtils.success(user, 'User retrieved successfully'));
        } catch (error: any) {
            console.error('Error fetching user:', error);
            res.status(500).json(responseUtils.error('Failed to fetch user', error.message));
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const validationErrors = validateUser(req.body);
            
            if (validationErrors.length > 0) {
                return res.status(400).json(responseUtils.error('Validation failed', validationErrors));
            }

            // 이메일 중복 체크
            const existingUser = await userService.getUserByEmail(req.body.email);
            if (existingUser) {
                return res.status(409).json(responseUtils.error('User with this email already exists'));
            }

            const userData = {
                name: req.body.name,
                email: req.body.email,
                info: req.body.info,
                userImgURL: req.body.userImgURL || '/static/images/userProfile/defaultUser.jpg',
                password: req.body.password || null
            };

            const newUser = await userService.createUser(userData);
            res.status(201).json(responseUtils.created(newUser, 'User created successfully'));
        } catch (error: any) {
            console.error('Error creating user:', error);
            res.status(500).json(responseUtils.error('Failed to create user', error.message));
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            
            if (isNaN(id)) {
                return res.status(400).json(responseUtils.error('Invalid user ID'));
            }

            const existingUser = await userService.getUserById(id);
            if (!existingUser) {
                return res.status(404).json(responseUtils.error('User not found'));
            }

            const updateData = {
                ...(req.body.name && { name: req.body.name }),
                ...(req.body.info && { info: req.body.info }),
                ...(req.body.userImgURL && { userImgURL: req.body.userImgURL }),
                ...(req.body.password && { password: req.body.password })
            };

            const updatedUser = await userService.updateUser(id, updateData);
            res.json(responseUtils.updated(updatedUser, 'User updated successfully'));
        } catch (error: any) {
            console.error('Error updating user:', error);
            res.status(500).json(responseUtils.error('Failed to update user', error.message));
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            
            if (isNaN(id)) {
                return res.status(400).json(responseUtils.error('Invalid user ID'));
            }

            const existingUser = await userService.getUserById(id);
            if (!existingUser) {
                return res.status(404).json(responseUtils.error('User not found'));
            }

            await userService.deleteUser(id);
            res.json(responseUtils.deleted('User deleted successfully'));
        } catch (error: any) {
            console.error('Error deleting user:', error);
            res.status(500).json(responseUtils.error('Failed to delete user', error.message));
        }
    }

    async getUserProfile(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            
            if (isNaN(id)) {
                return res.status(400).json(responseUtils.error('Invalid user ID'));
            }

            const userWithArtist = await userService.getUserWithArtist(id);
            
            if (!userWithArtist) {
                return res.status(404).json(responseUtils.error('User not found'));
            }

            res.json(responseUtils.success(userWithArtist, 'User profile retrieved successfully'));
        } catch (error: any) {
            console.error('Error fetching user profile:', error);
            res.status(500).json(responseUtils.error('Failed to fetch user profile', error.message));
        }
    }
}

export const userController = new UserController();