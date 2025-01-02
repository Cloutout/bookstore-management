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
    async create(createBookstoreDto) {
        const item = this.repo.create(createBookstoreDto);
        return this.repo.save(item);
    }
    async findAll() {
        const booksWithQuantities = await this.repo.find({
            relations: ['availabilities', 'availabilities.book'],
        });
        return booksWithQuantities.map((store) => ({
            id: store.id,
            title: store.title,
            books: store.availabilities.map((availability) => ({
                id: availability.book.id,
                title: availability.book.title,
                author: availability.book.author,
                quantity: availability.quantity,
                price: availability.price,
            })),
        }));
    }
    async findOne(id) {
        const store = await this.repo.findOne({ where: { id } });
        if (!store) {
            throw new common_1.NotFoundException('Bookstore not found');
        }
        return store;
    }
    async updateBookQuantity(bookstoreId, bookId, quantity) {
        const store = await this.repo.findOne({
            where: { id: bookstoreId },
            relations: ['availabilities', 'availabilities.book'],
        });
        if (!store) {
            throw new common_1.NotFoundException('Bookstore not found');
        }
        const bookAvailability = store.availabilities.find((availability) => availability.book.id === bookId);
        if (!bookAvailability) {
            throw new common_1.NotFoundException('Book not available in this bookstore');
        }
        bookAvailability.quantity += quantity;
        if (bookAvailability.quantity < 0) {
            throw new Error('Quantity cannot be negative');
        }
        return this.repo.save(store);
    }
    async update(id, updateBookstoreDto) {
        const store = await this.repo.preload({ id, ...updateBookstoreDto });
        if (!store) {
            throw new common_1.NotFoundException('Bookstore not found');
        }
        return this.repo.save(store);
    }
    async remove(id) {
        const result = await this.repo.delete(id);
        if (result.affected) {
            return { message: 'Bookstore successfully deleted.' };
        }
        throw new common_1.NotFoundException('Bookstore not found');
    }
};
exports.BookstoreService = BookstoreService;
exports.BookstoreService = BookstoreService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(bookstore_entity_1.Bookstore)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], BookstoreService);
//# sourceMappingURL=bookstore.service.js.map