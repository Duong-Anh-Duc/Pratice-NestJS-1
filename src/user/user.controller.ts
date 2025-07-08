import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { User } from './decorator/user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from './guards/auth.guard';
import { IUserResponse } from './types/userResponse.interface';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post('users')
  createUser(@Body('user') createUserDto : CreateUserDto){
    return this.userService.createUser(createUserDto)
  }
  @Post('users/login')
  async loginUser(@Body('user') loginUserDto : LoginUserDto ) : Promise<IUserResponse>{
    const user = await this.userService.loginUser(loginUserDto)
    return this.userService.generateUserResponse(user)
  }
  @Put('user')
  @UseGuards(AuthGuard)
  async updateUser(@User('id') userId : number, @Body('user') updateUserDto : UpdateUserDto) : Promise<IUserResponse>{
    return {} as IUserResponse
  }
  @Get('user')
  @UseGuards(AuthGuard)
  async getCurrentUser(@User() user : UserEntity) : Promise<IUserResponse>{
    
    return this.userService.generateUserResponse(user)
  }
}
