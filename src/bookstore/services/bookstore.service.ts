import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookstoreDto } from '../DTOs/create-bookstore.dto';
import { UpdateBookstoreDto } from '../DTOs/update-bookstore.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Bookstore } from '../entities/bookstore.entity';

@Injectable()
export class BookstoreService {
  constructor(
    @InjectRepository(Bookstore)
    private readonly repo: Repository<Bookstore>,
  ) {}

  async create(createBookstoreDto: CreateBookstoreDto): Promise<Bookstore> {
    const item = this.repo.create(createBookstoreDto);
    return this.repo.save(item);
  }

  async findAll(): Promise<any[]> {
    const booksWithQuantities = await this.repo.find({
      relations: ['availabilities', 'availabilities.book'],
    });

    return booksWithQuantities.map((store) => ({
      id: store.id,
      title: store.title,
      books: store.availabilities.map((availability) => ({
        id: availability.book.id,
        title: availability.book.title,
        author: availability.book.author,
        quantity: availability.quantity,
        price: availability.price,
      })),
    }));
  }

  async findOne(id: number): Promise<Bookstore> {
    const store = await this.repo.findOne({ where: { id } });
    if (!store) {
      throw new NotFoundException('Bookstore not found');
    }
    return store;
  }

  async updateBookQuantity(
    bookstoreId: number,
    bookId: number,
    quantity: number,
  ): Promise<any> {
    const store = await this.repo.findOne({
      where: { id: bookstoreId },
      relations: ['availabilities', 'availabilities.book'],
    });

    if (!store) {
      throw new NotFoundException('Bookstore not found');
    }

    const bookAvailability = store.availabilities.find(
      (availability) => availability.book.id === bookId,
    );

    if (!bookAvailability) {
      throw new NotFoundException('Book not available in this bookstore');
    }

    bookAvailability.quantity += quantity;
    if (bookAvailability.quantity < 0) {
      throw new Error('Quantity cannot be negative');
    }

    return this.repo.save(store);
  }

  async update(
    id: number,
    updateBookstoreDto: UpdateBookstoreDto,
  ): Promise<Bookstore> {
    const store = await this.repo.preload({ id, ...updateBookstoreDto });
    if (!store) {
      throw new NotFoundException('Bookstore not found');
    }
    return this.repo.save(store);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.repo.delete(id);
    if (result.affected) {
      return { message: 'Bookstore successfully deleted.' };
    }
    throw new NotFoundException('Bookstore not found');
  }
}