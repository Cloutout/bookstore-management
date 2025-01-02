import { BookstoreService } from '../service/bookstore.service';
import { CreateBookstoreDto } from '../dto/create-bookstore.dto';
import { UpdateBookstoreDto } from '../dto/update-bookstore.dto';
import { quantityOfBookstore } from 'src/bookstore/dto/quantity-of-bookstore';
export declare class BookstoreController {
    private readonly bookstoreService;
    constructor(bookstoreService: BookstoreService);
    create(createBookstoreDto: CreateBookstoreDto): Promise<import("../entities/bookstore.entity").Bookstore>;
    findAll(): Promise<import("../entities/bookstore.entity").Bookstore[]>;
    findOne(id: string): Promise<import("../entities/bookstore.entity").Bookstore>;
    update(id: string, updateBookstoreDto: UpdateBookstoreDto): Promise<import("../entities/bookstore.entity").Bookstore | {
        message: string;
    }>;
    remove(id: string): Promise<import("../entities/bookstore.entity").Bookstore>;
    getBookstoreByBookId(bookId: string): Promise<import("../entities/bookstore.entity").Bookstore | {
        message: string;
    }>;
    removeBookstoreByBookId(bookId: string, bookstoreId: string, quantity: string): Promise<import("../../book/entities/book.entity").Book[] | {
        message: string;
    }>;
    addBookstoreByBookId(addBookToBookStore: quantityOfBookstore): Promise<import("../../book/entities/book.entity").Book[] | {
        message: string;
    }>;
}
