import { Entity, PrimaryGeneratedColumn, Column, BaseEntity,JoinColumn, ManyToOne,JoinTable} from "typeorm";
import { User } from '../../user/entities/user.entity';


@Entity('course')
export class Course extends BaseEntity{
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ default: null })
    public CourseTitle:string
    
    @Column({ default: null })
    public Description:string

    @Column({ default: null })
    public Content:string

    @Column({ default: null })
    public Image:string

    @ManyToOne(()=>User,user=> user.id)
    @JoinTable()
    public User:User[]

}
