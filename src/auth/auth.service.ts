import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class AuthService {
    createToken(id: string) {
        return sign({ id }, process.env.SECRET, { expiresIn: '48h' });
    }
    decodeToken(token: string) {
        return verify(token, process.env.SECRET);
    }
}
