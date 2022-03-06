import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert, JoinColumn,OneToMany,JoinTable} from "typeorm";
import { Course } from '../../course/entities/course.entity';
import { IsNotEmpty, IsEmail, Length } from 'class-validator';

@Entity('user')
export class User  extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @IsNotEmpty({
        message: 'please enter your FirstName'
    })
    @Column({ default: null })
    public FirstName: string;

    @IsNotEmpty({
        message: 'please enter your LastName'
    })
    @Column({ default: null })
    public LastName: string;

    @IsNotEmpty({
        message: 'email is required'
    })
    @IsEmail()
    @Column({ unique: false, default: null })
    public email: string;


    @IsNotEmpty({
        message: 'password is required'
    })
    @Length(10, 16)
    @Column({ default: null})
    public password: string;

    @Column({ default: null })
    public role: string;

    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }
    @OneToMany(()=>Course,course => course.id)
    @JoinTable()
    public Coursepg:Course[]
}
