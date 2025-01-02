"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const common_1 = require("@nestjs/common");
const book_service_1 = require("../services/book.service");
const create_book_dto_1 = require("../DTOs/create-book.dto");
const update_book_dto_1 = require("../DTOs/update-book.dto");
const assign_book_dto_1 = require("../DTOs/assign-book.dto");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const role_enum_1 = require("../../auth/enums/role.enum");
let BookController = class BookController {
    constructor(bookService) {
        this.bookService = bookService;
    }
    create(createBookDto) {
        return this.bookService.create(createBookDto);
    }
    findAll() {
        return this.bookService.findAll();
    }
    findOne(id) {
        return this.bookService.findOne(id);
    }
    update(id, updateBookDto) {
        return this.bookService.update(id, updateBookDto);
    }
    assignBook(assignBookDto) {
        return this.bookService.assignBook(assignBookDto);
    }
};
exports.BookController = BookController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new book' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_book_dto_1.CreateBookDto]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all books' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BookController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a book by ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update a book' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_book_dto_1.UpdateBookDto]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('assign'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.StoreManager),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Assign a book to a store' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [assign_book_dto_1.AssignBookDto]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "assignBook", null);
exports.BookController = BookController = __decorate([
    (0, swagger_1.ApiTags)('book'),
    (0, common_1.Controller)('book'),
    __metadata("design:paramtypes", [book_service_1.BookService])
], BookController);
//# sourceMappingURL=book.controller.js.map