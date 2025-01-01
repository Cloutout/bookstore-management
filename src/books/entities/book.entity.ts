import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Bookstore } from '../../bookstores/entities/bookstore.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column()
  author: string;

  @Column('text')
  description: string;

  @ManyToMany(() => Bookstore, bookstore => bookstore.books)
  bookstores: Bookstore[];
}
