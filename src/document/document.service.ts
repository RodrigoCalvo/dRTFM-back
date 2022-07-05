import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { iUser } from 'src/user/entities/user.entity';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { iDocument } from './entities/document.entity';

@Injectable()
export class DocumentService {
    constructor(
        @InjectModel('Document') private readonly Document: Model<iDocument>,
        @InjectModel('User') private readonly User: Model<iUser>
    ) {}
    async create(createDocumentDto: CreateDocumentDto) {
        const user = await this.User.findById(createDocumentDto.author);
        if (!user) throw new NotFoundException('User not found');
        const newDocument = await this.Document.create(createDocumentDto);
        user.myDocuments.push(newDocument.id);
        user.save();
        return newDocument;
    }

    async fork(idDocument: string, idUser: string) {
        const baseDocument = await this.Document.findById(idDocument);
        const user = await this.User.findById(idUser);
        if (baseDocument && user) {
            const newDocumentData: CreateDocumentDto = {
                title: baseDocument.title,
                content: baseDocument.content,
                keywords: baseDocument.keywords,
                author: user.id,
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

    async findAll() {
        return await this.Document.find().populate('author', { name: 1 });
    }

    async search(query: string) {
        if (query.length < 3) return;
        return await this.Document.find({
            keywords: { $regex: query, $options: 'i' },
        });
    }

    async findOne(id: string) {
        return await this.Document.findById(id).populate('author', { name: 1 });
    }

    async update(id: string, updateDocumentDto: UpdateDocumentDto) {
        return await this.Document.findByIdAndUpdate(id, updateDocumentDto, {
            new: true,
        });
    }

    async remove(id: string) {
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
