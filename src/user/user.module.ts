import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User]),
  JwtModule.registerAsync({
    useFactory :()=>({
    secret:process.env.JWT_SECRET,
    signOptions:{expiresIn:'1d'},
    })

}),
  AuthModule,
],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
