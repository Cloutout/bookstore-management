import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { BookService } from '../services/book.service';
import { CreateBookDto } from '../DTOs/create-book.dto';
import { UpdateBookDto } from '../DTOs/update-book.dto';
import { AssignBookDto } from '../DTOs/assign-book.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@ApiTags('book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new book' })
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all books' })
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a book by ID' })
  findOne(@Param('id') id: number) {
    return this.bookService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a book' })
  update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  @Post('assign')
  @Roles(Role.Admin, Role.StoreManager)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Assign a book to a store' })
  assignBook(@Body() assignBookDto: AssignBookDto) {
    return this.bookService.assignBook(assignBookDto);
  }
}
