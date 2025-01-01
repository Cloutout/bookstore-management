import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { BookstoresService } from './bookstores.service';
import { CreateBookstoreDto } from './dtos/create-bookstore.dto';
import { UpdateBookstoreDto } from './dtos/update-bookstore.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../auth/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('bookstores')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BookstoresController {
  constructor(private readonly bookstoresService: BookstoresService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createBookstoreDto: CreateBookstoreDto) {
    return this.bookstoresService.create(createBookstoreDto);
  }

  @Get()
  findAll() {
    return this.bookstoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookstoresService.findOne(+id);
  }

  @Put(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateBookstoreDto: UpdateBookstoreDto) {
    return this.bookstoresService.update(+id, updateBookstoreDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.bookstoresService.remove(+id);
  }

  // Kitap ekleme ve çıkarma endpoint'leri
  @Post(':storeId/books/:bookId')
  @Roles(Role.Admin, Role.StoreManager)
  addBook(
    @Param('storeId') storeId: string,
    @Param('bookId') bookId: string,
    @Body('quantity') quantity: number,
  ) {
    return this.bookstoresService.addBookToStore(+storeId, +bookId, quantity);
  }

  @Delete(':storeId/books/:bookId')
  @Roles(Role.Admin, Role.StoreManager)
  removeBook(
    @Param('storeId') storeId: string,
    @Param('bookId') bookId: string,
    @Body('quantity') quantity: number,
  ) {
    return this.bookstoresService.removeBookFromStore(+storeId, +bookId, quantity);
  }
}
