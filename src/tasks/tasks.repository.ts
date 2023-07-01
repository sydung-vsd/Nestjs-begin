import { DataSource, EntityRepository, Repository } from "typeorm";
import { TaskEntity } from "./entities/task.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class TaksRepository extends Repository<TaskEntity> {
    constructor(
        private dataSource: DataSource
    ) {
        super(TaskEntity, dataSource.createEntityManager());
    }
}