import { PrimaryGeneratedColumn} from "typeorm";
import {IsEmail,IsNotEmpty, IsString,Length} from 'class-validator';
import { loginUserDto } from "./login.dto";
export class CreateUserDto extends loginUserDto  {
    @PrimaryGeneratedColumn()
    id:number;
   
    @IsString()
    FirstName:string;
   
    @IsNotEmpty()
    @IsString()
    LastName:string;

    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @IsString()
    role:string;

    @IsNotEmpty()
    @Length(5, 16)
    password:string; 
}
