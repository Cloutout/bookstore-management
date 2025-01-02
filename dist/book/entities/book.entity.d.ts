import { Bookstore } from 'src/bookstore/entities/bookstore.entity';
export declare class Book {
    id: number;
    title: string;
    author: string;
    quantity: number;
    bookstore: Bookstore;
}
