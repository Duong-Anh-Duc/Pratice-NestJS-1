import { Injectable, NestMiddleware } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NextFunction, Response } from "express";
import { JwtPayload, verify } from 'jsonwebtoken';
import { AuthRequest } from "src/types/expressRequest.interface";
import { UserEntity } from "../user.entity";
import { UserService } from "../user.service";
@Injectable()
export class AuthMiddleware implements NestMiddleware{
    constructor(private readonly userService : UserService, private readonly configService : ConfigService){}
    async use(req: AuthRequest, res: Response, next: NextFunction) {
        if(!req.headers.authorization){
          req.user = new UserEntity()
          next() 
          return
        }
        const token = req.headers.authorization.split(' ')[1]
        try{
             const decode = verify(token, this.configService.get<string>('JWT_SECRET') as string) as JwtPayload
             const user = await this.userService.findUserById(decode.id)
             req.user = user
             next()
        }catch(err){
           req.user = new UserEntity()
           next()
        }
    }
}