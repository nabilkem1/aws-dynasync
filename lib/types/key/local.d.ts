import { KeyInstance } from "./instance";
import { BaseIndexKey } from "./index-base";
import { LocalSecondaryIndexProps } from "aws-cdk-lib/aws-dynamodb";
export declare class SchemaLocalIndex extends BaseIndexKey {
    readonly indexName: string;
    sortKey: KeyInstance;
    constructor(indexName: string, sortKey: string | KeyInstance, include?: string[]);
    get sName(): string;
    get props(): LocalSecondaryIndexProps;
}
