import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('patients')
export class Patient {
    @PrimaryGeneratedColumn("uuid") // là một decorator, để đánh dấu 1 field là khóa chính trong một class, "uuid" để chỉ định loại dữ liệu id
    id: number;

    @Column() // là một decorator, để đánh dấu 1 field là một cột trong bảng tương ứng của cơ sở dũ liệu, có thể truyền thêm các property để định nghĩa cho field đó ví dụ ({type: "xác định kiểu dữ liệu của field", nullable: "có cho phép field đó null hay không", default: "set giá trị mặc định của cột khi không cung cấp giá trị", ...})
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    middleName: string;

    @Column()
    age: number;

    // static findByName(firstName: string, lastName: string) {
    //     return this.createQueryBuilder("patients")
    //         .where("user.firstName = :firstName", { firstName })
    //         .andWhere("user.lastName = :lastName", { lastName })
    //         .getMany()
    // }
}
