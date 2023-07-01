import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../tasks-status.enum";

export class CreateTaskDto {
    @IsNotEmpty({message: "The Title is not empty!"})
    @IsString({message: "The Title is a string!"})
    title: string;

    @IsNotEmpty({message: "The Description is not empty!"})
    @IsString({message: "The Description is a string!"})
    @IsOptional()
    description: string;

    // @IsEnum(TaskStatus)
    // status: TaskStatus; // khi tạo task mới thì status luôn là OPEN
} 
