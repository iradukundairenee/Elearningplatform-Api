import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';

@Injectable()
export class UserDashboardService {

    countAll() {
        return User.count()
    }
}

