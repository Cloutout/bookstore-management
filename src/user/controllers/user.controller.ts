import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../DTOs/create-user.dto';
import { UpdateUserDto } from '../DTOs/update-user.dto';
import { Roles } from '../../auth/decorators/roles.decorator';
import { AuthGuard } from '../../auth/guards/auth.guard'; // AuthGuard kullanımı
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '../../auth/enums/role.enum';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Roles(Role.User, Role.Admin, Role.StoreManager)
  @UseGuards(AuthGuard, RolesGuard) // JwtAuthGuard yerine AuthGuard kullanımı
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile' })
  getProfile(@Request() req) {
    return req.user;
  }

  @Post()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new user' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  findAll() {
    return this.userService.findAll();
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user' })
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a user' })
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
