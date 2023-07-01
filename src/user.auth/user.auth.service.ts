import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { CreateUserAuthDto } from './dto/create-user.auth.dto';
import { UpdateUserAuthDto } from './dto/update-user.auth.dto';
import { UserAuthRepository } from './user.auth.repository';
import { UserAuthEntity } from './entities/user.auth.entity';
import { getDataResponse } from 'src/utils/getDataResponse';

@Injectable()
export class UserAuthService {
  constructor (
    private userAuthRepository: UserAuthRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(userSignUp: CreateUserAuthDto) {
    try {
      return this.userAuthRepository.createUserAuth(userSignUp);      
    } catch (error) {
      console.log("[UserAuthService ~ signUp ~ error]:", error);
      return getDataResponse(error.message, 400, null);
    }
  }

  async signin(userSignIn: CreateUserAuthDto) {
    const {username, password} = userSignIn;

    const user: UserAuthEntity | null = await this.userAuthRepository.findOne({
      where: {
        username: username
      }
    })
    console.log("[UserAuthService ~ signin ~ user]:", user);
    const isCheckPass = await bcrypt.compare(password, user?.password || "");
    
    if (user && isCheckPass) {
      console.log("Login Success");
      const payload = { username };
      const accessToken = this.jwtService.sign(payload);
      console.log("🚀 ~ file: user.auth.service.ts:42 ~ UserAuthService ~ signin ~ accessToken:", accessToken);
      const {password: ps, ...userLoin} = user;
      return getDataResponse("Login success", 200, {userLoin, accessToken})
    } else {
      throw new UnauthorizedException("Please check your login credentials")
    }
  } 
}
