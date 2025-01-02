import { Repository } from 'typeorm';
import { CreateUserDto } from '../DTOs/create-user.dto';
import { UpdateUserDto } from '../DTOs/update-user.dto';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private readonly repo;
    private readonly jwtService;
    constructor(repo: Repository<User>, jwtService: JwtService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<{
        affected?: number;
    }>;
    validateUser(email: string, password: string): Promise<any>;
    seed(): Promise<void>;
}
