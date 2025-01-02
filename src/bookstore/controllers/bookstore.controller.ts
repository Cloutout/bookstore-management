import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookstoreService } from '../service/bookstore.service';
import { CreateBookstoreDto } from '../dto/create-bookstore.dto';
import { UpdateBookstoreDto } from '../dto/update-bookstore.dto';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { quantityOfBookstore } from 'src/bookstore/dto/quantity-of-bookstore';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('bookstore')
@ApiTags('bookstore')
export class BookstoreController {
  constructor(private readonly bookstoreService: BookstoreService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new bookstore',
    description: 'Create a new bookstore.',
  })
  create(@Body() createBookstoreDto: CreateBookstoreDto) {
    return this.bookstoreService.create(createBookstoreDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all bookstores',
    description: 'Get all bookstores.',
  })
  @Public()
  findAll() {
    return this.bookstoreService.findAll();
  }

  @Get(':id')
  @Public()
  @ApiOperation({
    summary: 'Get bookstore by id',
    description: 'Get bookstore by id.',
  })
  findOne(@Param('id') id: string) {
    return this.bookstoreService.findOne(+id);
  }

  @Patch(':id')
  @ApiExcludeEndpoint()
  update(
    @Param('id') id: string,
    @Body() updateBookstoreDto: UpdateBookstoreDto,
  ) {
    return this.bookstoreService.update(+id, updateBookstoreDto);
  }

  @Delete(':id')
  @ApiExcludeEndpoint()
  remove(@Param('id') id: string) {
    return this.bookstoreService.remove(+id);
  }

  @Get('getAvailable/:bookId')
  @Roles(Role.User)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get bookstore by book id',
    description: 'Get bookstore by book id.',
  })
  getBookstoreByBookId(@Param('bookId') bookId: string) {
    return this.bookstoreService.getBookstoreByBookId(+bookId);
  }

  @Delete(':bookstoreId/:bookId/:quantity')
  @Roles(Role.Admin, Role.Manager)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Remove bookstore by book id',
    description: 'Remove bookstore by book id.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  removeBookstoreByBookId(
    @Param('bookId') bookId: string,
    @Param('bookstoreId') bookstoreId: string,
    @Param('quantity') quantity: string,
  ) {
    return this.bookstoreService.removeBookFromBookstore(
      +bookId,
      +bookstoreId,
      +quantity,
    );
  }

  @Post('AddBook')
  @Roles(Role.Admin, Role.Manager)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Add bookstore by book id',
    description: 'Add bookstore by book id.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  addBookstoreByBookId(@Body() addBookToBookStore: quantityOfBookstore) {
    return this.bookstoreService.addBookToBookstore(
      +addBookToBookStore.id,
      +addBookToBookStore.bookstoreId,
      +addBookToBookStore.quantity,
    );
  }
}
