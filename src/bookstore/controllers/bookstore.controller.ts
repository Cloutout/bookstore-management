import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BookstoreService } from '../services/bookstore.service';
import { CreateBookstoreDto } from '../DTOs/create-bookstore.dto';
import { UpdateBookQuantityDto } from 'src/bookstore/DTOs/update-book-quantity.dto';
import { Roles } from '../../auth/decorators/roles.decorator';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Role } from '../../auth/enums/role.enum';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('bookstore')
@Controller('bookstore')
export class BookstoreController {
  constructor(private readonly bookstoreService: BookstoreService) {}

  @Post()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new bookstore' })
  create(@Body() createBookstoreDto: CreateBookstoreDto) {
    return this.bookstoreService.create(createBookstoreDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all bookstores' })
  findAll() {
    return this.bookstoreService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a bookstore by ID' })
  findOne(@Param('id') id: number) {
    return this.bookstoreService.findOne(id);
  }

  @Patch(':id/book/:bookId')
  @Roles(Role.Admin, Role.StoreManager)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update book quantity in a bookstore' })
  updateBookQuantity(
    @Param('id') bookstoreId: number,
    @Param('bookId') bookId: number,
    @Body() updateBookQuantityDto: UpdateBookQuantityDto,
  ) {
    return this.bookstoreService.updateBookQuantity(
      bookstoreId,
      bookId,
      updateBookQuantityDto.quantity,
    );
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a bookstore' })
  remove(@Param('id') id: number) {
    return this.bookstoreService.remove(id);
  }
}
