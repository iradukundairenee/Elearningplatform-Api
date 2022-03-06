import { Injectable } from '@nestjs/common';
import {User} from '../user/entities/user.entity'
const bcrypt = require('bcrypt');
import {JwtService} from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class AuthService {
  
    async hashPassword(password:string,){
        return await  bcrypt.hash(password,12);
    }
    async comparePassword(password:string,strorePasswordHash:string){
        return  bcrypt.compare(password,strorePasswordHash);
    }

    async mailExist(email:string){
        return await User.findOne({email})
        }

   
    async validatepasword(password:string){
        
        return await User.findOne({password})

    }

async findUserByEmail(email){
    return await User.find({
        where:[
            {
                email
            }
        ]
    })
}





        
}
