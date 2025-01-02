"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBookstoreDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_bookstore_dto_1 = require("./create-bookstore.dto");
class UpdateBookstoreDto extends (0, swagger_1.PartialType)(create_bookstore_dto_1.CreateBookstoreDto) {
}
exports.UpdateBookstoreDto = UpdateBookstoreDto;
//# sourceMappingURL=update-bookstore.dto.js.map