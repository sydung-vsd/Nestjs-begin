import { Injectable, ConflictException, InternalServerErrorException } from "@nestjs/common";
import { UserAuthEntity } from "./entities/user.auth.entity";
import { DataSource, Repository } from "typeorm";
import { CreateUserAuthDto } from "./dto/create-user.auth.dto";
import * as bcrypt from "bcrypt";
import { getDataResponse } from "src/utils/getDataResponse";

@Injectable()
export class UserAuthRepository extends Repository<UserAuthEntity> {
    constructor (
        private dataSource: DataSource
    ) {
        super(UserAuthEntity, dataSource.createEntityManager())
    }

    async createUserAuth (userSignUp: CreateUserAuthDto) {
        const {username, password} = userSignUp;

        // hash
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        console.log("[UserAuthRepository ~ createUserAuth ~ salt]:", salt);
        console.log("[UserAuthRepository ~ createUserAuth ~ passwordHash]:", passwordHash);

        const user = this.create({username, password: passwordHash});
        console.log("[UserAuthRepository ~ createUserAuth ~ user]:", user);

        const {password: ps, ...userAuth} = user;

        try {
            await this.save(user);
            return getDataResponse("Create user Success", 200, userAuth);
        } catch (error) {
            if (error.code === "23505") {
                // throw new ConflictException("Username already exists.")
                return getDataResponse("Username already exists.", 400, null)
            } else {
                throw new InternalServerErrorException("Eror")
            }
        }
        
    }
}