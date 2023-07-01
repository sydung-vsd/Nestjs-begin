import { IsNotEmpty, IsString, Length } from "class-validator";
import { Expose, Transform } from "class-transformer";
import { BaseDto } from "src/common/Base.dto";

export class UserDto extends BaseDto {
  @IsNotEmpty()
  @Length(6, 8)
  @IsString({
    message: 'Phải nhập string bạn ơi!'  // nếu không truyền Object chagne message vào thì sẽ tự show message của thư viện
  })
  @Expose()
  userName: string;

  // giả sử body gửi lên có cả firstname  và lastname, nhưng chỉ muốn lấy ra fullname từ 2 field đó thì dùng ( @Transform ):
  firstname: string;

  lastname: string;

  @Expose()
  @Transform(({obj}) => `${obj.firstname} ${obj.lastname}`)
  fullName: string;

  @Length(6, 8)
  @Expose()
  password: string;

  // @Expose()
  // email: string;
}






//!Code không liên quan
//Class Injector để quản lý tất cả các class khác, để khi sử dụng khỏi phải new, chỉ cần tạo một cái mà lấy từ trong đó ra thôi
// trong Nestjs mỗi module có một injector riêng
class UserService {
  hello(): void {
    console.log("hello");
  }
}

class UserRepository {
  test(): void {
    console.log("this is repository");
  }
}

class Injector {
  private _container = new Map();
  constructor(private _providers: any[]=[]) {
    this._providers.forEach(service => this._container.set(service, new service()));
  }

  get(serviceKey: any) {
    const serviceInstance = this._container.get(serviceKey);
    if(!serviceInstance){
      throw Error('No provider not found');
    }

    return serviceInstance;
  }
}

const inject = new Injector([UserService, UserRepository]);
const userService = inject.get(UserService)
userService.hello()