import { ProjectionType } from "aws-cdk-lib/aws-dynamodb";
import { BaseKey } from "./base";
import { Capacity } from "../types";
export declare class BaseIndexKey extends BaseKey {
    readonly indexName: string;
    protected include?: string[] | undefined;
    readonly list: boolean;
    readonly projectionType?: ProjectionType;
    readonly nonKeyAttributes?: string[];
    readonly readCapacity?: number;
    readonly writeCapacity?: number;
    constructor(indexName: string, include?: string[] | undefined, capacity?: Capacity);
    protected isList(): boolean;
    protected handleProjection($include?: string | string[]): {
        projectionType: ProjectionType;
        nonKeyAttributes?: string[];
    };
}
