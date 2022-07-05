import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import { BcryptService } from '../auth/bcrypt.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
    let controller: UserController;
    let service: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: {
                        create: jest.fn(),
                        login: jest.fn(),
                        loginWithToken: jest.fn(),
                    },
                },
                AuthService,
                BcryptService,
            ],
        }).compile();

        controller = module.get<UserController>(UserController);
        service = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('When calling controller.create', () => {
        test('Then service.create should be called', () => {
            controller.create({
                name: 'test',
                email: 'test',
                password: 'test',
                photo: 'test',
                myDocuments: [],
                myFavs: [],
            });
            expect(service.create).toHaveBeenCalled();
        });
    });

    describe('When calling controller.login without token', () => {
        test('Then service.login should be called', () => {
            controller.login(
                {
                    email: '',
                    password: '',
                },
                undefined
            );
            expect(service.login).toHaveBeenCalled();
        });
    });

    describe('When calling controller.login with token', () => {
        test('Then service.loginWithToken should be called', () => {
            controller.login(
                {
                    email: '',
                    password: '',
                },
                'token'
            );
            expect(service.loginWithToken).toHaveBeenCalled();
        });
    });
});
