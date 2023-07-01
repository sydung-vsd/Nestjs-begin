import { Inject, Injectable } from "@nestjs/common";
import { UserDto } from "./user.dto";
import { StoreService } from "src/store/store.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    // khi import một module khác và muốn sử dụng nó ở một module khác, thì sau khi import có thể dùng nó ở một file seervice khác
    constructor(
        @Inject("STORE_SERVICE") private  storeService: StoreService,
    ){};


    create(user: any) {
    this.storeService.save(user); // / dùng StoreService ở đây
    console.log("body", user);
    
    user.id = 1;
    user.createAt = new Date();
    user.deleteAt = new Date();
    user.updateAt = new Date();
    const userFinal = UserDto.plainToClass(user);

    console.log("userFinal", userFinal);    

    return userFinal;
    }

    functionTest1(data: string) {
        console.log("[Data]: ", data);
        return data;
    }
}

export class TestService {
    logData(data:string) {
        console.log("[TestService-Data]", data);
        return data;
    }
}