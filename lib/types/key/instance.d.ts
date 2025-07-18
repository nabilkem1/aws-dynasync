import { Attribute, AttributeType } from "aws-cdk-lib/aws-dynamodb";
import { SyncType } from "./sync-type";
export declare class KeyInstance {
    readonly name: string;
    readonly keyType: 'partition' | 'sort';
    private $type;
    constructor(fieldName: string | KeyInstance, $type?: string | SyncType, keyType?: 'partition' | 'sort');
    get templateType(): Record<string, string>;
    get objectType(): Record<string, string>;
    get attribute(): Attribute;
    get type(): SyncType;
    convertAttributeName(attr: string): AttributeType;
}
