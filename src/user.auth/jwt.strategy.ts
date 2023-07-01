import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserAuthRepository } from "./user.auth.repository";
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'api-key') {
    constructor (
        @InjectRepository(UserAuthRepository)
        private userAuthRepository: UserAuthRepository,
    ) {
        super(
            {
                secretOrKey: 'topSecret51', // secret_key nên được define ở trong file env
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration: false, // default đã là false rồi, thêm vào cho biết có thể cấu hình nó
            },
        )
    }

    async validate (payload: JwtPayload) {
        const {username} = payload;
        const user = await this.userAuthRepository.findOne({
            where: {
                username
            }
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}