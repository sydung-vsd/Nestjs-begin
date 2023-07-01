import { IsEmail, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { PatientStatus } from "../patient.model";
import { Type } from "class-transformer";

class SearchDto {
    @IsOptional()
    @IsString({message: "name param is a string!"})
    name?: string;

    @IsOptional()
    @IsEmail({},{message: "email is invalid!"})
    email?: string;

    @IsOptional()
    // @IsNumber({},{message: "age is a number!"})
    age?: string // chỗ này không biết làm cách nào để truyền param age là một number
}

export class GetPatientFilterDto {
    @IsOptional()
    @IsEnum(PatientStatus)
    status?: PatientStatus;

    @IsOptional()
    @ValidateNested() // khi param lồng nhau, phải dùng ValidateNested để validate 
    @Type(()=>SearchDto) // cú pháp này phải có khi validate cho các param lồng nhau
    search?: SearchDto;
}