import { BookService } from '../services/book.service';
import { CreateBookDto } from '../DTOs/create-book.dto';
import { UpdateBookDto } from '../DTOs/update-book.dto';
import { AssignBookDto } from '../DTOs/assign-book.dto';
export declare class BookController {
    private readonly bookService;
    constructor(bookService: BookService);
    create(createBookDto: CreateBookDto): Promise<import("../entities/book.entity").Book>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<import("../entities/book.entity").Book>;
    update(id: string, updateBookDto: UpdateBookDto): Promise<import("../entities/book.entity").Book>;
    remove(id: string): Promise<{
        affected?: number;
    }>;
    assignBook(assignBookDto: AssignBookDto): Promise<any[]>;
}
