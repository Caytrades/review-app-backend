import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './feedback/feedback.entity';
import { Admin } from './admin/admin.entity';
import { FeedbackModule } from './feedback/feedback.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'review_db',
      entities: [Feedback, Admin],
      synchronize: true, // Turn off in production
    }),
    FeedbackModule,
    AdminModule,
    AuthModule,
  ],
})
export class AppModule {}
