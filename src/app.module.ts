import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './feedback/feedback.entity';
import { Admin } from './admin/admin.entity';
import { FeedbackModule } from './feedback/feedback.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';

dotenv.config()

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: 3307,
      username:  process.env.DB_USERNAME,
      password:  process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Feedback, Admin],
      synchronize: true,
    }),
    FeedbackModule,
    AdminModule,
    AuthModule,
  ],
})
export class AppModule {}
