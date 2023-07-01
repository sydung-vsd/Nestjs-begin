import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserAuthService } from './user.auth.service';
import { CreateUserAuthDto } from './dto/create-user.auth.dto';
import { UpdateUserAuthDto } from './dto/update-user.auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user-auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post("/signup")
  create(@Body() createUserAuthDto: CreateUserAuthDto) {
    return this.userAuthService.signUp(createUserAuthDto);
  }

  @Post("/signin")
  signin(@Body() userSignIn: CreateUserAuthDto) {
    return this.userAuthService.signin(userSignIn);
  }

  @Get("/test")
  @UseGuards(AuthGuard())
  test() {
    console.log("hhhh");
  }

  @Post("/test")
  @UseGuards(AuthGuard())
  test1(@Req() req:any) {
    console.log("🚀 ~ file: user.auth.controller.ts:30 ~ UserAuthController ~ test ~ req:", req);
    
  }
}
