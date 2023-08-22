import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Company } from "src/companies/entities/companies.entity";
import { Patient } from "src/patient/entities/patient.entity";
import { TaskEntity } from "src/tasks/entities/task.entity";
import { UserAuthEntity } from "src/user.auth/entities/user.auth.entity";

export const config: TypeOrmModuleOptions = {
    type: 'postgres',
    username: 'postgres',
    password: 'dung12345678',
    host: 'localhost',
    port: 5432,
    database: 'nestjs-begin',
    synchronize: true,
    autoLoadEntities: true,
    entities: [
        // __dirname + '/**/*.entity.ts',
        Patient,
        Company,
        TaskEntity,
        UserAuthEntity,
    ],
    // logging: true, // để khi run lên, những table nào được tạo nó sẽ log ra
}

// commit 1
// commit 2
// commit 3