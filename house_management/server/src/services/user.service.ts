import { User } from '../database/entities/User';
import { userRepository } from '../repositories/userRepository';

export default class UserService {
    userRepository = userRepository;
    async findUserByID(id: number): Promise<User | null> {
        return this.userRepository.findOne({ where: { id } });
    }

    async createUser(data: Partial<User>): Promise<User> {
        const user = this.userRepository.create(data);
        return this.userRepository.save(user);
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } })
    }
}