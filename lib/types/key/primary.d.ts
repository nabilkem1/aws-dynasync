import { KeyInstance } from "./instance";
import { BaseKey } from "./base";
import { KeyAttributes } from "../types";
export declare class SchemaPrimaryKey extends BaseKey {
    partitionKey: KeyInstance;
    sortKey?: KeyInstance;
    constructor(partitionKey: string | KeyInstance, sortKey?: string | KeyInstance);
    get pName(): string;
    get sName(): string | undefined;
    get keySchema(): KeyAttributes;
}
