import {
    Injectable,
    NotAcceptableException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { LoadDB } from '../helpers/loadDB';
import { AuthService } from '../auth/auth.service';
import { iUser } from '../user/entities/user.entity';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { iDocument } from './entities/document.entity';

@Injectable()
export class DocumentService {
    constructor(
        @InjectModel('Document') private readonly Document: Model<iDocument>,
        @InjectModel('User') private readonly User: Model<iUser>,
        private readonly auth: AuthService,
        private readonly myLoadDB: LoadDB
    ) {}
    async create(createDocumentDto: CreateDocumentDto) {
        const user = await this.User.findById(createDocumentDto.author);
        if (!user) throw new NotFoundException('User not found');
        const newDocument = await this.Document.create(createDocumentDto);
        user.myDocuments.push(newDocument.id);
        user.save();
        return newDocument;
    }

    async fork(idDocument: string, token: string) {
        if (idDocument.length !== 24)
            throw new NotAcceptableException('ID format not valid');
        if (!token) throw new UnauthorizedException('User not identified');
        let decodedToken: string | JwtPayload;
        try {
            decodedToken = this.auth.decodeToken(token.substring(7));
        } catch (e) {
            throw new UnauthorizedException('Token expired');
        }
        if (typeof decodedToken === 'string')
            throw new JsonWebTokenError('Token invalid'); //prueba a ver si Nest gestiona errores de jwt
        const idUser = decodedToken.id as string;
        const baseDocument = await this.Document.findById(idDocument);
        const user = await this.User.findById(idUser);
        if (baseDocument && user) {
            const newDocumentData: CreateDocumentDto = {
                title: baseDocument.title,
                content: baseDocument.content,
                keywords: baseDocument.keywords,
                author: user.id,
                fork: baseDocument.id,
                visibility: 'public',
            };
            const newDocument = await this.Document.create(newDocumentData);
            user.myDocuments.push(newDocument.id);
            user.save();
            return newDocument;
        } else {
            throw new NotFoundException(
                baseDocument ? 'User not found' : 'Document not found'
            );
        }
    }

    async addFav(idDocument: string, token: string) {
        if (idDocument.length !== 24)
            throw new NotAcceptableException('ID format not valid');
        if (!token) throw new UnauthorizedException('User not identified');
        let decodedToken: string | JwtPayload;
        try {
            decodedToken = this.auth.decodeToken(token.substring(7));
        } catch (e) {
            throw new UnauthorizedException('Token expired');
        }
        if (typeof decodedToken === 'string')
            throw new JsonWebTokenError('Token invalid'); //prueba a ver si Nest gestiona errores de jwt
        const idUser = decodedToken.id as string;
        const document = await this.Document.findById(idDocument);
        const user = await this.User.findById(idUser);
        if (document && user) {
            user.myFavs.push(document.id);
            user.save();
            return document;
        } else {
            throw new NotFoundException(
                document ? 'User not found' : 'Document not found'
            );
        }
    }

    async loadDB() {
        return await this.myLoadDB.load(false); //secure to prevent accidental loads
    }

    async findAll() {
        return await this.Document.find().populate('author', { name: 1 });
    }

    async search(query: string, offset: number, limit: number) {
        if (query.length < 3) return;
        return await this.Document.find({
            keywords: { $regex: query, $options: 'i' },
        })
            .populate('author', { name: 1 })
            .limit(limit)
            .skip(offset);
    }

    async findOne(id: string) {
        if (id.length !== 24)
            throw new NotAcceptableException('ID format not valid');
        return await this.Document.findById(id).populate('author', { name: 1 });
    }

    async update(id: string, updateDocumentDto: UpdateDocumentDto) {
        if (id.length !== 24)
            throw new NotAcceptableException('ID format not valid');
        return await this.Document.findByIdAndUpdate(id, updateDocumentDto, {
            new: true,
        });
    }

    async remove(id: string) {
        if (id.length !== 24)
            throw new NotAcceptableException('ID format not valid');
        const documentToDelete = await this.Document.findById(id);
        const updatedUser = await this.User.findByIdAndUpdate(
            documentToDelete.author,
            {
                $pull: { myDocuments: documentToDelete.id },
            }
        );
        const deletedDocument = await documentToDelete.delete();
        if (!updatedUser)
            throw new NotFoundException('User not found, document deleted');
        return deletedDocument;
    }
}
