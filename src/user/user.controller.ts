import { Controller, Get, Post, Body, Patch, Param,HttpCode, Delete,UseGuards,Req} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {loginUserDto} from './dto/login.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import e, {Request} from 'express'


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,
    private jwtService: JwtService
    ) {}

  @Post('signup')
  @HttpCode(200)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  @HttpCode(201)
  login(@Body() loginUserDto: loginUserDto) {
    return this.userService.loginuser(loginUserDto)
  }

  
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() request: Request) {
    const bearer = request.headers['authorization'];
    const token = bearer.split(' ')[1];
    const data =  this.jwtService.verify(token);
    if(data.role == "admin") {
    return this.userService.findAll();
    }
 else{
  return {
    message: "you are not allowed to access this"
  }
 }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
