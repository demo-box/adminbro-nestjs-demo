import { Module } from '@nestjs/common';
import AdminBro from 'admin-bro';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Database, Resource } from '@admin-bro/mongoose';
import { Model } from 'mongoose';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from '@admin-bro/nestjs';
import { Comment, CommentSchema } from '../comment/comment.schema';

AdminBro.registerAdapter({ Database, Resource });

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/comment'),
    AdminModule.createAdminAsync({
      useFactory: (commentModel: Model<Comment>) => ({
        auth: {
          authenticate: async () => {
            return Promise.resolve({ email: 'test' });
          },
          cookieName: 'admin_panel',
          cookiePassword: 'faltab',
        },
        adminBroOptions: {
          rootPath: '/admin',
          resources: [commentModel],
        },
      }),
      inject: [getModelToken(Comment.name)],
      imports: [
        MongooseModule.forFeature([
          { name: Comment.name, schema: CommentSchema },
        ]),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
