import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { userSchema } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { DocumentService } from './document.service';
import { documentSchema } from './entities/document.entity';

describe('DocumentService', () => {
    let service: DocumentService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forFeature([
                    { name: 'Document', schema: documentSchema },
                    { name: 'User', schema: userSchema },
                ]),
            ],
            providers: [DocumentService, UserService],
        }).compile();

        service = module.get<DocumentService>(DocumentService);
    });

    test.todo(
        'should be defined' //, () => {
        //     expect(service).toBeDefined();
        // }
    );
});
