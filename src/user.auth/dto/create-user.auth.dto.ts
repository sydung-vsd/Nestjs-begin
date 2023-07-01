import { IsNotEmpty, IsString, Matches, Min, MinLength } from "class-validator";
import { Column, PrimaryGeneratedColumn } from "typeorm";

export class CreateUserAuthDto {
    @MinLength(8,{message: "username at least 8 characters."})
    @IsNotEmpty({message: "the username is required."})
    @IsString({message: "The username is a string"})
    username: string;

    @MinLength(6,{message: "the password at least 6 characters."})
    @IsNotEmpty({message: "the password is required."})
    @IsString({message: "The password is a string"})
    // @Matches() thêm một regex vào Matches
    password: string;
}
