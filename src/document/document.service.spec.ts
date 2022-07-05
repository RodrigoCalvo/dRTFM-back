import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
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
    let service: DocumentService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forFeature([
                    { name: 'Document', schema: documentSchema },
                    { name: 'User', schema: userSchema },
                ]),
            ],
            providers: [DocumentService],
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
    describe('When calling service.fork with correct ids', () => {
        test('Then it should return a new document with the new author', async () => {
            mockDocumentModel.create.mockImplementationOnce((args) => args);
            const result = await service.fork('', '');
            expect(result).toEqual({ ...mockDocument, author: mockUser.id });
        });
    });
    describe('When calling service.fork with incorrect ids', () => {
        test.todo(
            'Then it should throw an exception'
            // , async () => {
            //     mockUserModel.findById.mockResolvedValueOnce(null);
            //     await expect(async () => await service.fork('', '')).toThrow();
            // }
        );
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
            mockDocumentModel.findById.mockResolvedValueOnce({
                delete: jest.fn().mockResolvedValue(mockDocument),
            });
            const result = await service.remove('');
            expect(result).toEqual(mockDocument);
        });
    });
    describe('When calling service.remove with not valid user', () => {
        test.todo(
            'Then it should return throw an exception'
            // , async () => {
            //     mockUserModel.findByIdAndUpdate.mockResolvedValueOnce(null);
            //     expect(async () => await service.remove('')).toThrow();
            // }
        );
    });
});
