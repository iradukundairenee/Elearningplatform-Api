import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import {Course} from './entities/course.entity';
import {In} from 'typeorm'


@Injectable()
export class CourseService {
  create(createCourseDto: CreateCourseDto,files) {
    const createCourse = new Course();
    createCourse.CourseTitle=createCourseDto.CourseTitle;
    createCourse.Description = createCourseDto.Description;
    createCourse.Content =createCourseDto.Content;
    createCourse.Image=files[0].path;
    createCourse.Amount= createCourseDto.Amount;
    createCourse.confirmed= createCourseDto.confirmed;
    createCourse.save();
    return {
      message:`you have create course succesfull`
    }
  }

  findAll() {
    return Course.find({ where: {
      confirmed: In(['1'])
    }})
  }

  findOne(id: number) {
    return Course.findOne(id);
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    return await Course.update(id, updateCourseDto);

  }

 async  remove(id: number) {
   const result =await Course.delete(id);
    
    return {
      message:"course deleted",
      data:result
    }
  }
}
