import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService} from  '../user/user.service'
import { AuthService} from '../auth/auth.service'


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService:UserService) {
    super();
  }

  async validate( email: string,password: string){

    // const user = await this.userService.login(email,password);
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    // return user;
  }
}