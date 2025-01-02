import { UserService } from 'src/user/services/user.service';
import { LoginDto } from '../DTOs/login.dto';
export declare class AuthController {
    private readonly userService;
    constructor(userService: UserService);
    login(loginDto: LoginDto): Promise<any>;
}
