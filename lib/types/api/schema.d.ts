import { IGraphqlApi, ISchema, ISchemaConfig } from 'aws-cdk-lib/aws-appsync';
import { DbTable } from '../db/table';
import { SchemaAlpha } from './schema-alpha';
import { SchemaObject, GraphQlTypeList, IntermediateType, IntermediateTypeProps, IntermediateTypes, SchemaFields } from '../types';
import { GraphqlType, BaseTypeOptions, IIntermediateType, Directive, Field, GraphqlTypeOptions } from '@aws-cdk/aws-appsync-alpha';
export declare class AppSyncSchema implements ISchema {
    readonly root: SchemaAlpha;
    protected tables: DbTable[];
    protected graphTypes: string[];
    protected customTypes: string[];
    protected types: IntermediateTypes;
    constructor(types?: GraphQlTypeList);
    bind(api: IGraphqlApi): ISchemaConfig;
    addTable(table: DbTable): DbTable | false;
    getType($type: string | GraphqlType, $options?: GraphqlTypeOptions): GraphqlType;
    getTypes(obj?: SchemaObject): SchemaFields;
    getField(returnType: string, fields?: SchemaObject, $options?: GraphqlTypeOptions, directives?: Directive[]): Field;
    isType(type: string): boolean;
    addType(name: string, props: IntermediateTypeProps): IIntermediateType;
    addInput(name: string, props: IntermediateTypeProps): IIntermediateType;
    getBaseOptions(type: string, $options?: GraphqlTypeOptions): BaseTypeOptions;
    initTypes(types?: GraphQlTypeList): void;
    protected $addType(type: IntermediateType, $name: string, props: SchemaObject | IntermediateTypeProps | (string | IIntermediateType)[]): IIntermediateType;
    private convertTypeName;
}
