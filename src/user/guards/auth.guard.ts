import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthRequest } from "src/types/expressRequest.interface";

@Injectable()
export class AuthGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request =  context.switchToHttp().getRequest<AuthRequest>()
        if(request.user.id){
            return true
        }
       throw new HttpException('Bạn không có quyền!', HttpStatus.UNAUTHORIZED)
    }

}