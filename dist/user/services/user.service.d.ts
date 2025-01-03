import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../DTOs/create-user.dto';
import { UpdateUserDto } from '../DTOs/update-user.dto';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private readonly repo;
    private readonly jwtService;
    constructor(repo: Repository<User>, jwtService: JwtService);
    create(createUserDto: CreateUserDto): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<{
        message: string;
    }>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    validateUser(email: string, password: string): Promise<any>;
    seed(): Promise<User[]>;
    hashPassword(password: string): Promise<string>;
}
