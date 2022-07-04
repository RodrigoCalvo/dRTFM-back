import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import jwt from 'jsonwebtoken';

const mockSign = jest.fn();
const mockVerify = jest.fn();

describe('AuthService', () => {
    let service: AuthService;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('When calling createToken method', () => {
        test.todo(
            'Then jwt.sign should be called' //, () => {
            //   jwt.sign = mockSign;
            //   service.createToken('');
            //   expect(mockSign).toHaveBeenCalled();
            // }
        );
    });
    describe('When calling decodeToken method', () => {
        test.todo(
            'Then jwt.sign should be called' //, () => {
            //   jwt.verify = mockVerify;
            //   service.decodeToken('');
            //   expect(mockVerify).toHaveBeenCalled();
            // }
        );
    });
});

