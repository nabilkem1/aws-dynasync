import { BaseTypeOptions, GraphqlTypeOptions } from "@aws-cdk/aws-appsync-alpha";
import { DynamoAttribute } from "../types";
export declare class SyncType implements BaseTypeOptions {
    readonly fieldName: string;
    readonly typeName: string;
    readonly templateType: string;
    readonly graphqlType: string;
    constructor(fieldName: string, graphqlType?: string | SyncType);
    get isList(): boolean;
    get isRequired(): boolean;
    get isRequiredList(): boolean;
    getBaseOptions(options?: GraphqlTypeOptions): BaseTypeOptions;
    toDynamoAttribute(): DynamoAttribute;
    toTypescriptType(): string;
    private toCfnTemplateType;
}
