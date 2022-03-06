import { Controller,Get,UseGuards,Req } from '@nestjs/common';
import {CourseDashboardService } from '../course-dashboard/course-dashboard.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import {Request} from 'express'


@Controller('course-dashboard')

export class CourseDashboardController {
    constructor(private readonly courseDashboardService: CourseDashboardService,
        private jwtService: JwtService
        ) {}

        @UseGuards(JwtAuthGuard)
    @Get()
    countAll(@Req() request: Request) {
      const bearer = request.headers['authorization'];

    const token = bearer.split(' ')[1];
    const data =  this.jwtService.verify(token);
    if(data.role == "admin") {
      return this.courseDashboardService.countAll();
    }
    else{
      return {
        message: "you are not allowed to access this"
      }
    }
    }
}
