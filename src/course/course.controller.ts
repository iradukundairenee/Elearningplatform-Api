import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards, Req, UploadedFiles } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express'
import { JwtService } from '@nestjs/jwt';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiBearerAuth, ApiHeader, ApiResponse } from '@nestjs/swagger';



@Controller(`${process.env.API_VERSION}course`)
export class CourseController {
  constructor(private readonly courseService: CourseService,
    private jwtService: JwtService
  ) { }


  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: 'multipart/form-data',
    required: true,
    schema: {
      type: 'object',
      properties: {
        CourseTitle: { type: 'string' },
        Description: { type: 'string' },
        Content: { type: 'string' },
        Image: {
          type: 'string',
          format: 'binary',
        },
        Amount: { type: 'number' },
        confirmed: { type: 'number' }
      },
    }
  })
 
  @UseInterceptors(FilesInterceptor('Image', 10, { dest: './uploads' }))
  create(@Req() request: Request, @UploadedFiles() files, @Body() createCourseDto: CreateCourseDto) {
    const bearer = request.headers['authorization'];
    const token = bearer.split(' ')[1];
    const data = this.jwtService.verify(token);
    if (data.role == "instructor" || data.role == "admin") {
      console.log('files', files);
      return this.courseService.create(createCourseDto, files);
    }
    else {
      return {
        message: "you are not allowed to access this"
      }
    }
  }


  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Req() request: Request, @Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors()
  async update(@Req() request: Request, @Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    const bearer = request.headers['authorization'];
    const token = bearer.split(' ')[1];
    const data = this.jwtService.verify(token);
    if (data.role == "admin") {
      const result = await this.courseService.update(+id, updateCourseDto);
      return {
        message: "course confirmed",
        data: result
      }
    }
    else {
      return {
        message: "you are not allowed to access this"
      }
    }

  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Req() request: Request, @Param('id') id: string) {
    const bearer = request.headers['authorization'];
    const token = bearer.split(' ')[1];
    const data = this.jwtService.verify(token);
    if (data.role == "instructor" || data.role == "admin") {
      return this.courseService.remove(+id);
    }
    else {
      return {
        message: "you are not allowed to access this"
      }
    }
  }
}
