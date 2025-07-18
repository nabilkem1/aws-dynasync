import { Resource } from "aws-cdk-lib";
import { Construct } from "constructs";
import { DynasyncProps } from "./types";
import { DbTable } from "./db/table";
import { AppSyncStack } from "./api";
import { GraphqlApi } from "aws-cdk-lib/aws-appsync";
export declare class Dynasync extends Resource {
    protected scope: Construct;
    protected id: string;
    protected $props: DynasyncProps;
    readonly tables: DbTable[];
    readonly appsync: AppSyncStack;
    protected $config: DynasyncProps;
    static init(scope: Construct, id: string, props?: DynasyncProps): Dynasync;
    /**
     * {@link GraphqlApi} created by Dynasync
     */
    get api(): GraphqlApi;
    constructor(scope: Construct, id: string, $props?: DynasyncProps);
    get props(): DynasyncProps;
    addToSchema(str: string): string;
    private mergeProps;
    private getUserPoolAuthMode;
}
