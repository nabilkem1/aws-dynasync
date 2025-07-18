import { KeyInstance } from "./instance";
import { BaseIndexKey } from "./index-base";
import { GlobalSecondaryIndexProps } from "aws-cdk-lib/aws-dynamodb";
import { Capacity } from "../types";
export declare class SchemaGlobalIndex extends BaseIndexKey {
    protected serialize?: boolean | undefined;
    protected include?: string[] | undefined;
    partitionKey: KeyInstance;
    sortKey?: KeyInstance;
    constructor(indexName: string, partitionKey: string | KeyInstance, sortKey?: string | KeyInstance, serialize?: boolean | undefined, include?: string[] | undefined, capacity?: Capacity);
    get pName(): string;
    get sName(): string | undefined;
    isList(): boolean;
    get props(): GlobalSecondaryIndexProps;
}
