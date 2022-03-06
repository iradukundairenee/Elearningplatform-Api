import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import {Course} from './entities/course.entity'


@Injectable()
export class CourseService {
  create(createCourseDto: CreateCourseDto) {
    const createCourse = new Course();
    createCourse.CourseTitle=createCourseDto.CourseTitle;
    createCourse.Description = createCourseDto.Description;
    createCourse.Content =createCourseDto.Content;
    createCourse.save();
    return {
      message:`course created success`
    }
  }

  findAll() {
    return Course.find()
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
