"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("../entities/user.entity");
const jwt_1 = require("@nestjs/jwt");
const user_seed_1 = require("../user.seed");
let UserService = class UserService {
    constructor(repo, jwtService) {
        this.repo = repo;
        this.jwtService = jwtService;
    }
    async create(createUserDto) {
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
    async update(id, updateUserDto) {
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
    async remove(id) {
        const result = await this.repo.delete(id);
        if (result.affected) {
            return { message: 'User successfully deleted.' };
        }
        throw new Error('User not found.');
    }
    findAll() {
        return this.repo.find();
    }
    findOne(id) {
        return this.repo.findOneBy({ id });
    }
    async findByEmail(email) {
        return this.repo.findOne({ where: { email } });
    }
    async validateUser(email, pass) {
        const user = await this.findByEmail(email);
        if (user && (await bcrypt.compare(pass, user.password))) {
            return Object.fromEntries(Object.entries(user).filter(([key]) => key !== 'password'));
        }
        return null;
    }
    async seed() {
        const currentEnv = process.env.NODE_ENV || 'development';
        console.log('Current Environment:', currentEnv);
        if (currentEnv !== 'development') {
            throw new Error('Seeding is only allowed in development mode.');
        }
        const seedResults = [];
        for (const user of user_seed_1.usersSeed) {
            const existingUser = await this.repo.findOneBy({ email: user.email });
            if (existingUser) {
                console.log(`User with email ${user.email} already exists.`);
                continue;
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
    async hashPassword(password) {
        return bcrypt.hash(password, 10);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map