import { Controller, Get, Post, Delete, Put, Param, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string) {
    return this.adminService.findOne(+id); // Use `+id` to convert the string to a number
  }

  @Post()
  async createAdmin(
    @Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string) {
    return this.adminService.remove(+id); 
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminService.update(+id, updateAdminDto);
  }
}