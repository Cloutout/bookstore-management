import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Bookstore } from 'src/bookstore/entities/bookstore.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'varchar', length: 100 })
  author: string;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @ManyToOne(() => Bookstore, (bookstore) => bookstore.books, {
    onDelete: 'CASCADE',
  })
  bookstore: Bookstore;
}
