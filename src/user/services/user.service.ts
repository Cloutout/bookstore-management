import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../DTOs/create-user.dto';
import { UpdateUserDto } from '../DTOs/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { usersSeed } from '../user.seed';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Create a new user
   */
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

  /**
   * Update an existing user
   */
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

  /**
   * Delete a user by ID
   */
  async remove(id: number): Promise<{ message: string }> {
    const result = await this.repo.delete(id);

    if (result.affected) {
      return { message: 'User successfully deleted.' };
    }

    throw new Error('User not found.');
  }

  /**
   * Get all users
   */
  findAll(): Promise<User[]> {
    return this.repo.find();
  }

  /**
   * Get a user by ID
   */
  findOne(id: number): Promise<User> {
    return this.repo.findOneBy({ id });
  }

  /**
   * Validate a user for login
   */
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.repo.findOneBy({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { sub: user.id, email: user.email, role: user.role };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }

    throw new UnauthorizedException('Invalid email or password.');
  }

  /**
   * Seed users into the database
   */
  async seed(): Promise<User[]> {
    const currentEnv = process.env.NODE_ENV || 'development';
    console.log('Current Environment:', currentEnv);

    if (currentEnv !== 'development') {
      throw new Error('Seeding is only allowed in development mode.');
    }

    const seedResults = [];

    for (const user of usersSeed) {
      const existingUser = await this.repo.findOneBy({ email: user.email });

      if (existingUser) {
        console.log(`User with email ${user.email} already exists.`);
        continue; // Mevcut kullanıcıyı atla
      }

      const hashedPassword = await this.hashPassword(user.password);
      const newUser = this.repo.create({
        ...user,
        password: hashedPassword,
      });

      seedResults.push(await this.repo.save(newUser));
    }

    console.log('Seeding completed:', seedResults.length, 'users added.');
    return seedResults;
  }

  /**
   * Hash a password
   */
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
