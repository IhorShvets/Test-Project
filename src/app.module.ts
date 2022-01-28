import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { MakeActivityModule } from './intagrations/make-activity/make-activity.module';
import { AppService } from './app.service';
import { TagModule } from './tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './ormconfig';
import { UserModule } from './user.module/user.module';
import { AuthMiddleware } from './user.module/middlewares/auth.middleware';
import { ArticleModule } from './artcile.module/article.module';
import { ProfileModule } from './profile.module/profile.module';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    TypeOrmModule.forRoot(ormconfig),
    MakeActivityModule,
    TagModule,
    UserModule,
    ArticleModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
