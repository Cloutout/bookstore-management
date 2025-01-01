import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookstore } from './entities/bookstore.entity';
import { Repository } from 'typeorm';
import { CreateBookstoreDto } from './dtos/create-bookstore.dto';
import { UpdateBookstoreDto } from './dtos/update-bookstore.dto';
import { BooksService } from '../books/books.service';

@Injectable()
export class BookstoresService {
  constructor(
    @InjectRepository(Bookstore)
    private bookstoresRepository: Repository<Bookstore>,
    private booksService: BooksService,
  ) {}

  create(createBookstoreDto: CreateBookstoreDto): Promise<Bookstore> {
    const bookstore = this.bookstoresRepository.create(createBookstoreDto);
    return this.bookstoresRepository.save(bookstore);
  }

  findAll(): Promise<Bookstore[]> {
    return this.bookstoresRepository.find({ relations: ['books'] });
  }

  findOne(id: number): Promise<Bookstore> {
    return this.bookstoresRepository.findOne(id, { relations: ['books'] });
  }

  async update(id: number, updateBookstoreDto: UpdateBookstoreDto): Promise<Bookstore> {
    const bookstore = await this.findOne(id);
    if (!bookstore) {
      throw new NotFoundException('Bookstore not found');
    }
    Object.assign(bookstore, updateBookstoreDto);
    return this.bookstoresRepository.save(bookstore);
  }

  async remove(id: number): Promise<void> {
    await this.bookstoresRepository.delete(id);
  }

  // Admin ve Store Manager için kitap ekleme ve çıkarma fonksiyonları
  async addBookToStore(storeId: number, bookId: number, quantity: number): Promise<Bookstore> {
    const bookstore = await this.findOne(storeId);
    const book = await this.booksService.findOne(bookId);
    if (!bookstore || !book) {
      throw new NotFoundException('Bookstore or Book not found');
    }
    // Quantity management logic burada eklenmeli
    // Örneğin, Bookstore-Book ilişkisinde quantity alanı olabilir
    // Bu örnekte basit bir ilişki ekleniyor
    bookstore.books.push(book);
    return this.bookstoresRepository.save(bookstore);
  }

  async removeBookFromStore(storeId: number, bookId: number, quantity: number): Promise<Bookstore> {
    const bookstore = await this.findOne(storeId);
    if (!bookstore) {
      throw new NotFoundException('Bookstore not found');
    }
    bookstore.books = bookstore.books.filter(book => book.id !== bookId);
    return this.bookstoresRepository.save(bookstore);
  }
}
