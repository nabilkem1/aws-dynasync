import { Construct } from 'constructs';
import { AppSyncSchema } from './schema';
import { DbTable } from '../db/table';
import { SchemaTable, GraphQlTypeList, AppsyncApiProps, DynamoTableProps } from '../types';
import { GraphqlApi, ISchema, DynamoDbDataSource, AuthorizationConfig } from 'aws-cdk-lib/aws-appsync';
export interface AppSyncStackProps {
    config: AuthorizationConfig;
    tables: (DbTable | SchemaTable)[];
    schemaTypes?: GraphQlTypeList;
    apiProps?: AppsyncApiProps;
    tableProps?: DynamoTableProps;
}
export declare class AppSyncStack {
    scope: Construct;
    protected id: string;
    private props;
    api: GraphqlApi;
    schema: AppSyncSchema;
    tables: DbTable[];
    data: DynamoDbDataSource[];
    constructor(scope: Construct, id: string, props: AppSyncStackProps);
    get config(): AuthorizationConfig;
    protected getApi(schema: ISchema, authorizationConfig: AuthorizationConfig, apiProps?: AppsyncApiProps): GraphqlApi;
    addTableSchema($table: DbTable): DbTable | false;
    addTableApi(table: DbTable): DbTable;
    validateTable(table: DbTable): void;
}
