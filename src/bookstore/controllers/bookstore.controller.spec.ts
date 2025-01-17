import { Test, TestingModule } from '@nestjs/testing';
import { BookstoreController } from './bookstore.controller';
import { BookstoreService } from '../services/bookstore.service';

describe('BookstoreController', () => {
  let controller: BookstoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookstoreController],
      providers: [BookstoreService],
    }).compile();

    controller = module.get<BookstoreController>(BookstoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
