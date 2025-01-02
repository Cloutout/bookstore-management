import { CreateBookstoreDto } from '../DTOs/create-bookstore.dto';
import { UpdateBookstoreDto } from '../DTOs/update-bookstore.dto';
import { Repository } from 'typeorm';
import { Bookstore } from '../entities/bookstore.entity';
export declare class BookstoreService {
    private readonly repo;
    constructor(repo: Repository<Bookstore>);
    create(createBookstoreDto: CreateBookstoreDto): Promise<Bookstore>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<Bookstore>;
    find(id: number): Promise<Bookstore[]>;
    update(id: number, updateBookstoreDto: UpdateBookstoreDto): Promise<Bookstore>;
    remove(id: number): Promise<{
        affected?: number;
    }>;
}
