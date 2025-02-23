import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { Role } from '../entities/enums';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, role } = req.body;

      if (!name || !email || !role) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      if (!['student', 'teacher'].includes(role)) {
        res.status(400).json({ error: 'Invalid role' });
        return;
      }

      const user = await this.userService.createUser(name, email, role as Role);
      res.status(201).json(user);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}