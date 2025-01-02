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
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_model_1 = require("./user/modules/user.model");
const user_entity_1 = require("./user/entities/user.entity");
const core_1 = require("@nestjs/core");
const auth_guard_1 = require("./auth/auth.guard");
const bookstore_module_1 = require("./bookstore/models/bookstore.module");
const book_module_1 = require("./book/modules/book.module");
const book_entity_1 = require("./book/entities/book.entity");
const bookstore_entity_1 = require("./bookstore/entities/bookstore.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT),
                password: process.env.DB_PASSWORD,
                username: process.env.DB_USER,
                entities: [user_entity_1.User, bookstore_entity_1.Bookstore, book_entity_1.Book],
                database: process.env.DB_NAME,
                synchronize: true,
                logging: true,
            }),
            user_model_1.UserModule,
            bookstore_module_1.BookstoreModule,
            book_module_1.BookModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map