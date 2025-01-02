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
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bookstore_entity_1 = require("../entities/bookstore.entity");
const book_entity_1 = require("../../book/entities/book.entity");
let BookstoreService = class BookstoreService {
    constructor(bookRepository, bookstoreRepository) {
        this.bookRepository = bookRepository;
        this.bookstoreRepository = bookstoreRepository;
    }
    async create(createBookstoreDto) {
        const bookstore = new bookstore_entity_1.Bookstore();
        bookstore.title = createBookstoreDto.title;
        return this.bookstoreRepository.save(bookstore);
    }
    async findAll() {
        const bookstores = this.bookstoreRepository.find({
            relations: ['books'],
        });
        return bookstores;
    }
    async findOne(id) {
        const bookstore = await this.bookstoreRepository.findOne({
            where: { id },
            relations: ['books'],
        });
        return bookstore;
    }
    async update(id, updateBookstoreDto) {
        const bookstore = await this.bookstoreRepository.findOne({
            where: { id },
        });
        if (bookstore) {
            bookstore.title = updateBookstoreDto.title;
            return this.bookstoreRepository.save(bookstore);
        }
        else {
            return { message: 'Bookstore not found' };
        }
    }
    async remove(id) {
        const bookstore = await this.bookstoreRepository.findOne({
            where: { id },
        });
        if (bookstore) {
            return this.bookstoreRepository.remove(bookstore);
        }
        else {
            return null;
        }
    }
    async getBookstoreByBookId(bookId) {
        const book = await this.bookstoreRepository.findOne({
            where: { books: { id: bookId, quantity: (0, typeorm_2.MoreThan)(0) } },
            relations: ['books'],
        });
        if (book) {
            return book;
        }
        else {
            return {
                message: 'There is no book quantity more than zero for bookstore ',
            };
        }
    }
    async removeBookFromBookstore(bookId, bookstoreId, quantity) {
        const bookstore = await this.bookstoreRepository.findOne({
            where: { id: bookstoreId, books: { id: bookId } },
            relations: ['books'],
        });
        if (bookstore) {
            const book = bookstore.books.filter((book) => {
                if (book.id === bookId) {
                    if (book.quantity >= quantity) {
                        book.quantity -= quantity;
                    }
                    else {
                        return null;
                    }
                }
                return book;
            });
            return await this.bookRepository.save(book);
        }
        else {
            return { message: 'Bookstore not found' };
        }
    }
    async addBookToBookstore(bookId, bookstoreId, quantity) {
        const bookstore = await this.bookstoreRepository.findOne({
            where: { id: bookstoreId, books: { id: bookId } },
            relations: ['books'],
        });
        if (bookstore) {
            const book = bookstore.books.map((book) => {
                if (book.id === bookId) {
                    book.quantity += quantity;
                }
                return book;
            });
            return await this.bookRepository.save(book);
        }
        else {
            return { message: 'Bookstore not found' };
        }
    }
};
exports.BookstoreService = BookstoreService;
exports.BookstoreService = BookstoreService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(book_entity_1.Book)),
    __param(1, (0, typeorm_1.InjectRepository)(bookstore_entity_1.Bookstore)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BookstoreService);
//# sourceMappingURL=bookstore.service.js.map