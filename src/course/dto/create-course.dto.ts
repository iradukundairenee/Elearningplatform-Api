import { PrimaryGeneratedColumn} from "typeorm";
import {IsNotEmpty, IsNumber, IsString,Length} from 'class-validator';
export class CreateCourseDto {
    @PrimaryGeneratedColumn()
    id:number;
    
    @IsNotEmpty()
    @IsString()
    CourseTitle:string
   
    @IsNotEmpty()
    @IsString()
    Description:string

    @IsNotEmpty()
    @IsString()
    Content:string
  
   

}
