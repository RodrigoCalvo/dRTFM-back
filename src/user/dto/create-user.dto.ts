import { Types } from 'mongoose';

export class CreateUserDto {
    name: string;
    email: string;
    password: string;
    myDocuments: Array<Types.ObjectId>;
    myFavs: Array<Types.ObjectId>;
}

