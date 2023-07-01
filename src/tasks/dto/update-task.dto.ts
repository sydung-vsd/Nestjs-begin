import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @IsString()
    @IsOptional()
    status: string;
} // dùng "PartialType" sẽ làm cho kiểu dữ liệu mới có tất cả các thuộc tính của dữ liệu gốc và các thuộc tính này trở thành "Optional" đỗi với dữ liệu mới, dù nó là "Required" ở dữ liệu gốc, từ đó có thể thêm các thuộc tính mới cho kiểu dữ liệu mới.
