import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Book } from '../../books/entities/book.entity';

@Entity()
export class Bookstore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  location: string;

  @ManyToMany(() => Book, book => book.bookstores, { cascade: true })
  @JoinTable()
  books: Book[];
}
