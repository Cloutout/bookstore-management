import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from '../DTOs/create-book.dto';
import { UpdateBookDto } from '../DTOs/update-book.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../entities/book.entity';
import { AssignBookDto } from '../DTOs/assign-book.dto';
import { Availability } from '../entities/availability.entity';
import { Bookstore } from 'src/bookstore/entities/bookstore.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly repo: Repository<Book>,
    @InjectRepository(Bookstore)
    private readonly storeRepo: Repository<Bookstore>,
    @InjectRepository(Availability)
    private readonly availabilityRepository: Repository<Availability>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = this.repo.create(createBookDto);
    return this.repo.save(book);
  }

  async findAll(): Promise<any[]> {
    const books = await this.repo.find({
      relations: ['availabilities', 'availabilities.bookstore'],
    });

    return books.map((book) => ({
      id: book.id,
      title: book.title,
      author: book.author,
      stores: book.availabilities.map((availability) => ({
        storeId: availability.bookstore.id,
        storeName: availability.bookstore.title,
        quantity: availability.quantity,
        price: availability.price,
      })),
    }));
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.repo.findOne({
      where: { id },
      relations: ['availabilities', 'availabilities.bookstore'],
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.repo.findOneBy({ id });
    if (!book) throw new NotFoundException('Book not found');

    book.title = updateBookDto.title || book.title;
    book.author = updateBookDto.author || book.author;

    return this.repo.save(book);
  }

  async assignBook(assignBookDto: AssignBookDto): Promise<any> {
    const book = await this.repo.findOneBy({ id: assignBookDto.book_id });
    if (!book) throw new NotFoundException('Book not found');

    const store = await this.storeRepo.findOneBy({
      id: assignBookDto.store_id,
    });
    if (!store) throw new NotFoundException('Store not found');

    const existingAvailability = await this.availabilityRepository.findOne({
      where: {
        book: { id: assignBookDto.book_id },
        bookstore: { id: assignBookDto.store_id },
      },
    });

    if (existingAvailability) {
      existingAvailability.quantity = assignBookDto.quantity;
      existingAvailability.price = assignBookDto.price;
      return this.availabilityRepository.save(existingAvailability);
    }

    const availability = this.availabilityRepository.create({
      book,
      bookstore: store,
      quantity: assignBookDto.quantity,
      price: assignBookDto.price,
    });

    return this.availabilityRepository.save(availability);
  }
}
