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
exports.BookService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const book_entity_1 = require("../entities/book.entity");
const availability_entity_1 = require("../entities/availability.entity");
const bookstore_entity_1 = require("../../bookstore/entities/bookstore.entity");
let BookService = class BookService {
    constructor(repo, storeRepo, availabilityRepository) {
        this.repo = repo;
        this.storeRepo = storeRepo;
        this.availabilityRepository = availabilityRepository;
    }
    async create(createBookDto) {
        const item = new book_entity_1.Book();
        item.title = createBookDto.title;
        item.author = createBookDto.author;
        return this.repo.save(item);
    }
    async findAll() {
        const res = await this.repo.find({
            relations: ['availabilities', 'availabilities.bookstore'],
        });
        return res.map((book) => {
            return {
                id: book.id,
                title: book.title,
                stores: book.availabilities.map((quantity) => ({
                    id: quantity.bookstore.id,
                    title: quantity.bookstore.title,
                    quantity: quantity.quantity,
                    price: quantity.price,
                })),
            };
        });
    }
    findOne(id) {
        return this.repo.findOne({
            where: { id },
            relations: ['availabilities', 'availabilities.bookstore'],
        });
    }
    async update(id, updateBookDto) {
        const book = await this.repo.findOne({
            where: { id },
            relations: ['bookstores'],
        });
        if (!book) {
            throw new common_1.NotFoundException('Book not found');
        }
        book.title = updateBookDto.title;
        book.author = updateBookDto.author;
        return this.repo.save(book);
    }
    remove(id) {
        return this.repo.delete(id);
    }
    async assignBook(assignBookDto) {
        const book = await this.repo.findOne({
            where: { id: assignBookDto.book_id },
            relations: ['availabilities', 'availabilities.bookstore'],
        });
        if (!book) {
            throw new common_1.NotFoundException('Book not found');
        }
        const store = await this.storeRepo.findOne({
            where: { id: assignBookDto.store_id },
        });
        if (!store) {
            throw new common_1.NotFoundException('Store not found');
        }
        const availability = book.availabilities.find((item) => item.bookstore.id === assignBookDto.store_id);
        if (availability) {
            if (assignBookDto.quantity === 0) {
                await this.availabilityRepository.remove(availability);
                return;
            }
            availability.quantity = assignBookDto.quantity;
            availability.price = assignBookDto.price;
            await this.availabilityRepository.save(availability);
            return;
        }
        else {
            if (assignBookDto.quantity === 0) {
                return;
            }
            const availability = new availability_entity_1.Availability();
            availability.bookstore = store;
            availability.quantity = assignBookDto.quantity;
            availability.price = assignBookDto.price;
            book.availabilities.push(availability);
            await this.availabilityRepository.save(availability);
            await this.repo.save(book);
        }
    }
};
exports.BookService = BookService;
exports.BookService = BookService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(book_entity_1.Book)),
    __param(1, (0, typeorm_2.InjectRepository)(bookstore_entity_1.Bookstore)),
    __param(2, (0, typeorm_2.InjectRepository)(availability_entity_1.Availability)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], BookService);
//# sourceMappingURL=book.service.js.map