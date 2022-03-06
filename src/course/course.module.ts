import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Course}from '../course/entities/course.entity';

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
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule {}
