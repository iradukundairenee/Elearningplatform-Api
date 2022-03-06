import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User}from '../user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { UserDashboardController } from '../user-dashboard/user-dashboard.controller';
import { UserDashboardService } from '../user-dashboard/user-dashboard.service';

@Module({
    imports:[ ConfigModule.forRoot(),
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
            useFactory :()=>({
            secret:process.env.JWT_SECRET,
            signOptions:{expiresIn:'1d'},
            })
        
        }),
  ],
  controllers: [UserDashboardController],
  providers: [UserDashboardService],
})
export class UserDashboardModule {}
