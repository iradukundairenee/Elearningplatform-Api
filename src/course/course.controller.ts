import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile,UseInterceptors,UseGuards,Req, UploadedFiles} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {Request} from 'express'
import { JwtService } from '@nestjs/jwt';
import { AnyFilesInterceptor, FileInterceptor,FilesInterceptor } from '@nestjs/platform-express';


@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService,
    private jwtService: JwtService
    ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('photos[]', 10, { dest: './uploads' }))
  create(@Req() request: Request,@UploadedFiles() files,@Body() createCourseDto: CreateCourseDto) {
    const bearer = request.headers['authorization'];
    const token = bearer.split(' ')[1];
    const data = this.jwtService.verify(token);
    if (data.role == "instructor" || data.role == "admin") {
      console.log('files', files);
    return this.courseService.create(createCourseDto,files);
    }
    else{
      return {
        message: "you are not allowed to access this"
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Req() request: Request,@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Req() request: Request,@Param('id') id: string) {
    const bearer = request.headers['authorization'];
    const token = bearer.split(' ')[1];
    const data = this.jwtService.verify(token);
    if (data.role == "instructor" || data.role == "admin") {
    return this.courseService.remove(+id);
    }
    else{
      return {
        message: "you are not allowed to access this"
      }
    }
  }
}
