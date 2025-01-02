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
exports.BookstoreService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const bookstore_entity_1 = require("../entities/bookstore.entity");
let BookstoreService = class BookstoreService {
    constructor(repo) {
        this.repo = repo;
    }
    create(createBookstoreDto) {
        const item = new bookstore_entity_1.Bookstore();
        item.title = createBookstoreDto.title;
        return this.repo.save(item);
    }
    async findAll() {
        const booksWithQuantities = await this.repo.find({
            relations: ['availabilities', 'availabilities.book'],
        });
        return booksWithQuantities.map((store) => {
            return {
                id: store.id,
                title: store.title,
                books: store.availabilities.map((quantity) => ({
                    id: quantity.book.id,
                    title: quantity.book.title,
                    author: quantity.book.author,
                    quantity: quantity.quantity,
                    price: quantity.price,
                })),
            };
        });
    }
    findOne(id) {
        return this.repo.findOneBy({ id });
    }
    find(id) {
        return this.repo.find({
            relations: ['availabilities', 'availabilities.book'],
            where: { id },
            take: 1,
        });
    }
    update(id, updateBookstoreDto) {
        const item = new bookstore_entity_1.Bookstore();
        item.title = updateBookstoreDto.title;
        item.id = id;
        return this.repo.save(item);
    }
    remove(id) {
        return this.repo.delete(id);
    }
};
exports.BookstoreService = BookstoreService;
exports.BookstoreService = BookstoreService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(bookstore_entity_1.Bookstore)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], BookstoreService);
//# sourceMappingURL=bookstore.service.js.map