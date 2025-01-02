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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Availability = void 0;
const typeorm_1 = require("typeorm");
const book_entity_1 = require("./book.entity");
const bookstore_entity_1 = require("../../bookstore/entities/bookstore.entity");
let Availability = class Availability {
};
exports.Availability = Availability;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Availability.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Availability.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Availability.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => book_entity_1.Book, (book) => book.availabilities),
    (0, typeorm_1.JoinColumn)({ name: 'bookId' }),
    __metadata("design:type", book_entity_1.Book)
], Availability.prototype, "book", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => bookstore_entity_1.Bookstore, (bookstore) => bookstore.availabilities),
    (0, typeorm_1.JoinColumn)({ name: 'bookstoreId' }),
    __metadata("design:type", bookstore_entity_1.Bookstore)
], Availability.prototype, "bookstore", void 0);
exports.Availability = Availability = __decorate([
    (0, typeorm_1.Entity)()
], Availability);
//# sourceMappingURL=availability.entity.js.map