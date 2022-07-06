import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import { userSchema } from '../user/entities/user.entity';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { documentSchema } from './entities/document.entity';

describe('DocumentService', () => {
    const mockDocument: CreateDocumentDto = {
        title: '',
        content: [
            {
                text: '',
                options: [{ key: '', value: '' }],
            },
        ],
        keywords: [''],
        author: '',
        visibility: 'public',
    };
    const mockUser = {
        id: 'idTest',
        name: 'test',
        email: 'test@test.test',
        password: 'password',
        photo: '',
        myDocuments: [],
        myFavs: [],
        save: jest.fn(),
    };
    const mockDocumentModel = {
        create: jest.fn().mockResolvedValue(mockDocument),
        findById: jest.fn().mockReturnValue({
            ...mockDocument,
            populate: jest.fn().mockResolvedValue(mockDocument),
        }),
        find: jest.fn().mockReturnValue({
            ...mockDocument,
            populate: jest.fn().mockResolvedValue(mockDocument),
        }),
        findByIdAndUpdate: jest.fn().mockResolvedValue(mockDocument),
    };
    const mockUserModel = {
        findById: jest.fn().mockResolvedValue(mockUser),
        findByIdAndUpdate: jest.fn().mockResolvedValue(mockUser),
    };
    const mockAuth = {
        decodeToken: jest.fn().mockReturnValue({ id: 'idTest' }),
        createToken: jest.fn().mockReturnValue('1f1f1f'),
    };
    let service: DocumentService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forFeature([
                    { name: 'Document', schema: documentSchema },
                    { name: 'User', schema: userSchema },
                ]),
            ],
            providers: [
                DocumentService,
                {
                    provide: AuthService,
                    useValue: mockAuth,
                },
            ],
        })
            .overrideProvider(getModelToken('User'))
            .useValue(mockUserModel)
            .overrideProvider(getModelToken('Document'))
            .useValue(mockDocumentModel)
            .compile();

        service = module.get<DocumentService>(DocumentService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('When calling service.create', () => {
        test('Then it should return the saved user', async () => {
            const result = await service.create(mockDocument);
            expect(result).toEqual(mockDocument);
        });
    });
    describe('When calling service.create with invalid user', () => {
        test('Then it should throw an exception', async () => {
            mockUserModel.findById.mockResolvedValueOnce(null);
            expect(
                async () => await service.create(mockDocument)
            ).rejects.toThrow();
        });
    });
    describe('When calling service.fork with correct ids', () => {
        test('Then it should return a new document with the new author', async () => {
            mockDocumentModel.create.mockImplementationOnce((args) => args);
            const result = await service.fork('', 'token token');
            expect(result).toEqual({ ...mockDocument, author: mockUser.id });
        });
    });
    describe('When calling service.fork with incorrect user id', () => {
        test('Then it should throw an exception', async () => {
            mockUserModel.findById.mockResolvedValueOnce(null);
            await expect(
                async () => await service.fork('', 'token token')
            ).rejects.toThrow();
        });
    });
    describe('When calling service.fork with incorrect document id', () => {
        test('Then it should throw an exception', async () => {
            mockDocumentModel.findById.mockResolvedValueOnce(null);
            await expect(
                async () => await service.fork('', 'token token')
            ).rejects.toThrow();
        });
    });
    describe('When calling service.fork with expired token', () => {
        test('Then it should throw an exception', async () => {
            mockAuth.decodeToken.mockImplementationOnce(() => {
                throw new Error();
            });
            await expect(
                async () => await service.fork('', 'token token')
            ).rejects.toThrow();
        });
    });
    describe('When calling service.fork with invalid token', () => {
        test('Then it should throw an exception', async () => {
            mockAuth.decodeToken.mockReturnValueOnce('');
            await expect(
                async () => await service.fork('', 'token token')
            ).rejects.toThrow();
        });
    });
    describe('When calling service.fork with no token', () => {
        test('Then it should throw an exception', async () => {
            await expect(
                async () => await service.fork('', '')
            ).rejects.toThrow();
        });
    });
    describe('When calling service.findAll', () => {
        test('Then it should return all the documents', async () => {
            const result = await service.findAll();
            expect(result).toEqual(mockDocument);
        });
    });
    describe('When calling service.search with a less than 3 length query', () => {
        test('Then it should return undefined', async () => {
            const result = await service.search('');
            expect(result).toBeUndefined();
        });
    });
    describe('When calling service.search with a more than 3 length query', () => {
        test('Then it should return the result of the search', async () => {
            const result = await service.search('test');
            expect(result).toEqual(mockDocument);
        });
    });
    describe('When calling service.findOne', () => {
        test('Then it should return one the documents', async () => {
            mockDocumentModel.findById.mockReturnValueOnce({
                populate: jest.fn().mockResolvedValueOnce(mockDocument),
            });
            const result = await service.findOne('');
            expect(result).toEqual(mockDocument);
        });
    });
    describe('When calling service.update', () => {
        test('Then it should return the updated document', async () => {
            const result = await service.update('', mockDocument);
            expect(result).toEqual(mockDocument);
        });
    });
    describe('When calling service.remove', () => {
        test('Then it should return the removed document', async () => {
            mockDocumentModel.findById.mockResolvedValue({
                delete: jest.fn().mockResolvedValue(mockDocument),
            });
            const result = await service.remove('');
            expect(result).toEqual(mockDocument);
        });
    });
    describe('When calling service.remove with not valid user', () => {
        test('Then it should return throw an exception', async () => {
            mockDocumentModel.findById.mockResolvedValueOnce({
                delete: jest.fn().mockResolvedValue(mockDocument),
            });
            mockUserModel.findByIdAndUpdate.mockResolvedValueOnce(null);
            expect(async () => await service.remove('')).rejects.toThrow();
        });
    });
});
