import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';
import { iDocument } from 'src/document/entities/document.entity';
import { iUser } from 'src/user/entities/user.entity';

@Injectable()
export class LoadBD {
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
    myDocsIds: Array<string> = [
        '62d28fa19d32ba57528b8ca2',
        '62d28fa19d32ba57528b8ca5',
        '62d28fa19d32ba57528b8ca8',
        '62d28fa19d32ba57528b8cab',
        '62d28fa19d32ba57528b8cae',
        '62d28fa19d32ba57528b8cb1',
        '62d28fa19d32ba57528b8cb4',
        '62d28fa19d32ba57528b8cb7',
        '62d28fa19d32ba57528b8cba',
        '62d28fa19d32ba57528b8cbd',
        '62d28fa19d32ba57528b8cc0',
        '62d28fa19d32ba57528b8cc3',
        '62d28fa19d32ba57528b8cc6',
        '62d28fa19d32ba57528b8cc9',
        '62d28fa19d32ba57528b8ccc',
        '62d28fa19d32ba57528b8ccf',
        '62d28fa19d32ba57528b8cd2',
        '62d28fa19d32ba57528b8cd5',
        '62d28fa19d32ba57528b8cd8',
        '62d28fa19d32ba57528b8cdb',
        '62d28fa19d32ba57528b8cde',
        '62d28fa19d32ba57528b8ce1',
        '62d28fa19d32ba57528b8ce4',
        '62d28fa19d32ba57528b8ce7',
        '62d28fa19d32ba57528b8cea',
        '62d28fa19d32ba57528b8ced',
        '62d28fa19d32ba57528b8cf0',
        '62d28fa19d32ba57528b8cf3',
        '62d28fa19d32ba57528b8cf6',
        '62d28fa19d32ba57528b8cf9',
        '62d28fa19d32ba57528b8cfc',
        '62d28fa19d32ba57528b8cff',
        '62d28fa19d32ba57528b8d02',
        '62d28fa19d32ba57528b8d05',
        '62d28fa19d32ba57528b8d08',
        '62d28fa19d32ba57528b8d0b',
        '62d28fa19d32ba57528b8d0e',
        '62d28fa19d32ba57528b8d11',
        '62d28fa19d32ba57528b8d14',
        '62d28fa19d32ba57528b8d17',
    ];
    myInsertedDocs: Array<Document>;

    constructor(
        @InjectModel('Document') private readonly Document: Model<iDocument>,
        @InjectModel('User') private readonly User: Model<iUser>
    ) {}

    async load() {
        const secure = false;
        //secure = true; //prevent accidental masive loads
        if (secure) {
            await this.Document.insertMany(this.myDocs).then(async (resp) => {
                await this.User.findByIdAndUpdate(this.myUserId, {
                    myDocuments: resp.map((doc) => doc._id),
                });
            });
        }
    }
}
