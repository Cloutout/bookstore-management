import { Book } from './book.entity';
import { Bookstore } from 'src/bookstore/entities/bookstore.entity';
export declare class Availability {
    id: number;
    quantity: number;
    price: number;
    book: Book;
    bookstore: Bookstore;
}
