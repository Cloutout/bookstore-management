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
        const book = this.repo.create(createBookDto);
        return this.repo.save(book);
    }
    async findAll() {
        const books = await this.repo.find({
            relations: ['availabilities', 'availabilities.bookstore'],
        });
        return books.map((book) => ({
            id: book.id,
            title: book.title,
            author: book.author,
            stores: book.availabilities.map((availability) => ({
                storeId: availability.bookstore.id,
                storeName: availability.bookstore.title,
                quantity: availability.quantity,
                price: availability.price,
            })),
        }));
    }
    async findOne(id) {
        const book = await this.repo.findOne({
            where: { id },
            relations: ['availabilities', 'availabilities.bookstore'],
        });
        if (!book) {
            throw new common_1.NotFoundException('Book not found');
        }
        return book;
    }
    async update(id, updateBookDto) {
        const book = await this.repo.findOneBy({ id });
        if (!book)
            throw new common_1.NotFoundException('Book not found');
        book.title = updateBookDto.title || book.title;
        book.author = updateBookDto.author || book.author;
        return this.repo.save(book);
    }
    async assignBook(assignBookDto) {
        const book = await this.repo.findOneBy({ id: assignBookDto.book_id });
        if (!book)
            throw new common_1.NotFoundException('Book not found');
        const store = await this.storeRepo.findOneBy({
            id: assignBookDto.store_id,
        });
        if (!store)
            throw new common_1.NotFoundException('Store not found');
        const existingAvailability = await this.availabilityRepository.findOne({
            where: {
                book: { id: assignBookDto.book_id },
                bookstore: { id: assignBookDto.store_id },
            },
        });
        if (existingAvailability) {
            existingAvailability.quantity = assignBookDto.quantity;
            existingAvailability.price = assignBookDto.price;
            return this.availabilityRepository.save(existingAvailability);
        }
        const availability = this.availabilityRepository.create({
            book,
            bookstore: store,
            quantity: assignBookDto.quantity,
            price: assignBookDto.price,
        });
        return this.availabilityRepository.save(availability);
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