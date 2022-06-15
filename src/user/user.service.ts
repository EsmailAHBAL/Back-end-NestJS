import { User } from './../Entities/User.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { PasswordHashing } from 'src/util/hashPassword.util';
import * as bycrpt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  createToken(user: User) {
    return this.jwtService.sign({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      active: user.active,
    });
  }
  async singUp(userParam: User): Promise<string> {
    const user = await this.userRepository.findOneBy({
      email: userParam.email,
    });
    if (user) {
      throw new NotFoundException('Already Exist');
    }
    const passwordN = await PasswordHashing(userParam.password);
    console.log(passwordN);
    const newUser = this.userRepository.create({
      ...userParam,
      password: passwordN,
    });
    await this.userRepository.save(newUser);
    return this.createToken(userParam);
  }
  async administrationApi(id: number, userParam: User) {
    try {
      const user = await this.userRepository.findOneBy({ id: id });
      console.log(user);
      if (user) {
        if (userParam.password) {
          userParam.password = await PasswordHashing(userParam.password);
        }
        const updateUser = {
          ...user,
          ...userParam,
        };
        const res = await this.userRepository.save(updateUser);
        return res;
      }
      throw new NotFoundException('User Not Found 🔏 ');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async login(user: User): Promise<string> {
    const userCheck = await this.userRepository.findOneBy({
      email: user.email,
    });
    user.id = userCheck.id;
    if (!userCheck) {
      throw new NotFoundException(
        'Failed Check Your email and Your password 🔒 ',
      );
    }
    const isMatch = bycrpt.compareSync(user.password, userCheck.password);
    if (!isMatch) {
      throw new UnauthorizedException(
        'Failed Check Your email and Your password 🔒 ',
      );
    }
    return this.createToken(user);
  }
}
