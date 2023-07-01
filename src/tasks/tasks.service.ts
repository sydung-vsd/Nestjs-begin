import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { IResponse } from 'src/types/ResponseType';
import { getDataResponse } from 'src/utils/getDataResponse';
import { TaskEntity } from './entities/task.entity';
import { TaskStatus } from './tasks-status.enum';
import { GetTaskFilterDto } from './entities/getTaskFilterDto.entity';
import { PageOptionsDto } from 'src/common/Pagination/dtos';
import { PageDto } from 'src/common/Pagination/page.dto';
import { PageMetaDto } from 'src/common/Pagination/page-meta.dto';

@Injectable()
export class TasksService {
  constructor(
    private tasksRepository: TaksRepository,
  ) {}

    async getTasksById(id: string) {
      const data = await this.tasksRepository.findOne({
        where: {
          id: id
        }
      })
      console.log("🚀 ~ file: tasks.service.ts:21 ~ TasksService ~ getTasksById ~ data:", data);
      if (!data) {
        throw new NotFoundException("Taks is not exist")
      }
      
      return getDataResponse("Success", 200, data);
    }

    async create(createTaskDto: CreateTaskDto) {
      try {
        if (!createTaskDto.title) {
          return getDataResponse("The title is required")
        }

        if (!createTaskDto.description) {
          return getDataResponse("The description is required");
        }

        const task: TaskEntity = new TaskEntity();
        task.description = createTaskDto.description;
        task.title = createTaskDto.title;
        task.status = TaskStatus.OPEN;

        const taskPost = this.tasksRepository.create(task);

        await this.tasksRepository.save(taskPost);
        console.log("[Create-Task] - [SUCCESS]", taskPost)
        
        return getDataResponse("Success", 200, taskPost);
      } catch (error) {
        console.log(error);
        throw error;
      }
  }

  async getAll(taskFilter: GetTaskFilterDto) {
    try {
      const {title, description, page, perPage} = taskFilter;

      const pagination = {
        page: parseInt(page, 10),
        totalRec: 0,
        totalPage: 0,
        recPerPage: parseInt(perPage, 10),
    };

      const getFull = pagination.page === -1;
      const skip = (pagination.page - 1) * pagination.recPerPage;
    } catch (error) {
      
    }
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<TaskEntity>> {
    console.log("page", pageOptionsDto.page);
    // example: 
    // const postWithDataSource = await this.dataSource
    //   .createQueryBuilder()
    //   .select("post")
    //   .from(Post, "post")
    //   .where("post.id= :postId", { postId: id })
    //   .getOne()
    const queryBuilder = this.tasksRepository.createQueryBuilder("tasks");
    queryBuilder
      .orderBy("title", pageOptionsDto.order)
      .offset(10)
      .limit(10)
      .take(pageOptionsDto.take);

    const totalRec = await queryBuilder.getCount();
    console.log("🚀 ~ file: tasks.service.ts:92 ~ TasksService ~ findAll ~ itemCount:", totalRec);
    const { entities: tasksList } = await queryBuilder.getRawAndEntities();
    console.log("🚀 ~ file: tasks.service.ts:84 ~ TasksService ~ findAll ~ tasksList:", tasksList);

    const pageMetaDto = new PageMetaDto({ totalRec, pageOptionsDto });

    return new PageDto(tasksList, pageMetaDto);
  }


  async update(id: string, updateTaskDto: UpdateTaskDto) {
    // logic update
    // get nó về, tức là lấy nó về từ database -> cập nhật new data -> lưu lại vào database
    const data = await this.tasksRepository.findOne({
      where: {
        id: id,
      }
    });
    console.log("🚀 ~ file: tasks.service.ts:115 ~ TasksService ~ update ~ data:", data);

    if (!data) {
      return getDataResponse("The Task is not exist", 403, null);
    }

    if (updateTaskDto.title) {
      data.title = updateTaskDto.title;
    };

    if (updateTaskDto.description) {
      data.description = updateTaskDto.description;
    };

    if (updateTaskDto.status) {
      data.status = updateTaskDto.status;
    }

    console.log("🚀 ~ file: tasks.service.ts:115 ~ TasksService ~ update ~ data after:", data);
    await this.tasksRepository.save(data);
    console.log("[UPDATE Success:::]");

    return getDataResponse("Success", 200, data);

  };

  async remove(id: string) {
    const data = await this.tasksRepository.delete(id)
    console.log("🚀 ~ file: tasks.service.ts:113 ~ TasksService ~ remove ~ data:", data);
    if (data.affected === 0) {
      throw new NotFoundException(`Task with ID  "${id}" not found`);
    } else {
      return getDataResponse("Success", 200, null);
    }
    
  }
}
