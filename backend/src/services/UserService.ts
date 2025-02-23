import { Role } from '../entities/enums';
import { User } from '../entities/User';
import { store } from '../store';

export class UserService {
  async createUser(name: string, email: string, role: Role): Promise<User> {
    return store.createUser(name, email, role);
  }

  async findById(id: string): Promise<User | null> {
    return store.findUserById(id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return store.findUserByEmail(email) || null;
  }
}