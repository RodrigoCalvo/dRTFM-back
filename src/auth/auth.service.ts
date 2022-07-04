import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  createToken(id: string) {
    return sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  }
  decodeToken(token: string) {
    return verify(token, process.env.JWT_SECRET);
  }
}
