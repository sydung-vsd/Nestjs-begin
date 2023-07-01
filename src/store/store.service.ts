import { Injectable, Inject } from "@nestjs/common";
import { StoreConfig } from "./store.module";
import * as fs from "fs";

@Injectable()
export class StoreService {
    constructor(
        @Inject("STORE_CONFIG") private  storeConfig: StoreConfig,
    ){
        if (!fs.existsSync(this.storeConfig.dirname)) {
            fs.mkdirSync(this.storeConfig.dirname);
        }
    };
    save(data: any) {
        console.log("[data]-[storeService]", data);
        fs.appendFileSync(`${this.storeConfig.dirname}/${this.storeConfig.filename}`, JSON.stringify(data));
    }
}