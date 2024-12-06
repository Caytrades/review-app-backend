import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin } from './admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])], // Register the Admin entity here
  providers: [AdminService],
  controllers: [AdminController],
  exports: [AdminService], // Export if needed elsewhere
})
export class AdminModule {}
