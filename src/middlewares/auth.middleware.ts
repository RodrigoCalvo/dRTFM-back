import {
    Injectable,
    NestMiddleware,
    UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly auth: AuthService) {}
    use(req: Request, res: Response, next: NextFunction) {
        const token = req.get('Authorization');
        if (!token) throw new UnauthorizedException("Token doesn't exist");
        let decodedToken: string | JwtPayload;
        try {
            decodedToken = this.auth.decodeToken(token.substring(7));
        } catch (e) {
            throw new UnauthorizedException('Token expired');
        }
        if (typeof decodedToken === 'string')
            throw new UnauthorizedException('Token invalid');
        next();
    }
}
