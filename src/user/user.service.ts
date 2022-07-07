import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtPayload } from 'jsonwebtoken';
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
        try {
            const newUser = await this.User.create({
                ...createUserDto,
                password: this.bcrypt.encrypt(createUserDto.password),
            });
            const token = this.auth.createToken(newUser.id);
            return { user: newUser, token };
        } catch (e) {
            throw new BadRequestException('Validation error');
        }
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
        let decodedToken: string | JwtPayload;
        try {
            decodedToken = this.auth.decodeToken(token.substring(7));
        } catch (e) {
            throw new UnauthorizedException('Session expired');
        }
        if (typeof decodedToken === 'string') {
            throw new UnauthorizedException('Token error, not valid');
        } else {
            const user = await this.User.findById(decodedToken.id);
            if (!user) throw new NotFoundException('User not found');
            //refrescamos token
            const newToken = this.auth.createToken(user.id);
            return { user, token: newToken };
        }
    }

    async findAll() {
        return await this.User.find();
    }

    async findOne(id: string) {
        return await this.User.findById(id);
    }

    async update(token: string, updateUserDto: UpdateUserDto) {
        if (!token) throw new UnauthorizedException("Token doesn't exist");
        let decodedToken: string | JwtPayload;
        try {
            decodedToken = this.auth.decodeToken(token.substring(7));
        } catch (e) {
            throw new UnauthorizedException('Session expired');
        }
        if (typeof decodedToken === 'string') {
            throw new UnauthorizedException('Token error, not valid');
        }
        if (updateUserDto.password) {
            updateUserDto.password = this.bcrypt.encrypt(
                updateUserDto.password
            );
        }
        return await this.User.findByIdAndUpdate(
            decodedToken.id,
            updateUserDto,
            {
                new: true,
            }
        );
    }

    async remove(id: string) {
        return await this.User.findByIdAndDelete(id);
    }

    async removeSelf(token: string) {
        if (!token) throw new UnauthorizedException("Token doesn't exist");
        let decodedToken: string | JwtPayload;
        try {
            decodedToken = this.auth.decodeToken(token.substring(7));
        } catch (e) {
            throw new UnauthorizedException('Session expired');
        }
        if (typeof decodedToken === 'string') {
            throw new UnauthorizedException('Token error, not valid');
        }
        const user = await this.User.findById(decodedToken.id);
        if (!user) throw new NotFoundException('User not found');
        user.delete();
        return { deleted: true };
    }
}
