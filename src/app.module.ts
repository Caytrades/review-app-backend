import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';
import { Admin } from './entities/admin.entity';
import { FeedbackModule } from './feedback/feedback.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { Product } from './entities/product.entity';
import { UsersModule } from './users/users.module';
import { QuestionsModule } from './questions/questions.module';
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
      entities: [Feedback, Admin, Product],
      synchronize: true,
    }),
    FeedbackModule,
    AdminModule,
    AuthModule,
    ProductModule,
    UsersModule,
    QuestionsModule,
  ],
})
export class AppModule {}
