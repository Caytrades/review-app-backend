import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async findAll() {
    return await this.adminRepository.find();
  }

  async findOne(id: number) {
    const admin = await this.adminRepository.findOneBy({ id });
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }
    return admin;
  }

  async create(createAdminDto: CreateAdminDto) {
    const newAdmin = this.adminRepository.create(createAdminDto);
    return await this.adminRepository.save(newAdmin);
  }

  async remove(id: number) {
    const admin = await this.adminRepository.findOneBy({ id });
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }
    await this.adminRepository.delete(id);
    return `Admin with ID ${id} has been deleted successfully`;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminRepository.findOneBy({ id });
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }

    // Update the admin's fields
    const updatedAdmin = Object.assign(admin, updateAdminDto);
    await this.adminRepository.save(updatedAdmin);
    return `Admin with ID ${id} has been updated successfully`;
  }

  async findByUsername(username: string): Promise<Admin | undefined> {
    return this.adminRepository.findOne({ where: { username } });
  }
}
