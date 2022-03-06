import { Module } from '@nestjs/common';
import { CourseDashboardController } from './course-dashboard.controller';
import { CourseDashboardService } from './course-dashboard.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Course}from '../course/entities/course.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[ ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Course]),
    JwtModule.registerAsync({
        useFactory :()=>({
        secret:process.env.JWT_SECRET,
        signOptions:{expiresIn:'1d'},
        }) 
    }),
],
  controllers: [CourseDashboardController],
  providers: [CourseDashboardService]
})
export class CourseDashboardModule {}
