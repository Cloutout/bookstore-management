import { AuthService } from '../services/auth.service';
import { LoginDto } from '../DTOs/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
    }>;
}
