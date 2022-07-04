import { Types } from 'mongoose';

export class CreateDocumentDto {
    title: string;
    content: [
        { text: string; options: { key: string; value: string | number } }
    ];
    keywords: [string];
    author: Types.ObjectId;
    fork?: Types.ObjectId;
    visibility: 'public' | 'private';
}
