import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { BcryptService } from '../auth/bcrypt.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { iUser } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly User: Model<iUser>,
        private readonly auth: AuthService,
        private readonly bcrypt: BcryptService
    ) {}
    async create(createUserDto: CreateUserDto) {
        const newUser = await this.User.create({
            ...createUserDto,
            password: this.bcrypt.encrypt(createUserDto.password),
        });
        const token = this.auth.createToken(newUser.id);
        return { user: newUser, token };
    }

    async login(loginData: { email: string; password: string }) {
        const findUser = await this.User.findOne({
            email: loginData.email,
        });
        if (!findUser) throw new NotFoundException('User does not exist');
        if (!this.bcrypt.compare(loginData.password, findUser.password))
            throw new UnauthorizedException('Login data incorrect');
        const token = this.auth.createToken(findUser.id);
        return { user: findUser, token };
    }

    async loginWithToken(token: string) {
        try {
            const decodedToken = this.auth.decodeToken(token);
            if (typeof decodedToken === 'string') {
                throw new UnauthorizedException('Token error, not valid');
            } else {
                const user = await this.User.findById(decodedToken.id);
                if (!user) throw new NotFoundException('User not found');
                //refrescamos token
                const newToken = this.auth.createToken(user.id);
                return { user, newToken };
            }
        } catch (e) {
            throw new UnauthorizedException('Token expired');
        }
    }

    async findAll() {
        return await this.User.find();
    }

    async findOne(id: string) {
        return await this.User.findById(id);
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        return await this.User.findByIdAndUpdate(id, updateUserDto, {
            new: true,
        });
    }

    async remove(id: string) {
        return await this.User.findByIdAndDelete(id);
    }
}
