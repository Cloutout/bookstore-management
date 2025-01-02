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
exports.BookstoreController = void 0;
const common_1 = require("@nestjs/common");
const bookstore_service_1 = require("../services/bookstore.service");
const create_bookstore_dto_1 = require("../DTOs/create-bookstore.dto");
const update_bookstore_dto_1 = require("../DTOs/update-bookstore.dto");
const public_decorator_1 = require("../../auth/decorators/public.decorator");
const swagger_1 = require("@nestjs/swagger");
let BookstoreController = class BookstoreController {
    constructor(bookstoreService) {
        this.bookstoreService = bookstoreService;
    }
    create(createBookstoreDto) {
        return this.bookstoreService.create(createBookstoreDto);
    }
    findAll() {
        return this.bookstoreService.findAll();
    }
    findOne(id) {
        return this.bookstoreService.find(+id);
    }
    update(id, updateBookstoreDto) {
        return this.bookstoreService.update(+id, updateBookstoreDto);
    }
    remove(id) {
        return this.bookstoreService.remove(+id);
    }
};
exports.BookstoreController = BookstoreController;
__decorate([
    (0, swagger_1.ApiTags)('bookstore'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new bookstore',
        description: 'Create a new bookstore.',
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bookstore_dto_1.CreateBookstoreDto]),
    __metadata("design:returntype", void 0)
], BookstoreController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiTags)('bookstore'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all bookstores',
        description: 'Retrieve a list of all bookstores.',
    }),
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BookstoreController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get a bookstore by ID',
        description: 'Retrieve a bookstore by ID.',
    }),
    (0, swagger_1.ApiTags)('bookstore'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BookstoreController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiExcludeEndpoint)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_bookstore_dto_1.UpdateBookstoreDto]),
    __metadata("design:returntype", void 0)
], BookstoreController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiExcludeEndpoint)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BookstoreController.prototype, "remove", null);
exports.BookstoreController = BookstoreController = __decorate([
    (0, common_1.Controller)('bookstore'),
    __metadata("design:paramtypes", [bookstore_service_1.BookstoreService])
], BookstoreController);
//# sourceMappingURL=bookstore.controller.js.map