import { Assign, DynamoDbDataSource, GraphqlApi, MappingTemplate, PrimaryKey } from 'aws-cdk-lib/aws-appsync';
import { Construct } from "constructs";
import { DbTable } from "./table";
import { AppSyncSchema } from '../api/schema';
export declare class DbApi {
    scope: Construct;
    id: string;
    api: GraphqlApi;
    schema: AppSyncSchema;
    table: DbTable;
    dataSource: DynamoDbDataSource;
    constructor(scope: Construct, id: string, api: GraphqlApi, schema: AppSyncSchema, table: DbTable);
    primaryTemplate(primaryKey: PrimaryKey, operation?: string): MappingTemplate;
    getPrimaryKey(partition: string, sort?: string, auto?: "partition" | "sort"): PrimaryKey;
    assign(name: string, auto?: boolean): Assign;
}
