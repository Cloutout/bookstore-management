import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    seed(): "Seeding is only allowed in development mode" | Promise<void>;
    getProfile(req: any): any;
    create(createUserDto: CreateUserDto): Promise<import("../entities/user.entity").User | {
        message: string;
    }>;
    findAll(): Promise<import("../entities/user.entity").User[]>;
    findOne(id: string): Promise<import("../entities/user.entity").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("../entities/user.entity").User>;
    remove(id: string): Promise<{
        affected?: number;
    }>;
}
