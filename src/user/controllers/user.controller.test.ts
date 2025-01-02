import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../services/user.service';
import { Role } from 'src/core/enums/role.enum';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('seed', () => {
    it('should return "Seeding is only allowed in development mode" if not in development mode', () => {
      const result = controller.seed();
      expect(result).toBe('Seeding is only allowed in development mode');
    });

    it('should call userService.seed() if in development mode', () => {
      process.env.NODE_ENV = 'dev';
      const seedSpy = jest.spyOn(userService, 'seed');
      controller.seed();
      expect(seedSpy).toHaveBeenCalled();
    });
  });

  describe('getProfile', () => {
    it('should return the user profile', () => {
      const user = { id: 1, name: 'John Doe' };
      const req = { user };
      const result = controller.getProfile(req);
      expect(result).toBe(user);
    });
  });

  describe('create', () => {
    it('should call userService.create() with the provided createUserDto', () => {
      const createUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
        role: Role.User,
      };
      const createSpy = jest.spyOn(userService, 'create');
      controller.create(createUserDto);
      expect(createSpy).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should call userService.findAll()', () => {
      const findAllSpy = jest.spyOn(userService, 'findAll');
      controller.findAll();
      expect(findAllSpy).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call userService.findOne() with the provided id', () => {
      const id = '1';
      const findOneSpy = jest.spyOn(userService, 'findOne');
      controller.findOne(id);
      expect(findOneSpy).toHaveBeenCalledWith(+id);
    });
  });

  describe('update', () => {
    it('should call userService.update() with the provided id and updateUserDto', () => {
      const id = '1';
      const updateUserDto = { name: 'John Doe' };
      const updateSpy = jest.spyOn(userService, 'update');
      controller.update(id, updateUserDto);
      expect(updateSpy).toHaveBeenCalledWith(+id, updateUserDto);
    });
  });

  describe('remove', () => {
    it('should call userService.remove() with the provided id', () => {
      const id = '1';
      const removeSpy = jest.spyOn(userService, 'remove');
      controller.remove(id);
      expect(removeSpy).toHaveBeenCalledWith(+id);
    });
  });
});
