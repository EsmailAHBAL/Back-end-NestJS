import { jwtStrategy } from './../strategy/jwt.strategy';
import { User } from './../Entities/User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [UserService, jwtStrategy],
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'w-ww-wwww-1234',
    }),
  ],
})
export class UserModule {}
