import {} from "class-transformer";
import { IsEnum } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientDto } from './create-patient.dto';
import { PatientStatus } from "../patient.model";

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
    @IsEnum(PatientStatus)
    status: PatientStatus // khi defined status là một enum, thì khi gửi đi value không thuộc enum sẽ báo lỗi, để ăn validate phải validate cho nó @IsEnum()

    id: number
}
