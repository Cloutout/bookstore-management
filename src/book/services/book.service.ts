import { Injectable } from '@nestjs/common';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../entities/book.entity';
import { Bookstore } from 'src/bookstore/entities/bookstore.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @InjectRepository(Bookstore)
    private readonly bookstoreRepository: Repository<Bookstore>,
  ) {}
  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = new Book();
    book.title = createBookDto.title;
    book.author = createBookDto.author;
    return this.bookRepository.save(book);
  }

  async findAll(): Promise<Book[]> {
    return await this.bookRepository.find({
      relations: ['bookstore'],
    });
  }

  async findOne(id: number): Promise<Book> {
    return await this.bookRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.bookRepository.findOne({
      where: { id },
    });
    if (book) {
      book.title = updateBookDto.title;
      book.author = updateBookDto.author;
      return this.bookRepository.save(book);
    } else {
      return null;
    }
  }

  async remove(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id },
    });
    if (book) {
      return this.bookRepository.remove(book);
    } else {
      return null;
    }
  }
}
