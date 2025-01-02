import { CreateBookstoreDto } from '../dto/create-bookstore.dto';
import { UpdateBookstoreDto } from '../dto/update-bookstore.dto';
import { Repository } from 'typeorm';
import { Bookstore } from '../entities/bookstore.entity';
import { Book } from 'src/book/entities/book.entity';
export declare class BookstoreService {
    private readonly bookRepository;
    private readonly bookstoreRepository;
    constructor(bookRepository: Repository<Book>, bookstoreRepository: Repository<Bookstore>);
    create(createBookstoreDto: CreateBookstoreDto): Promise<Bookstore>;
    findAll(): Promise<Bookstore[]>;
    findOne(id: number): Promise<Bookstore>;
    update(id: number, updateBookstoreDto: UpdateBookstoreDto): Promise<Bookstore | {
        message: string;
    }>;
    remove(id: number): Promise<Bookstore>;
    getBookstoreByBookId(bookId: number): Promise<Bookstore | {
        message: string;
    }>;
    removeBookFromBookstore(bookId: number, bookstoreId: number, quantity: number): Promise<Book[] | {
        message: string;
    }>;
    addBookToBookstore(bookId: number, bookstoreId: number, quantity: number): Promise<Book[] | {
        message: string;
    }>;
}
