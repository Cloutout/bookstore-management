import { BookstoreService } from '../services/bookstore.service';
import { CreateBookstoreDto } from '../DTOs/create-bookstore.dto';
import { UpdateBookstoreDto } from '../DTOs/update-bookstore.dto';
export declare class BookstoreController {
    private readonly bookstoreService;
    constructor(bookstoreService: BookstoreService);
    create(createBookstoreDto: CreateBookstoreDto): Promise<import("../entities/bookstore.entity").Bookstore>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<import("../entities/bookstore.entity").Bookstore[]>;
    update(id: string, updateBookstoreDto: UpdateBookstoreDto): Promise<import("../entities/bookstore.entity").Bookstore>;
    remove(id: string): Promise<{
        affected?: number;
    }>;
}
