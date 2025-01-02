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
const user_entity_1 = require("../entities/user.entity");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const user_seed_1 = require("../../user/user.seed");
let UserService = class UserService {
    constructor(repo, jwtService) {
        this.repo = repo;
        this.jwtService = jwtService;
    }
    async create(createUserDto) {
        const user = await this.repo.findOneBy({ email: createUserDto.email });
        if (user) {
            return { message: 'User already exists' };
        }
        const item = new user_entity_1.User();
        item.name = createUserDto.name;
        item.email = createUserDto.email;
        item.role = createUserDto.role;
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        item.password = hashedPassword;
        return this.repo.save(item);
    }
    findAll() {
        return this.repo.find();
    }
    findOne(id) {
        return this.repo.findOneBy({ id });
    }
    async update(id, updateUserDto) {
        const item = new user_entity_1.User();
        item.name = updateUserDto.name;
        item.email = updateUserDto.email;
        const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
        item.password = hashedPassword;
        item.role = updateUserDto.role;
        item.id = id;
        return this.repo.save(item);
    }
    remove(id) {
        return this.repo.delete(id);
    }
    async validateUser(email, password) {
        if (email === undefined || password === undefined) {
            return new common_1.UnauthorizedException();
        }
        const user = await this.repo.findOneBy({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const payload = { sub: user.name, email: user.email, role: user.role };
            return {
                access_token: await this.jwtService.signAsync(payload),
            };
        }
        return new common_1.UnauthorizedException();
    }
    async seed() {
        await this.repo.save(user_seed_1.usersSeed);
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