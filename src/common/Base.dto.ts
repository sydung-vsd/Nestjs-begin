import { Expose, plainToInstance, plainToClass } from "class-transformer";

export abstract class BaseDto {
  @Expose()
  id: number;

  @Expose()
  createAt: Date;

  @Expose()
  updateAt: Date;

  @Expose()
  deleteAt: Date;

  static plainToClass<T>(this: new (...arg: any[]) => T, obj: T) {
    return plainToInstance(this, obj, {excludeExtraneousValues: true}); // excludeExtraneousValues để xác định trả về các field đã expose
    // return plainToClass(this, obj, {excludeExtraneousValues: true}); // dùng cái này cũng đc
  }
}
