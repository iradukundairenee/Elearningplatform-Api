import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { loginUserDto } from './dto/login.dto'
const bcrypt = require('bcrypt');
import {In} from 'typeorm'

@Injectable()
export class UserService {
  constructor(
    public AuthService: AuthService,
    private jwtService: JwtService,
) {}
  async create(createUserDto: CreateUserDto) {
    const emailExist = await this.AuthService.mailExist(createUserDto.email);
  
    if (emailExist) {
      return {
          message: "email already exist"
      };
  }
  else{
    const hashed = await bcrypt.hash(createUserDto.password, 12);
    const createUser = new User();
    createUser.id= createUserDto.id;
    createUser.FirstName= createUserDto.FirstName;
    createUser.LastName =createUserDto.LastName;
    createUser.email = createUserDto.email;
    createUser.password = hashed;
    createUser.role =createUserDto.role
    createUser.save();
    const jwt =  this.jwtService.sign({ id: createUser.id, email: createUser.email,role: createUser.role});
    return {
      message:`welcome ${createUser.LastName}`,
      token:jwt
    }
  }
  }
  async loginuser(loginUserDto: loginUserDto) {
    
    const user = await this.AuthService.findUserByEmail(loginUserDto.email);
    const LastName= user[0].LastName;
    if (user[0]) {
        const valid = await this.AuthService.comparePassword(loginUserDto.password, user[0].password);
        if (valid) {
            const jwt = this.jwtService.sign({ id: user[0].id, email: user[0].email, role: user[0].role });
            return {

                message: `welcome ${LastName}`,
                token: jwt
            }
        } else {
            return {
                message: "incorrect username or password"
            }
        }
    }
    else {
        return {
            message: "incorect username or password"
        }
    }
  }


  findAll() {
    return User.find({ where: {
      role: In(['student','instructor'])
    }});
  }

  findOne(id: number) {
    return  User.findOne()
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
