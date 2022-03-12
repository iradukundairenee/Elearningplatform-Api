import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UserDashboardService } from '../user-dashboard/user-dashboard.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
@Controller(`${process.env.API_VERSION}user-dashboard`)
export class UserDashboardController {
  constructor(private readonly userDashboardService: UserDashboardService,
    private jwtService: JwtService
  ) { }


  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get()
  countAll(@Req() request: Request) {
    const bearer = request.headers['authorization'];

    const token = bearer.split(' ')[1];
    const data = this.jwtService.verify(token);
    if (data.role == "admin") {
      return this.userDashboardService.countAll();
    }
    else {
      return {
        message: "you are not allowed to access this"
      }
    }
  }
}
