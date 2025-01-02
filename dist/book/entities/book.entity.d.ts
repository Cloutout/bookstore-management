import { Availability } from './availability.entity';
export declare class Book {
    id: number;
    title: string;
    author: string;
    availabilities: Availability[];
}
