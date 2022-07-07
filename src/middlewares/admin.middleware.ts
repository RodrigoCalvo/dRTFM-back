import {
    Injectable,
    NestMiddleware,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { iUser } from 'src/user/entities/user.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
    constructor(
        @InjectModel('User') private readonly User: Model<iUser>,
        private readonly auth: AuthService
    ) {}
    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.get('Authorization');
        if (!token) throw new UnauthorizedException("Token doesn't exist");
        let decodedToken: string | JwtPayload;
        try {
            decodedToken = this.auth.decodeToken(token.substring(7));
        } catch (e) {
            throw new UnauthorizedException('Token expired');
        }
        if (typeof decodedToken === 'string') {
            throw new UnauthorizedException('Token invalid');
        }
        const userId = decodedToken.id as string;
        const user = await this.User.findById(userId);
        if (user.role === 'user')
            throw new UnauthorizedException('You are not an admin');
        next();
    }
}
