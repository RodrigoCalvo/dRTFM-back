import { Schema, SchemaTypes, Types } from 'mongoose';

function isEmail(email: string) {
    const regex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
    return regex.test(email);
}

export const userSchema = new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        validate: [isEmail, 'Email not valid'],
    },
    password: { type: String, required: true, minlength: 4 },
    myDocuments: [{ type: SchemaTypes.ObjectId }],
    myFavs: [{ type: SchemaTypes.ObjectId }],
});

export interface iUser {
    _id?: string;
    name: string;
    email: string;
    password: string;
    myDocuments: Array<Types.ObjectId>;
    myFavs: Array<Types.ObjectId>;
}
