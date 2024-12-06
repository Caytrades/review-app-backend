import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async validateAdmin(username: string, password: string): Promise<any> {
    const admin = await this.adminService.findByUsername(username);
    if (admin && (await bcrypt.compare(password, admin.password))) {
      const { password, ...result } = admin; // Exclude the password from the returned result
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(admin: any) {
    const payload = { username: admin.username, sub: admin.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
