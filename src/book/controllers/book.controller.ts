import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookService } from '../services/book.service';
import { CreateBookDto } from '../DTOs/create-book.dto';
import { UpdateBookDto } from '../DTOs/update-book.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AssignBookDto } from '../DTOs/assign-book.dto';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiBearerAuth()
  @ApiTags('book')
  @ApiOperation({
    summary: 'Create a new book',
    description: 'Create a new book.',
  })
  async create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  @Public()
  @ApiTags('book')
  @ApiOperation({
    summary: 'Get all books',
    description: 'Retrieve a list of all books.',
  })
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  @Public()
  @ApiTags('book')
  @ApiOperation({
    summary: 'Get a book by ID',
    description: 'Retrieve a book by ID.',
  })
  @ApiTags('book')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @ApiExcludeEndpoint()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @ApiExcludeEndpoint()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }

  @ApiTags('book')
  @Roles(Role.Admin, Role.StoreManager)
  @ApiOperation({
    summary: 'Assign a book to a store',
    description: 'Assign a book to a store.',
  })
  @Post('assign')
  async assignBook(@Body() assignBookDto: AssignBookDto) {
    return this.bookService.assignBook(assignBookDto);
  }
}
