import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';
import { LoginDto, SignupDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config()

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { username, password } = signupDto;

    const existingAdmin = await this.adminService.findByUsername(username);
    if (existingAdmin) {
      throw new UnauthorizedException('Username is already taken');
    }

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return this.adminService.create({
      username,
      password: hashedPassword,
    });

  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    
    const admin = await this.adminService.findByUsername(username);
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = { username: admin.username, sub: admin.id };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '1h' }),
    };


    // async signup(signupDto: SignupDto) {
    //   const { username, password } = signupDto;
    //   const hashedPassword = await bcrypt.hash(password, 10);
    //   return this.adminService.create({
    //     username,
    //     password: hashedPassword,
    //   });
    // }

  }
}
