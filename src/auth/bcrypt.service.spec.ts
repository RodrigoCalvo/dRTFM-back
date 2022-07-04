import { Test, TestingModule } from '@nestjs/testing';
import { BcryptService } from './bcrypt.service';
import bcryptjs from 'bcryptjs';

jest.mock('bcryptjs');

describe('BcryptService', () => {
    let service: BcryptService;
    const mockEncrypt = jest.fn();
    const mockCompare = jest.fn();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BcryptService],
        }).compile();

        service = module.get<BcryptService>(BcryptService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('When service.encrypt method is called', () => {
        test.todo(
            'Then bcryptjs.hashSync should be called' //, () => {
            //   bcryptjs.hashSync = mockEncrypt;
            //   service.encrypt('');
            //   expect(mockEncrypt).toHaveBeenCalled();
            // }
        );
    });
    describe('When service.compare method is called', () => {
        test.todo(
            'Then bcryptjs.hashSync should be called' //, () => {
            //   bcryptjs.compareSync = mockCompare;
            //   service.compare('', '');
            //   expect(mockCompare).toHaveBeenCalled();
            // }
        );
    });
});
