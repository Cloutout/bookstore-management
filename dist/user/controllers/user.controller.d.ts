import { UserService } from '../services/user.service';
import { CreateUserDto } from '../DTOs/create-user.dto';
import { UpdateUserDto } from '../DTOs/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    seed(): "Seeding is only allowed in development mode" | Promise<void>;
    getProfile(req: any): any;
    create(createUserDto: CreateUserDto): Promise<import("../entities/user.entity").User>;
    findAll(): Promise<import("../entities/user.entity").User[]>;
    findOne(id: string): Promise<import("../entities/user.entity").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("../entities/user.entity").User>;
    remove(id: string): Promise<{
        affected?: number;
    }>;
}
