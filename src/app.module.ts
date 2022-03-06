import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CourseModule } from './course/course.module';
import { MulterModule } from '@nestjs/platform-express';
import { UserDashboardModule } from './user-dashboard/user-dashboard.module';
import { CourseDashboardModule } from './course-dashboard/course-dashboard.module';


@Module({
  imports: [ ConfigModule.forRoot(),
    MulterModule.register({
      dest: './files',
    }),
    TypeOrmModule.forRoot({
      type:'postgres',
      host:process.env.POSTGRES_HOST,
      port:parseInt(<string>process.env.POSTGRES_PORT),
      username:process.env.POSTGRES_USER,
      password:process.env.POSTGRES_PASSWORD,
      database:process.env.POSTGRES_DATABASE,
      autoLoadEntities:true,
      synchronize:true,
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),UserModule, CourseModule, UserDashboardModule, CourseDashboardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
