import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { IUserResponse } from './types/userResponse.interface';
import { UserEntity } from './user.entity';
@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository : Repository<UserEntity>){

  }
  async createUser(createUserDto : CreateUserDto) : Promise<IUserResponse>{ 
    const existingUser = await this.userRepository.findOneBy({email : createUserDto.email})
    const existingUsername = await this.userRepository.findOneBy({username : createUserDto.username})
    if(existingUser || existingUsername){
      throw new HttpException('Email hoặc tên đăng nhập đã tồn tại!', HttpStatus.UNPROCESSABLE_ENTITY)
    }
    const newUser = await this.userRepository.create(createUserDto)
    await this.userRepository.save(newUser)
    return this.generateUserResponse(newUser)
  }
  async loginUser(loginUserDto : LoginUserDto) : Promise<UserEntity>{
    const user =  await this.userRepository.findOneBy({email : loginUserDto.email})
    if(!user){
      throw new HttpException('Sai tài khoản hoặc mật khẩu!', HttpStatus.UNAUTHORIZED)
    }
    console.log(user.password, loginUserDto.password)
    const checkPassword = await compare(loginUserDto.password,user.password!)
    if(!checkPassword){
        throw new HttpException('Sai tài khoản hoặc mật khẩu!', HttpStatus.UNAUTHORIZED)
    }
    delete user.password
    return user
  }
  generateToken(user : UserEntity) : string{
    return sign({

      id : user.id,
      username : user.username,
      email : user.email
  },
  process.env.JWT_SECRET || 'SECRET123456',
)
  }
  generateUserResponse(user : UserEntity) : IUserResponse{
    return {
      user : {
        ...user,
        token : this.generateToken(user)
      }
    }
  }
}
