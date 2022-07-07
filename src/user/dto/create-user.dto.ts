import { Types } from 'mongoose';

export class CreateUserDto {
    name: string;
    email: string;
    password: string;
    photo: string;
    myDocuments: Array<Types.ObjectId>;
    myFavs: Array<Types.ObjectId>;
    role?: 'user' | 'admin';
}
