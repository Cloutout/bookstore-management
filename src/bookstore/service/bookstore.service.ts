import { Injectable } from '@nestjs/common';
import { CreateBookstoreDto } from '../dto/create-bookstore.dto';
import { UpdateBookstoreDto } from '../dto/update-bookstore.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Bookstore } from '../entities/bookstore.entity';
import { Book } from 'src/book/entities/book.entity';

@Injectable()
export class BookstoreService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @InjectRepository(Bookstore)
    private readonly bookstoreRepository: Repository<Bookstore>,
  ) {}
  async create(createBookstoreDto: CreateBookstoreDto): Promise<Bookstore> {
    const bookstore = new Bookstore();
    bookstore.title = createBookstoreDto.title;
    return this.bookstoreRepository.save(bookstore);
  }

  async findAll(): Promise<Bookstore[]> {
    const bookstores = this.bookstoreRepository.find({
      relations: ['books'],
    });
    return bookstores;
  }

  async findOne(id: number): Promise<Bookstore> {
    const bookstore = await this.bookstoreRepository.findOne({
      where: { id },
      relations: ['books'],
    });
    return bookstore;
  }

  async update(
    id: number,
    updateBookstoreDto: UpdateBookstoreDto,
  ): Promise<Bookstore | { message: string }> {
    const bookstore = await this.bookstoreRepository.findOne({
      where: { id },
    });
    if (bookstore) {
      bookstore.title = updateBookstoreDto.title;
      return this.bookstoreRepository.save(bookstore);
    } else {
      return { message: 'Bookstore not found' };
    }
  }

  async remove(id: number) {
    const bookstore = await this.bookstoreRepository.findOne({
      where: { id },
    });
    if (bookstore) {
      return this.bookstoreRepository.remove(bookstore);
    } else {
      return null;
    }
  }

  async getBookstoreByBookId(bookId: number) {
    const book = await this.bookstoreRepository.findOne({
      where: { books: { id: bookId, quantity: MoreThan(0) } },
      relations: ['books'],
    });
    if (book) {
      return book;
    } else {
      return {
        message: 'There is no book quantity more than zero for bookstore ',
      };
    }
  }

  async removeBookFromBookstore(
    bookId: number,
    bookstoreId: number,
    quantity: number,
  ) {
    const bookstore = await this.bookstoreRepository.findOne({
      where: { id: bookstoreId, books: { id: bookId } },
      relations: ['books'],
    });

    if (bookstore) {
      const book = bookstore.books.filter((book) => {
        if (book.id === bookId) {
          if (book.quantity >= quantity) {
            book.quantity -= quantity;
          } else {
            return null;
          }
        }
        return book;
      });
      return await this.bookRepository.save(book);
    } else {
      return { message: 'Bookstore not found' };
    }
  }

  async addBookToBookstore(
    bookId: number,
    bookstoreId: number,
    quantity: number,
  ) {
    const bookstore = await this.bookstoreRepository.findOne({
      where: { id: bookstoreId, books: { id: bookId } },
      relations: ['books'],
    });

    if (bookstore) {
      const book = bookstore.books.map((book) => {
        if (book.id === bookId) {
          book.quantity += quantity;
        }
        return book;
      });
      return await this.bookRepository.save(book);
    } else {
      return { message: 'Bookstore not found' };
    }
  }
}
