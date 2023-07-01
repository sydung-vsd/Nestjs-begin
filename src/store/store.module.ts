import { Module, DynamicModule } from "@nestjs/common";
import { StoreService } from "./store.service";

export interface StoreConfig {
    dirname: string;
    filename: string;
}

@Module({
    // imports: [],
    // providers: [
    //     {
    //         provide: 'STORE_SERVICE',
    //         useClass: StoreService
    //     }
    // ],
    // exports: ['STORE_SERVICE'] // khi đã dùng key để provide thì khi export cũng phải dùng key đó, nếu provide 10 ông mà chỉ export 1 ông thì cũng chỉ dùng được 1 ông    
})
export class StoreModule{
    static register(config: StoreConfig): DynamicModule {
        return {
            module: StoreModule,
            providers: [
                {
                    provide: 'STORE_SERVICE',
                    useClass: StoreService
                },
                {
                    provide: 'STORE_CONFIG',
                    useValue: config  // nếu người dùng gọi đến function register và cung cấp config thì nó sẽ được provider cho "store_service" có thể sử dụng
                }
            ],
            exports : ['STORE_SERVICE'] // vì provider và export ở dưới nên cmt ở trên lại
        }
    }
};