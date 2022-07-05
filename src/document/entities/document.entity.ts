import { Schema, SchemaTypes, Types } from 'mongoose';

export const documentSchema = new Schema({
    title: { type: String, required: true },
    content: [
        {
            text: String,
            // eslint-disable-next-line @typescript-eslint/ban-types
            options: [{ key: String, value: SchemaTypes.Mixed }],
        },
    ],
    keywords: [String],
    author: { type: SchemaTypes.ObjectId, ref: 'User' },
    fork: { type: SchemaTypes.ObjectId, ref: 'Document' },
    visibility: { type: String, enum: ['public', 'private'] },
});

// documentSchema.index()

export interface iDocument {
    _id?: string;
    title: string;
    content: [
        {
            text: string;
            options: Array<{ key: string; value: string | number }>;
        }
    ];
    keywords: [string];
    author: Types.ObjectId;
    fork?: Types.ObjectId;
    visibility: 'public' | 'private';
}
