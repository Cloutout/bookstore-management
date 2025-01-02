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
exports.AssignBookDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class AssignBookDto {
}
exports.AssignBookDto = AssignBookDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The id of the book',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], AssignBookDto.prototype, "book_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The id of store',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], AssignBookDto.prototype, "store_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The quantity of the book',
        default: 1,
    }),
    __metadata("design:type", Number)
], AssignBookDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The price of the book',
        default: 0,
    }),
    __metadata("design:type", Number)
], AssignBookDto.prototype, "price", void 0);
//# sourceMappingURL=assign-book.dto.js.map