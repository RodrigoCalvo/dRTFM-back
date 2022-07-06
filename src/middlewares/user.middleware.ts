import {
    Injectable,
    NestMiddleware,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';
import { iDocument } from 'src/document/entities/document.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
    constructor(
        @InjectModel('Document') private readonly Document: Model<iDocument>,
        private readonly auth: AuthService
    ) {}
    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.get('Authorization');
        if (!token) throw new UnauthorizedException("Token doesn't exist");
        const decodedToken = this.auth.decodeToken(token.substring(7));
        const documentId = req.params.id as string;
        if (typeof decodedToken === 'string') {
            throw new UnauthorizedException('Token invalid');
        } else {
            const userId = decodedToken.id as string;
            const findDocument = await this.Document.findById(documentId);
            if (!findDocument) {
                throw new NotFoundException('Document not found');
            }
            if (findDocument.author.toString() === userId) {
                next();
            } else {
                throw new UnauthorizedException('User not authorized');
            }
        }
    }
}
