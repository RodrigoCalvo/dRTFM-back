import { Test, TestingModule } from '@nestjs/testing';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';

describe('DocumentController', () => {
    let controller: DocumentController;
    let service: DocumentService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [DocumentController],
            providers: [
                {
                    provide: DocumentService,
                    useValue: {
                        create: jest.fn(),
                        fork: jest.fn(),
                        findAll: jest.fn(),
                        search: jest.fn(),
                        findOne: jest.fn(),
                        update: jest.fn(),
                        remove: jest.fn(),
                        addFav: jest.fn(),
                        loadDB: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<DocumentController>(DocumentController);
        service = module.get<DocumentService>(DocumentService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    describe('When calling controller.create', () => {
        test('Then service.create should be called', () => {
            controller.create({
                title: '',
                content: [{ text: '', options: [{ key: '', value: 0 }] }],
                keywords: [''],
                author: '',
                visibility: 'public',
            });
            expect(service.create).toHaveBeenCalled();
        });
    });

    describe('When calling controller.load', () => {
        test('Then service.load should be called', () => {
            controller.loadDB();
            expect(service.loadDB).toHaveBeenCalled();
        });
    });
    describe('When calling controller.fork', () => {
        test('Then service.fork should be called', () => {
            controller.fork('', '');
            expect(service.fork).toHaveBeenCalled();
        });
    });
    describe('When calling controller.findAll', () => {
        test('Then service.findAll should be called', () => {
            controller.findAll();
            expect(service.findAll).toHaveBeenCalled();
        });
    });
    describe('When calling controller.search', () => {
        test('Then service.search should be called', () => {
            controller.search({ query: '' });
            expect(service.search).toHaveBeenCalled();
        });
    });
    describe('When calling controller.search', () => {
        test('Then service.search should be called', () => {
            controller.search({ query: '', page: '1', limit: '3' });
            expect(service.search).toHaveBeenCalled();
        });
    });
    describe('When calling controller.search', () => {
        test('Then service.search should be called', () => {
            controller.search({ query: '', page: 'test', limit: 'test' });
            expect(service.search).toHaveBeenCalled();
        });
    });
    describe('When calling controller.findOne', () => {
        test('Then service.findOne should be called', () => {
            controller.findOne('');
            expect(service.findOne).toHaveBeenCalled();
        });
    });
    describe('When calling controller.addFav', () => {
        test('Then service.addFav should be called', () => {
            controller.addFav('id', 'token');
            expect(service.addFav).toHaveBeenCalled();
        });
    });
    describe('When calling controller.update', () => {
        test('Then service.update should be called', () => {
            controller.update('', {});
            expect(service.update).toHaveBeenCalled();
        });
    });
    describe('When calling controller.remove', () => {
        test('Then service.remove should be called', () => {
            controller.remove('');
            expect(service.remove).toHaveBeenCalled();
        });
    });
});
