import { IsNumber, IsOptional, IsString } from "class-validator";

export class GetTaskFilterDto {
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsString()
    page: string;

    @IsString()
    perPage: string;
}