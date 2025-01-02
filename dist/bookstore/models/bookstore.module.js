"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookstoreModule = void 0;
const common_1 = require("@nestjs/common");
const bookstore_service_1 = require("../service/bookstore.service");
const bookstore_controller_1 = require("../controllers/bookstore.controller");
const typeorm_1 = require("@nestjs/typeorm");
const book_entity_1 = require("../../book/entities/book.entity");
const bookstore_entity_1 = require("../entities/bookstore.entity");
let BookstoreModule = class BookstoreModule {
};
exports.BookstoreModule = BookstoreModule;
exports.BookstoreModule = BookstoreModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([book_entity_1.Book, bookstore_entity_1.Bookstore])],
        controllers: [bookstore_controller_1.BookstoreController],
        providers: [bookstore_service_1.BookstoreService],
    })
], BookstoreModule);
//# sourceMappingURL=bookstore.module.js.map