import { IGraphqlApi, ISchemaConfig } from "aws-cdk-lib/aws-appsync";
import { Field, IIntermediateType, ObjectType, ResolvableField } from "@aws-cdk/aws-appsync-alpha";
/**
 * Class based on aws-appsync alpha Schema class,
 * deprecated in stable version but needed for
 * building schema in-progress
 */
export declare class SchemaAlpha {
    baseTypes: IIntermediateType[];
    query?: ObjectType;
    mutation?: ObjectType;
    subscription?: ObjectType;
    protected def: string;
    bind(api: IGraphqlApi): ISchemaConfig;
    getDefinition(api: IGraphqlApi): string;
    addToSchema(addition: string, delimiter?: string): void;
    addQuery(fieldName: string, field: ResolvableField): ObjectType;
    addMutation(fieldName: string, field: ResolvableField): ObjectType;
    addSubscription(fieldName: string, field: Field): ObjectType;
    addType(type: IIntermediateType): IIntermediateType;
    declareSchema(): string;
    private shapeAddition;
    private generateInterfaces;
    private generateDirectives;
}
