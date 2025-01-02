import { Availability } from './availability.entity';
import { Bookstore } from 'src/bookstore/entities/bookstore.entity';
export declare class Book {
    id: number;
    title: string;
    author: string;
    availabilities: Availability[];
    get stores(): Bookstore[];
}
