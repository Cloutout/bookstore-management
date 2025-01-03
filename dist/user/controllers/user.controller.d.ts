import { UserService } from '../services/user.service';
import { CreateUserDto } from '../DTOs/create-user.dto';
import { UpdateUserDto } from '../DTOs/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    seedUsers(): Promise<{
        message: string;
        data: import("../entities/user.entity").User[];
    }>;
    create(createUserDto: CreateUserDto): Promise<import("../entities/user.entity").User>;
    findAll(): Promise<import("../entities/user.entity").User[]>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<import("../entities/user.entity").User>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
