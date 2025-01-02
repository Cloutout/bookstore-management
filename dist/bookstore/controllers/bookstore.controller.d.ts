import { BookstoreService } from '../services/bookstore.service';
import { CreateBookstoreDto } from '../DTOs/create-bookstore.dto';
import { UpdateBookQuantityDto } from 'src/bookstore/DTOs/update-book-quantity.dto';
export declare class BookstoreController {
    private readonly bookstoreService;
    constructor(bookstoreService: BookstoreService);
    create(createBookstoreDto: CreateBookstoreDto): Promise<import("../entities/bookstore.entity").Bookstore>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<import("../entities/bookstore.entity").Bookstore>;
    updateBookQuantity(bookstoreId: number, bookId: number, updateBookQuantityDto: UpdateBookQuantityDto): Promise<any>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
