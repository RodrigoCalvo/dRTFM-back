import {
    Injectable,
    NestMiddleware,
    UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly auth: AuthService) {}
    use(req: Request, res: Response, next: NextFunction) {
        const token = req.get('Authorization').substring(7); //token -bearer
        const decodedToken = this.auth.decodeToken(token);
        if (typeof decodedToken === 'string')
            throw new UnauthorizedException('Token expired');
        next();
    }
}

