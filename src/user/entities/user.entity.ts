import { Schema, SchemaTypes, Types } from 'mongoose';

export function isEmail(email: string) {
    const regex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
    return regex.test(email);
}

export const userSchema = new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        validate: { validator: isEmail, message: 'Email not valid' },
        unique: true,
    },
    password: { type: String, required: true, minlength: 4 },
    photo: String,
    myDocuments: [{ type: SchemaTypes.ObjectId }],
    myFavs: [{ type: SchemaTypes.ObjectId }],
});

export interface iUser {
    _id?: string;
    name: string;
    email: string;
    password: string;
    photo: string;
    myDocuments: Array<Types.ObjectId>;
    myFavs: Array<Types.ObjectId>;
}
