import { Controller, Get, Post, Body, Patch, Param,HttpCode, Delete,UseGuards,Req,UseInterceptors} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {loginUserDto} from './dto/login.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import {Request} from 'express'
import { FileInterceptor } from '@nestjs/platform-express';
import {ApiConsumes,ApiBody,ApiBearerAuth,ApiHeader,ApiResponse} from '@nestjs/swagger';


@Controller(`api/v1/user`)
export class UserController {
  constructor(private readonly userService: UserService,
    private jwtService: JwtService
    ) {}

  @Post('signup')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: 'multipart/form-data',
    required: true,
    schema: {
      type: 'object',
      properties: {
              FirstName: { type: 'string' },
              LastName: { type: 'string' },
              email:{ type: 'email' },
              role:{ type: 'string' },
              password:{type:"password"}
            },
      }
  })
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(201)
  @ApiResponse({ status: 201, description: 'The user is successfully created'})
  @ApiResponse({ status: 403, description: 'Forbidden'})
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: 'multipart/form-data',
    required: true,
    schema: {
      type: 'object',
      properties: {
              email:{ type: 'email' },
              password:{type:"password"}
            },
      }
  })
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(200)
  login(@Body() loginUserDto: loginUserDto) {
    return this.userService.loginuser(loginUserDto)
  }

  
  @Get()
  @ApiBearerAuth('access-token') 
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Return a list of books'})
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

  @ApiBearerAuth('access-token') 
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiHeader({
    name: 'Header',
    description: ' User Header'
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }


  @ApiBearerAuth('access-token') 
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiHeader({
    name: 'Header',
    description: ' User Header'
  })
  @ApiResponse({ status: 200, description: 'Return a user based on a particular id'})
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiBearerAuth('access-token') 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
