import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../DTOs/create-user.dto';
import { UpdateUserDto } from '../DTOs/update-user.dto';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { usersSeed } from '../user.seed';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.repo.findOneBy({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new Error('Email already exists!');
    }

    const hashedPassword = await this.hashPassword(createUserDto.password);
    const user = this.repo.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.repo.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.repo.findOneBy({
      email: updateUserDto.email,
    });
    if (existingUser && existingUser.id !== id) {
      throw new Error('Email already exists!');
    }

    const hashedPassword = await this.hashPassword(updateUserDto.password);
    const updatedUser = { ...updateUserDto, password: hashedPassword, id };
    return this.repo.save(updatedUser);
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  findAll(): Promise<User[]> {
    return this.repo.find();
  }

  findOne(id: number): Promise<User> {
    return this.repo.findOneBy({ id });
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.repo.delete(id);
    if (result.affected) {
      return { message: 'User successfully deleted.' };
    }
    throw new Error('User not found.');
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.repo.findOneBy({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { sub: user.name, email: user.email, role: user.role };
      return { access_token: await this.jwtService.signAsync(payload) };
    }
    throw new UnauthorizedException('Invalid email or password.');
  }

  async seed() {
    if (process.env.NODE_ENV !== 'development') {
      throw new Error('Seeding is only allowed in development mode.');
    }
    await this.repo.save(usersSeed);
  }
}
