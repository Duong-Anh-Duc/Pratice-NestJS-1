import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './ormconfig';
import { TagModule } from './tag/tag.module';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [TypeOrmModule.forRoot(config)
    ,
    ConfigModule.forRoot({
      isGlobal : true,
    }),
    TagModule, 
    UserModule, ArticleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
