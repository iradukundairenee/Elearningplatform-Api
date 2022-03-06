import { Module } from '@nestjs/common';
import { AuthService} from './auth.service'
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy'
import { UserService } from '../user/user.service';
import { JwtStrategy } from './jwt.strategy'
import { ConfigModule } from '@nestjs/config';


@Module({
  imports:[ConfigModule.forRoot(),
    PassportModule,
    JwtModule.registerAsync({
      useFactory :()=>({
        secret:process.env.JWT_SECRET,
        signOptions:{expiresIn:'1d'},
        })
    })
  ],
  providers: [AuthService,UserService,LocalStrategy,JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
