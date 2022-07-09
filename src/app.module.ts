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
import { userSchema } from './user/entities/user.entity';
import { AdminMiddleware } from './middlewares/admin.middleware';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(
            `mongodb+srv://${process.env.MONGO_USER}:${process.env.PASSWORD}@${
                process.env.CLUSTER
            }.mongodb.net/${
                process.env.NODE_ENV === 'test'
                    ? process.env.TEST_DBNAME
                    : process.env.DBNAME
            }?retryWrites=true&w=majority`
        ),
        UserModule,
        DocumentModule,
        MongooseModule.forFeature([
            { name: 'Document', schema: documentSchema },
            { name: 'User', schema: userSchema },
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
            )
            .apply(AdminMiddleware)
            .forRoutes({ path: 'user/:id', method: RequestMethod.DELETE });
    }
}
