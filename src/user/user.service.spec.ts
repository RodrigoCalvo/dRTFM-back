import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { documentSchema } from '../document/entities/document.entity';
import { AuthService } from '../auth/auth.service';
import { BcryptService } from '../auth/bcrypt.service';
import { userSchema } from './entities/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
    const mockUser = {
        name: 'test',
        email: 'test@test.test',
        password: 'password',
        photo: '',
        myDocuments: [],
        myFavs: [],
    };

    const mockUserModel = {
        create: jest.fn().mockResolvedValue(mockUser),
        find: jest.fn().mockResolvedValue(mockUser),
        findOne: jest.fn().mockResolvedValue(mockUser),
        findById: jest.fn().mockResolvedValue(mockUser),
        findByIdAndUpdate: jest
            .fn()
            .mockResolvedValue({ ...mockUser, name: 'updated' }),
        findByIdAndDelete: jest.fn().mockResolvedValue(mockUser),
    };
    const mockDocumentModel = {
        find: jest.fn(),
        deleteMany: jest.fn(),
    };

    const mockBcrypt = {
        encrypt: jest.fn().mockReturnValue('hashpw'),
        compare: jest.fn().mockReturnValue(true),
    };

    const mockAuth = {
        decodeToken: jest.fn().mockReturnValue({ id: 'id' }),
        createToken: jest.fn().mockReturnValue('1f1f1f'),
    };

    const mockResponse = {
        user: mockUser,
        token: '1f1f1f',
    };

    let service: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forFeature([
                    { name: 'User', schema: userSchema },
                    { name: 'Document', schema: documentSchema },
                ]),
            ],
            providers: [
                UserService,
                {
                    provide: AuthService,
                    useValue: mockAuth,
                },
                {
                    provide: BcryptService,
                    useValue: mockBcrypt,
                },
            ],
        })
            .overrideProvider(getModelToken('User'))
            .useValue(mockUserModel)
            .overrideProvider(getModelToken('Document'))
            .useValue(mockDocumentModel)
            .compile();

        service = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('When calling service.create with all data', () => {
        test('Then it should return the saved user', async () => {
            const result = await service.create(mockUser);
            expect(result).toEqual(mockResponse);
        });
    });
    describe('When calling service.create without all data', () => {
        test('Then it should throw an exception', async () => {
            mockUserModel.create.mockImplementationOnce(() => {
                throw new Error();
            });

            expect(
                async () => await service.create(mockUser)
            ).rejects.toThrow();
        });
    });

    describe('When calling service.login with valid login info', () => {
        test('Then it should return the user data and token', async () => {
            const result = await service.login({
                email: mockUser.email,
                password: mockUser.password,
            });
            expect(result).toEqual(mockResponse);
        });
    });

    describe('When calling service.login with invalid email', () => {
        test('Then it should throw an unauthorized exception', async () => {
            mockUserModel.findOne.mockResolvedValueOnce(null);
            expect(async () => {
                await service.login({
                    email: mockUser.email,
                    password: mockUser.password,
                });
            }).rejects.toThrow();
        });
    });

    describe('When calling service.login with invalid password', () => {
        test('Then it should throw an unauthorized exception', async () => {
            mockBcrypt.compare.mockReturnValueOnce(false);
            expect(async () => {
                await service.login({
                    email: mockUser.email,
                    password: mockUser.password,
                });
            }).rejects.toThrow();
        });
    });
    describe('When calling service.loginWithToken with a valid token', () => {
        test('Then it should return the user data and token', async () => {
            const result = await service.loginWithToken('token');
            expect(result).toEqual(mockResponse);
        });
    });
    describe('When calling service.loginWithToken with invalid token', () => {
        test('Then it should throw an unauthorized exception', async () => {
            mockAuth.decodeToken.mockReturnValueOnce('error');
            expect(async () => {
                await service.loginWithToken('token');
            }).rejects.toThrow();
        });
    });
    describe('When calling service.loginWithToken with expired token', () => {
        test('Then it should throw an unauthorized exception', async () => {
            mockAuth.decodeToken.mockImplementationOnce(() => {
                throw new Error();
            });
            expect(async () => {
                await service.loginWithToken('token');
            }).rejects.toThrow();
        });
    });
    describe('When calling service.loginWithToken with a valid token but user does not exist', () => {
        test('Then it should throw an unauthorized exception', async () => {
            mockUserModel.findById.mockResolvedValueOnce(null);
            expect(async () => {
                await service.loginWithToken('token');
            }).rejects.toThrow();
        });
    });
    describe('When calling service.findAll', () => {
        test('Then it should return the founded users', async () => {
            const result = await service.findAll();
            expect(result).toEqual(mockUser);
        });
    });
    describe('When calling service.findOne', () => {
        test('Then it should return the founded user', async () => {
            const result = await service.findOne('');
            expect(result).toEqual(mockUser);
        });
    });

    describe('When calling service.update with no token', () => {
        test('Then it should throw an unauthorized exception', async () => {
            expect(async () => {
                await service.update(null, mockUser);
            }).rejects.toThrow();
        });
    });
    describe('When calling service.update with invalid token', () => {
        test('Then it should throw an unauthorized exception', async () => {
            mockAuth.decodeToken.mockReturnValueOnce('error');
            expect(async () => {
                await service.update('token', mockUser);
            }).rejects.toThrow();
        });
    });
    describe('When calling service.update with expired token', () => {
        test('Then it should throw an unauthorized exception', async () => {
            mockAuth.decodeToken.mockImplementationOnce(() => {
                throw new Error();
            });
            expect(async () => {
                await service.update('token', mockUser);
            }).rejects.toThrow();
        });
    });
    describe('When calling service.update', () => {
        test('Then it should return the updated user', async () => {
            mockAuth.decodeToken.mockReturnValueOnce({ id: 'test' });
            const result = await service.update('token', mockUser);
            expect(result).toEqual({
                ...mockUser,
                name: 'updated',
                password: 'password',
            });
        });
    });
    describe('When calling service.remove', () => {
        test('Then it should return the founded user', async () => {
            const result = await service.remove('');
            expect(result).toEqual(mockUser);
        });
    });
    describe('When calling service.remove with invalid user id', () => {
        test('Then it should throw an exception', async () => {
            mockUserModel.findById.mockResolvedValueOnce(null);
            expect(async () => await service.remove('')).rejects.toThrow();
        });
    });
    describe('When calling service.removeSelf with a valid token', () => {
        test('Then it should return confirm object', async () => {
            mockUserModel.findById.mockResolvedValueOnce({ delete: jest.fn() });
            const result = await service.removeSelf('token');
            expect(result).toEqual({ deleted: true });
        });
    });
    describe('When calling service.removeSelf with invalid token', () => {
        test('Then it should throw an unauthorized exception', async () => {
            mockAuth.decodeToken.mockReturnValueOnce('error');
            expect(async () => {
                await service.removeSelf('token');
            }).rejects.toThrow();
        });
    });
    describe('When calling service.removeSelf with expired token', () => {
        test('Then it should throw an unauthorized exception', async () => {
            mockAuth.decodeToken.mockImplementationOnce(() => {
                throw new Error();
            });
            expect(async () => {
                await service.removeSelf('token');
            }).rejects.toThrow();
        });
    });
    describe('When calling service.removeSelf with a valid token but user does not exist', () => {
        test('Then it should throw an unauthorized exception', async () => {
            mockUserModel.findById.mockResolvedValueOnce(null);
            expect(async () => {
                await service.removeSelf('token');
            }).rejects.toThrow();
        });
    });
    describe('When calling service.removeSelf without token', () => {
        test('Then it should throw an unauthorized exception', async () => {
            expect(async () => {
                await service.removeSelf('');
            }).rejects.toThrow();
        });
    });
});
