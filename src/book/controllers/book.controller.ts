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
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('book')
@ApiTags('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new book',
    description: 'Create a new book.',
  })
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  @Public()
  @ApiOperation({
    summary: 'Get all books',
    description: 'Get all books.',
  })
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  @Public()
  @ApiOperation({
    summary: 'Get book by id',
    description: 'Get book by id.',
  })
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
}
