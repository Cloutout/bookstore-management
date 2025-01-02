import { UserService } from '../../user/services/user.service';
import { LoginDto } from '../dto/login.dto';
export declare class AuthController {
    private readonly userService;
    constructor(userService: UserService);
    login(loginDto: LoginDto): Promise<any>;
}
