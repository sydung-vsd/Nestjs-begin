import {} from "class-transformer";
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";

export class CreatePatientDto {

    @IsNotEmpty({ message: "The firstName is required!" })
    @IsString({ message: "The firsName is String!" })
    firstName: string;

    @IsNotEmpty({ message: "The lastName is required!" })
    @IsString({ message: "The lastName is String!" })
    lastName: string;

    middleName: string;

    @IsNumber({},{ message: "The age is a number!" })
    age: number;

    @IsEmail()
    email: string;

    @Matches(/^\$2[ayb]\$[\d]{2}\$[./A-Za-z0-9]{53}$/, {message: "tesst"}) // muoons validate theo regex thì dùng @Matchesaq
    password: string;
}
