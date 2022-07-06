/* istanbul ignore file */
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DocumentModule } from './document/document.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth/auth.service';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { UserMiddleware } from './middlewares/user.middleware';
import { documentSchema } from './document/entities/document.entity';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.URI_MONGO),
        UserModule,
        DocumentModule,
        MongooseModule.forFeature([
            { name: 'Document', schema: documentSchema },
        ]),
    ],
    controllers: [AppController],
    providers: [AppService, AuthService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .exclude(
                { path: 'user', method: RequestMethod.POST },
                { path: 'user/login', method: RequestMethod.POST },
                { path: 'document', method: RequestMethod.GET },
                { path: 'document/:id', method: RequestMethod.GET }
            )
            .forRoutes('*')
            .apply(UserMiddleware)
            .forRoutes(
                { path: 'document', method: RequestMethod.PATCH },
                { path: 'document', method: RequestMethod.DELETE }
            );
    }
}
