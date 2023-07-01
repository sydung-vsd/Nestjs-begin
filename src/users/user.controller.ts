// trước khi vào controller xử lý thì phải validate và transfom (chuyển đổi dữ liệu)
import {
  Param,
  Body,
  Controller,
  Post,
  Get,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  Inject
} from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { UserDto } from "./user.dto";
import { TestService, UserService } from "./user.service";
import { ModuleRef } from "@nestjs/core";
import { TypeDataUseValue } from "./user.module";
import { StoreService } from "src/store/store.service";

// @Controller là một 'decrator' để báo cho NestJS biết, mình đang dùng Controller
// Controller quản lý path của API
// Get Users
// Add Users
// Update Users
// Delete Users

//prefix trong controller
// @Body
// @Parmam
// Khi dùng ValidationPipe phải import 2 package sau
// class-transformer
// class-validator

// Để validate thì phài đánh @ ở bên file Dto
@Controller("users")
export class UserController {
  // POST gửi body, GET gửi param
  // nhận vào user có type laf UserDto và trả về user cũng có type như vậy
  //note: NestJs có hỗ trợ validate param gửi lên, ví dụ id phải là số (1346549856) mà gửi lên chuỗi ("abcd"), thì sẽ trả về lỗi 400. Để làm việc này vào Docs -> OverView -> Pipes -> ParseIntPipe

  // /----1
  // có 2 cách để lấy service từ container:
  // constructor(private moduleRef: ModuleRef) {}
  // /----1

  // /----2
  constructor(
    @Inject("USER_PROVIDER") private readonly UserService: UserService,
    @Inject("TEST_SERVICE") private TestService: TestService, // cách dùng nhiều service 
    @Inject("DATA_USE_VALUE") private dataUseValue: TypeDataUseValue,
    ) {};
  // /----2
  
  
  // @UsePipes(new ValidationPipe()) // cái này nó sẽ chỉ validate cho POST
  @Post()
  createUser(@Body() user: UserDto): UserDto {
    // /----1
    // dùng với cách 1 nếu lấy service từ container
    // const userService = this.moduleRef.get("USER_PROVIDER");
    // const testService = this.moduleRef.get("TEST_SERVICE");
    // const userFinal = userService.create(user);
    // const dataTestService = testService.logData("[DATA-TEST_SERVICE]");
    // /----1

    // /----2
    const userFinal = this.UserService.create(user);
    const dataTesst = this.UserService.functionTest1("Vu Sy Dung");
    const dataTestService = this.TestService.logData("[DATA-TEST_SERVICE]");
    console.log("[DATA_USE_VALUE]", this.dataUseValue.name);
    // /----2

    return userFinal;
  }

  @Get(":id")
  // id trong Param là tên trường gửi đi trong param
  getUserList(@Param("id", ParseIntPipe) id: number): any {
    console.log(`id::: ${id}`);
    return {
      data: {
        userName: "sdung",
        password: "1234"
      }
    };
  }
}
// Phải đưa UserController vào UserModule (bỏ vào option 'controllers')
