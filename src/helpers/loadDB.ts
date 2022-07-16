import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';
import { iDocument } from '../document/entities/document.entity';
import { iUser } from '../user/entities/user.entity';

@Injectable()
export class LoadDB {
    myUserId = '62d2898355d0c18e984261f2';
    myContent: Array<{ title: string; text: string; keywords: Array<string> }> =
        [
            {
                title: '',
                text: '',
                keywords: [''],
            },
        ];
    myDocs: Array<iDocument> = [
        {
            title: 'Documento 1',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test1'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 2',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test1'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 3',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test1'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 4',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test1'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 5',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test1'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 6',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test1'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 7',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test1'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 8',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test1'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 9',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test1'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 10',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test1'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 11',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test1'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 12',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test1'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 13',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test1'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 14',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test1'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 15',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test1'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 16',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test1'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 17',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test1'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 18',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test1'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 19',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test1'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 20',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test1'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 21',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test2'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 22',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test2'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 23',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test2'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 24',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test2'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 25',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test2'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 26',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test2'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 27',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test2'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 28',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test2'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 29',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test2'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 30',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test2'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 31',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test2'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 32',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test2'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 33',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test2'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 34',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test2'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 35',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test2'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 36',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test2'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 37',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test2'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 38',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test2'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 39',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test2'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
        {
            title: 'Documento 40',
            content: [
                {
                    text: 'Esto es un texto de prueba',
                    options: [{ key: '', value: '' }],
                },
            ],
            keywords: ['test2'],
            author: new Types.ObjectId(this.myUserId),
            visibility: 'public',
        },
    ];
    myInsertedDocs: Array<Document>;

    constructor(
        @InjectModel('Document') private readonly Document: Model<iDocument>,
        @InjectModel('User') private readonly User: Model<iUser>
    ) {}

    async load(secure: boolean): Promise<boolean> {
        if (secure) {
            await this.Document.insertMany(this.myDocs).then(async (resp) => {
                await this.User.findByIdAndUpdate(this.myUserId, {
                    myDocuments: resp.map((doc) => doc._id),
                });
            });
        }
        return secure;
    }
}
