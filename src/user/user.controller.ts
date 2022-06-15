import { UserService } from './user.service';
import { User } from './../Entities/User.entity';
// eslint-disable-next-line prettier/prettier
import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { userDecorater } from 'src/decorator/decorators';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('signup')
  async __singUp(@Body() user: User): Promise<any> {
    const token = await this.userService.singUp(user);
    return JSON.parse(`{"token":"${token}"}`);
  }
  @Patch(':id')
  async dashboard(@Body() user: User, @Param('id') id: string): Promise<User> {
    return this.userService.administrationApi(Number(id), user);
  }

  @Post('login')
  async __login(@Body() user: User): Promise<JSON> {
    const token = await this.userService.login(user);
    return JSON.parse(`{"token":"${token}"}`);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async __home(@userDecorater() user: User) {
    console.log(user);
    return user;
  }
}
