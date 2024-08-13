import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './users.service';
import { WithdrawDto } from './dto/withdraw.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  moneytransfer(@Body() withDrawDto: WithdrawDto){
    return this.userService.withdrawMoney(withDrawDto);
  }
}
