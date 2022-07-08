/* istanbul ignore file */
import { Schema, SchemaTypes, Types } from 'mongoose';
import { isEmail } from '../../helpers/isEmail';

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
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

export interface iUser {
    _id?: string;
    name: string;
    email: string;
    password: string;
    photo: string;
    myDocuments: Array<Types.ObjectId>;
    myFavs: Array<Types.ObjectId>;
    role: 'user' | 'admin';
}

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;
        delete returnedObject.password;
        delete returnedObject.role;
    },
});
