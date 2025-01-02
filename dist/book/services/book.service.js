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
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const book_entity_1 = require("../entities/book.entity");
const bookstore_entity_1 = require("../../bookstore/entities/bookstore.entity");
let BookService = class BookService {
    constructor(bookRepository, bookstoreRepository) {
        this.bookRepository = bookRepository;
        this.bookstoreRepository = bookstoreRepository;
    }
    async create(createBookDto) {
        const book = new book_entity_1.Book();
        book.title = createBookDto.title;
        book.author = createBookDto.author;
        return this.bookRepository.save(book);
    }
    async findAll() {
        return await this.bookRepository.find({
            relations: ['bookstore'],
        });
    }
    async findOne(id) {
        return await this.bookRepository.findOne({
            where: { id },
        });
    }
    async update(id, updateBookDto) {
        const book = await this.bookRepository.findOne({
            where: { id },
        });
        if (book) {
            book.title = updateBookDto.title;
            book.author = updateBookDto.author;
            return this.bookRepository.save(book);
        }
        else {
            return null;
        }
    }
    async remove(id) {
        const book = await this.bookRepository.findOne({
            where: { id },
        });
        if (book) {
            return this.bookRepository.remove(book);
        }
        else {
            return null;
        }
    }
};
exports.BookService = BookService;
exports.BookService = BookService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(book_entity_1.Book)),
    __param(1, (0, typeorm_1.InjectRepository)(bookstore_entity_1.Bookstore)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BookService);
//# sourceMappingURL=book.service.js.map