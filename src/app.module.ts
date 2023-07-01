import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from "./database/orm.config";
import { CompaniesModule } from './companies/companies.module';
import { PatientModule } from './patient/patient.module';
import { TasksModule } from './tasks/tasks.module';
import { UserAuthModule } from './user.auth/user.auth.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(config),
    CompaniesModule,
    PatientModule,
    TasksModule,
    UserAuthModule
  ],
  // controllers: [AppController],
  providers: [
    {
      provide: "APP_SERVICE",
      useClass: AppService
    }
]
})
export class AppModule {}
