import { CreateBookDto } from '../DTOs/create-book.dto';
import { UpdateBookDto } from '../DTOs/update-book.dto';
import { Repository } from 'typeorm';
import { Book } from '../entities/book.entity';
import { AssignBookDto } from '../DTOs/assign-book.dto';
import { Availability } from '../entities/availability.entity';
import { Bookstore } from 'src/bookstore/entities/bookstore.entity';
export declare class BookService {
    private readonly repo;
    private readonly storeRepo;
    private readonly availabilityRepository;
    constructor(repo: Repository<Book>, storeRepo: Repository<Bookstore>, availabilityRepository: Repository<Availability>);
    create(createBookDto: CreateBookDto): Promise<Book>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<Book>;
    update(id: number, updateBookDto: UpdateBookDto): Promise<Book>;
    remove(id: number): Promise<{
        affected?: number;
    }>;
    assignBook(assignBookDto: AssignBookDto): Promise<any[]>;
}
