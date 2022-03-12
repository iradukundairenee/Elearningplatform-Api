import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert, JoinColumn,OneToMany,JoinTable} from "typeorm";
import { Course } from '../../course/entities/course.entity';
import { IsNotEmpty, IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
export class User  extends BaseEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    public id: number;

    @IsNotEmpty({
        message: 'please enter your FirstName'
    })
    @ApiProperty({description: 'please enter your FirstName' })
    @Column({ default: null })
    public FirstName: string;

    @IsNotEmpty({
        message: 'please enter your LastName'
    })
    @ApiProperty({  description: 'please enter your last name' })
    @Column({ default: null })
    public LastName: string;

    @IsNotEmpty({
        message: 'email is required'
    })
    @ApiProperty({ description: 'please enter your email' })
    @IsEmail()
    @Column({ unique: false, default: null })
    public email: string;

    @Column({ default: null })
    public role: string;


    @IsNotEmpty({
        message: 'password is required'
    })
    @ApiProperty({  description: 'please enter your password' })
    @Length(10, 16)
    @Column({ default: null})
    public password: string;


    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }
    @OneToMany(type =>Course,course => course.user)courses:Course[];
    // @JoinTable()
    // public Coursepg:Course[]
}
