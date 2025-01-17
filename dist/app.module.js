"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/modules/user.module");
const book_module_1 = require("./book/modules/book.module");
const bookstore_module_1 = require("./bookstore/modules/bookstore.module");
const user_entity_1 = require("./user/entities/user.entity");
const book_entity_1 = require("./book/entities/book.entity");
const bookstore_entity_1 = require("./bookstore/entities/bookstore.entity");
const availability_entity_1 = require("./book/entities/availability.entity");
const auth_module_1 = require("./auth/modules/auth.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT),
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                entities: [user_entity_1.User, book_entity_1.Book, bookstore_entity_1.Bookstore, availability_entity_1.Availability],
                synchronize: true,
                logging: true,
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            book_module_1.BookModule,
            bookstore_module_1.BookstoreModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map