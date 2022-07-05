import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { documentSchema } from './entities/document.entity';
import { userSchema } from '../user/entities/user.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Document', schema: documentSchema },
            { name: 'User', schema: userSchema },
        ]),
    ],
    controllers: [DocumentController],
    providers: [DocumentService],
})
export class DocumentModule {}
