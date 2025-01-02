import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { Repository } from 'typeorm';
import { Book } from '../entities/book.entity';
import { Bookstore } from 'src/bookstore/entities/bookstore.entity';
export declare class BookService {
    private readonly bookRepository;
    private readonly bookstoreRepository;
    constructor(bookRepository: Repository<Book>, bookstoreRepository: Repository<Bookstore>);
    create(createBookDto: CreateBookDto): Promise<Book>;
    findAll(): Promise<Book[]>;
    findOne(id: number): Promise<Book>;
    update(id: number, updateBookDto: UpdateBookDto): Promise<Book>;
    remove(id: number): Promise<Book>;
}
