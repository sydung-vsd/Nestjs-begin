// muốn tạo một API khi người dùng gọi đến /users thì trả về list users, vì vậy đi đến khái niệm router và quản lý bằng controller
import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { TestService, UserService } from "./user.service";
import { StoreService } from "src/store/store.service";
import { StoreModule } from "src/store/store.module";
import { TypeOrmModule } from "@nestjs/typeorm";

export interface TypeDataUseValue {
  name: string;
  age: number;
}

export const dataUseValue: TypeDataUseValue = {
  name: "Vuz Sy Dung",
  age: 79
}

// @Module là 'decorator' để báo cho NestJS biết, mình đang sử dụng Module
@Module({
  // imports: [StoreModule], // vì ở storeModule return module bằng function, nên khi import không thể import như dòng này
  imports: [
    StoreModule.register({
    dirname: 'store',
    filename: 'user.json'
    }),
],
  controllers: [UserController],
  providers: [
    {
    provide: 'USER_PROVIDER',  // key này để truyền vào get để lấy đúng Service 
    useClass: UserService
    },
    {
      provide: 'TEST_SERVICE',
      useClass: TestService
    },
    {
      provide: 'DATA_USE_VALUE',
      useValue: dataUseValue as TypeDataUseValue
    }
]
})
export class UsersModule {}
