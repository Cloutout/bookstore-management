import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/services/user.service';
import { LoginDto } from '../DTOs/login.dto';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
    }>;
}
