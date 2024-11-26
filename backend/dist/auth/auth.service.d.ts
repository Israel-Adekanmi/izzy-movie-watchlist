import { UsersRepository } from '../users/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersRepository;
    private jwtService;
    constructor(usersRepository: UsersRepository, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        accessToken: string;
    }>;
}
