import { Schema, SchemaTypes, Types } from 'mongoose';

export const documentSchema = new Schema({
    title: { type: String, required: true },
    content: [
        {
            text: String,
            options: {},
        },
    ],
    keywords: [String],
    author: { type: SchemaTypes.ObjectId, ref: 'User' },
    fork: [{ type: SchemaTypes.ObjectId, ref: 'Document' }],
    visibility: { type: String, enum: ['public', 'private'] },
});

export interface iDocument {
    _id?: string;
    title: string;
    content: [
        { text: string; options: { key: string; value: string | number } }
    ];
    keywords: [string];
    author: Types.ObjectId;
    fork: Types.ObjectId;
    visibility: 'public' | 'private';
}
