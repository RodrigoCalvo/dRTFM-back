import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DocumentModule } from './document/document.module';

@Module({
  imports: [UserModule, DocumentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
