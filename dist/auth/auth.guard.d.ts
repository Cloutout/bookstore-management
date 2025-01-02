import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
declare module 'express-serve-static-core' {
    interface Request {
        user?: any;
    }
}
export declare class AuthGuard implements CanActivate {
    private readonly jwtService;
    private readonly reflector;
    constructor(jwtService: JwtService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
