import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { IUserResponse } from './types/userResponse.interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post()
  createUser(@Body('user') createUserDto : CreateUserDto){
    return this.userService.createUser(createUserDto)
  }
  @Post('login')
  async loginUser(@Body('user') loginUserDto : LoginUserDto ) : Promise<IUserResponse>{
    const user = await this.userService.loginUser(loginUserDto)
    return this.userService.generateUserResponse(user)
  }
}
