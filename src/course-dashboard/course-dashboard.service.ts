import { Injectable } from '@nestjs/common';
import {Course} from '../course/entities/course.entity'

@Injectable()
export class CourseDashboardService {
    countAll() {
        return Course.count()
    }
}
