/* eslint-disable @typescript-eslint/no-unused-vars */
import { BcryptService } from './bcrypt.service';
import { hashSync, compareSync } from 'bcryptjs';

jest.mock('bcryptjs');
const mockEncrypt = jest.fn();
const mockCompare = jest.fn();
(hashSync as jest.Mock) = mockEncrypt;
(compareSync as jest.Mock) = mockCompare;

describe('BcryptService', () => {
    describe('When service.encrypt method is called', () => {
        test('Then bcryptjs.hashSync should be called', () => {
            BcryptService.prototype.encrypt('');
            expect(mockEncrypt).toHaveBeenCalled();
        });
    });
    describe('When service.compare method is called', () => {
        test('Then bcryptjs.hashSync should be called', () => {
            BcryptService.prototype.compare('', '');
            expect(mockCompare).toHaveBeenCalled();
        });
    });
});
