"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dynasync = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const fs_1 = require("fs");
const path_1 = require("path");
const api_1 = require("./api");
const aws_appsync_1 = require("aws-cdk-lib/aws-appsync");
const aws_cognito_1 = require("aws-cdk-lib/aws-cognito");
class Dynasync extends aws_cdk_lib_1.Resource {
    static init(scope, id, props) {
        return new Dynasync(scope, id, props);
    }
    /**
     * {@link GraphqlApi} created by Dynasync
     */
    get api() {
        return this.appsync.api;
    }
    constructor(scope, id, $props = {
        tables: [],
        types: {}
    }) {
        var _a, _b, _c;
        super(scope, id, $props);
        this.scope = scope;
        this.id = id;
        this.$props = $props;
        this.$config = {
            tables: [],
            types: {}
        };
        if ($props.configFile) {
            if (!(0, fs_1.existsSync)($props.configFile))
                throw new Error(`Config file ${$props.configFile} does not exist`);
            if (!/json/.test((0, path_1.extname)($props.configFile)))
                throw new Error(`File at ${$props.configFile} is not JSON file`);
        }
        const configFilePath = $props.configFile || (0, path_1.join)(process.cwd(), 'dynasync.json');
        if ((0, fs_1.existsSync)(configFilePath)) {
            this.$config = JSON.parse((0, fs_1.readFileSync)(configFilePath).toString());
        }
        const properties = this.props;
        if (!((_a = properties.tables) === null || _a === void 0 ? void 0 : _a.length)) {
            throw new Error("No tables provided. Cannot build API and Database without tables. Please configure parameters or provide 'dynasync.json' config file");
        }
        let defaultAuthorization;
        if (properties.userPool || !((_b = properties.auth) === null || _b === void 0 ? void 0 : _b.length)) {
            defaultAuthorization = this.getUserPoolAuthMode(properties);
        }
        else {
            defaultAuthorization = (properties.auth || []).shift();
        }
        let additionalAuthorizationModes = ((_c = properties.auth) === null || _c === void 0 ? void 0 : _c.length) ?
            properties.auth : undefined;
        const config = {
            defaultAuthorization,
            additionalAuthorizationModes
        };
        if (properties.deleteTablesWithStack) {
            if (!properties.tableProps)
                properties.tableProps = {};
            properties.tableProps.removalPolicy = aws_cdk_lib_1.RemovalPolicy.DESTROY;
        }
        this.appsync = new api_1.AppSyncStack(scope, `${id}AppSyncStack`, {
            config,
            tables: properties.tables || [],
            schemaTypes: properties.types || {},
            apiProps: properties.apiProps,
            tableProps: properties.tableProps
        });
        this.tables = this.appsync.tables;
    }
    get props() {
        return this.mergeProps(this.$config, this.$props);
    }
    addToSchema(str) {
        if (!this.appsync)
            throw new Error('Cannot add to schema until after Schema is created');
        this.appsync.schema.root.addToSchema(str);
        return this.appsync.schema.root.getDefinition(this.appsync.api);
    }
    mergeProps(config, props) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return {
            ...config,
            ...props,
            tables: [
                ...(config.tables || []),
                ...(props.tables || []),
            ],
            types: {
                enums: {
                    ...(((_a = config.types) === null || _a === void 0 ? void 0 : _a.enums) || {}),
                    ...(((_b = props.types) === null || _b === void 0 ? void 0 : _b.enums) || {})
                },
                unions: {
                    ...(((_c = config.types) === null || _c === void 0 ? void 0 : _c.unions) || {}),
                    ...(((_d = props.types) === null || _d === void 0 ? void 0 : _d.unions) || {})
                },
                types: {
                    ...(((_e = config.types) === null || _e === void 0 ? void 0 : _e.types) || {}),
                    ...(((_f = props.types) === null || _f === void 0 ? void 0 : _f.types) || {})
                },
                interfaces: {
                    ...(((_g = config.types) === null || _g === void 0 ? void 0 : _g.interfaces) || {}),
                    ...(((_h = props.types) === null || _h === void 0 ? void 0 : _h.interfaces) || {})
                },
                inputs: {
                    ...(((_j = config.types) === null || _j === void 0 ? void 0 : _j.inputs) || {}),
                    ...(((_k = props.types) === null || _k === void 0 ? void 0 : _k.inputs) || {})
                }
            }
        };
    }
    getUserPoolAuthMode(properties) {
        return {
            authorizationType: aws_appsync_1.AuthorizationType.USER_POOL,
            userPoolConfig: {
                userPool: properties.userPool || new aws_cognito_1.UserPool(this.scope, `${this.id}UserPool`),
                appIdClientRegex: properties.userPoolRegex,
                defaultAction: properties.userPoolDeny ? aws_appsync_1.UserPoolDefaultAction.DENY : aws_appsync_1.UserPoolDefaultAction.ALLOW
            }
        };
    }
}
exports.Dynasync = Dynasync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQXNEO0FBR3RELDJCQUErQztBQUMvQywrQkFBcUM7QUFFckMsK0JBQXFDO0FBQ3JDLHlEQUF1STtBQUN2SSx5REFBbUQ7QUFFbkQsTUFBYSxRQUFTLFNBQVEsc0JBQVE7SUFRM0IsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFlLEVBQUUsRUFBVSxFQUFFLEtBQW9CO1FBQ2hFLE9BQU8sSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFDLEVBQUUsRUFBQyxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLEdBQUc7UUFDSCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO0lBQzVCLENBQUM7SUFFRCxZQUNjLEtBQWdCLEVBQ2hCLEVBQVUsRUFDVixTQUF3QjtRQUM5QixNQUFNLEVBQUMsRUFBRTtRQUNULEtBQUssRUFBRSxFQUFFO0tBQ1o7O1FBRUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFQZixVQUFLLEdBQUwsS0FBSyxDQUFXO1FBQ2hCLE9BQUUsR0FBRixFQUFFLENBQVE7UUFDVixXQUFNLEdBQU4sTUFBTSxDQUdmO1FBdEJLLFlBQU8sR0FBa0I7WUFDL0IsTUFBTSxFQUFDLEVBQUU7WUFDVCxLQUFLLEVBQUUsRUFBRTtTQUNaLENBQUE7UUFzQkcsSUFBSSxNQUFNLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxJQUFBLGVBQVUsRUFBQyxNQUFNLENBQUMsVUFBVSxDQUFDO2dCQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxNQUFNLENBQUMsVUFBVSxpQkFBaUIsQ0FBQyxDQUFDO1lBQ3ZHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUEsY0FBTyxFQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFBRyxNQUFNLElBQUksS0FBSyxDQUFDLFdBQVcsTUFBTSxDQUFDLFVBQVUsbUJBQW1CLENBQUMsQ0FBQztTQUNuSDtRQUNELE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxVQUFVLElBQUksSUFBQSxXQUFJLEVBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ2pGLElBQUksSUFBQSxlQUFVLEVBQUMsY0FBYyxDQUFDLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUEsaUJBQVksRUFBQyxjQUFjLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQ3RFO1FBQ0QsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsQ0FBQSxNQUFBLFVBQVUsQ0FBQyxNQUFNLDBDQUFFLE1BQU0sQ0FBQSxFQUFFO1lBQzVCLE1BQU0sSUFBSSxLQUFLLENBQUMsc0lBQXNJLENBQUMsQ0FBQztTQUMzSjtRQUNELElBQUksb0JBQW1ELENBQUM7UUFDeEQsSUFBSSxVQUFVLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQSxNQUFBLFVBQVUsQ0FBQyxJQUFJLDBDQUFFLE1BQU0sQ0FBQSxFQUFFO1lBQ2pELG9CQUFvQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUMvRDthQUFNO1lBQ0gsb0JBQW9CLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQzFEO1FBQ0QsSUFBSSw0QkFBNEIsR0FBb0MsQ0FBQSxNQUFBLFVBQVUsQ0FBQyxJQUFJLDBDQUFFLE1BQU0sRUFBQyxDQUFDO1lBQ3pGLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNoQyxNQUFNLE1BQU0sR0FBd0I7WUFDaEMsb0JBQW9CO1lBQ3BCLDRCQUE0QjtTQUMvQixDQUFBO1FBQ0QsSUFBSSxVQUFVLENBQUMscUJBQXFCLEVBQUU7WUFDbEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVO2dCQUFFLFVBQVUsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1lBQ3ZELFVBQVUsQ0FBQyxVQUFVLENBQUMsYUFBYSxHQUFHLDJCQUFhLENBQUMsT0FBTyxDQUFDO1NBQy9EO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGtCQUFZLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUU7WUFDeEQsTUFBTTtZQUNOLE1BQU0sRUFBRSxVQUFVLENBQUMsTUFBTSxJQUFJLEVBQUU7WUFDL0IsV0FBVyxFQUFFLFVBQVUsQ0FBQyxLQUFLLElBQUksRUFBRTtZQUNuQyxRQUFRLEVBQUUsVUFBVSxDQUFDLFFBQVE7WUFDN0IsVUFBVSxFQUFFLFVBQVUsQ0FBQyxVQUFVO1NBQ3BDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFDdEMsQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsV0FBVyxDQUFDLEdBQVU7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxvREFBb0QsQ0FBQyxDQUFDO1FBQ3pGLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVPLFVBQVUsQ0FBQyxNQUFxQixFQUFFLEtBQW9COztRQUMxRCxPQUFPO1lBQ0gsR0FBRyxNQUFNO1lBQ1QsR0FBRyxLQUFLO1lBQ1IsTUFBTSxFQUFFO2dCQUNKLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztnQkFDeEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO2FBQzFCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILEtBQUssRUFBRTtvQkFDSCxHQUFHLENBQUMsQ0FBQSxNQUFBLE1BQU0sQ0FBQyxLQUFLLDBDQUFFLEtBQUssS0FBSSxFQUFFLENBQUM7b0JBQzlCLEdBQUcsQ0FBQyxDQUFBLE1BQUEsS0FBSyxDQUFDLEtBQUssMENBQUUsS0FBSyxLQUFJLEVBQUUsQ0FBQztpQkFDaEM7Z0JBQ0QsTUFBTSxFQUFFO29CQUNKLEdBQUcsQ0FBQyxDQUFBLE1BQUEsTUFBTSxDQUFDLEtBQUssMENBQUUsTUFBTSxLQUFJLEVBQUUsQ0FBQztvQkFDL0IsR0FBRyxDQUFDLENBQUEsTUFBQSxLQUFLLENBQUMsS0FBSywwQ0FBRSxNQUFNLEtBQUksRUFBRSxDQUFDO2lCQUNqQztnQkFDRCxLQUFLLEVBQUU7b0JBQ0gsR0FBRyxDQUFDLENBQUEsTUFBQSxNQUFNLENBQUMsS0FBSywwQ0FBRSxLQUFLLEtBQUksRUFBRSxDQUFDO29CQUM5QixHQUFHLENBQUMsQ0FBQSxNQUFBLEtBQUssQ0FBQyxLQUFLLDBDQUFFLEtBQUssS0FBSSxFQUFFLENBQUM7aUJBQ2hDO2dCQUNELFVBQVUsRUFBRTtvQkFDUixHQUFHLENBQUMsQ0FBQSxNQUFBLE1BQU0sQ0FBQyxLQUFLLDBDQUFFLFVBQVUsS0FBSSxFQUFFLENBQUM7b0JBQ25DLEdBQUcsQ0FBQyxDQUFBLE1BQUEsS0FBSyxDQUFDLEtBQUssMENBQUUsVUFBVSxLQUFJLEVBQUUsQ0FBQztpQkFDckM7Z0JBQ0QsTUFBTSxFQUFFO29CQUNKLEdBQUcsQ0FBQyxDQUFBLE1BQUEsTUFBTSxDQUFDLEtBQUssMENBQUUsTUFBTSxLQUFJLEVBQUUsQ0FBQztvQkFDL0IsR0FBRyxDQUFDLENBQUEsTUFBQSxLQUFLLENBQUMsS0FBSywwQ0FBRSxNQUFNLEtBQUksRUFBRSxDQUFDO2lCQUNqQzthQUNKO1NBQ0osQ0FBQTtJQUNMLENBQUM7SUFFTyxtQkFBbUIsQ0FBQyxVQUF5QjtRQUNqRCxPQUFPO1lBQ0gsaUJBQWlCLEVBQUUsK0JBQWlCLENBQUMsU0FBUztZQUM5QyxjQUFjLEVBQUU7Z0JBQ1osUUFBUSxFQUFFLFVBQVUsQ0FBQyxRQUFRLElBQUksSUFBSSxzQkFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxVQUFVLENBQUM7Z0JBQy9FLGdCQUFnQixFQUFFLFVBQVUsQ0FBQyxhQUFhO2dCQUMxQyxhQUFhLEVBQUUsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsbUNBQXFCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxtQ0FBcUIsQ0FBQyxLQUFLO2FBQ3BHO1NBQ0osQ0FBQTtJQUNMLENBQUM7Q0FDSjtBQXZIRCw0QkF1SEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZW1vdmFsUG9saWN5LCBSZXNvdXJjZSB9IGZyb20gXCJhd3MtY2RrLWxpYlwiO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSBcImNvbnN0cnVjdHNcIjtcbmltcG9ydCB7IER5bmFzeW5jUHJvcHMgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgcmVhZEZpbGVTeW5jLCBleGlzdHNTeW5jICB9IGZyb20gJ2ZzJztcbmltcG9ydCB7IGV4dG5hbWUsIGpvaW4gfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgRGJUYWJsZSB9IGZyb20gXCIuL2RiL3RhYmxlXCI7XG5pbXBvcnQgeyBBcHBTeW5jU3RhY2sgfSBmcm9tIFwiLi9hcGlcIjtcbmltcG9ydCB7IEF1dGhvcml6YXRpb25Db25maWcsIEF1dGhvcml6YXRpb25Nb2RlLCBBdXRob3JpemF0aW9uVHlwZSwgR3JhcGhxbEFwaSwgVXNlclBvb2xEZWZhdWx0QWN0aW9uIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1hcHBzeW5jXCI7XG5pbXBvcnQgeyBVc2VyUG9vbCB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtY29nbml0b1wiO1xuXG5leHBvcnQgY2xhc3MgRHluYXN5bmMgZXh0ZW5kcyBSZXNvdXJjZSB7XG4gICAgcHVibGljIHJlYWRvbmx5IHRhYmxlczogRGJUYWJsZVtdO1xuICAgIHB1YmxpYyByZWFkb25seSBhcHBzeW5jOiBBcHBTeW5jU3RhY2s7XG4gICAgcHJvdGVjdGVkICRjb25maWc6IER5bmFzeW5jUHJvcHMgPSB7XG4gICAgICAgIHRhYmxlczpbXSxcbiAgICAgICAgdHlwZXM6IHt9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBpbml0KHNjb3BlOkNvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OkR5bmFzeW5jUHJvcHMpOiBEeW5hc3luYyB7XG4gICAgICAgIHJldHVybiBuZXcgRHluYXN5bmMoc2NvcGUsaWQscHJvcHMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHtAbGluayBHcmFwaHFsQXBpfSBjcmVhdGVkIGJ5IER5bmFzeW5jXG4gICAgICovXG4gICAgZ2V0IGFwaSgpOiBHcmFwaHFsQXBpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwc3luYy5hcGk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBzY29wZTogQ29uc3RydWN0LFxuICAgICAgICBwcm90ZWN0ZWQgaWQ6IHN0cmluZyxcbiAgICAgICAgcHJvdGVjdGVkICRwcm9wczogRHluYXN5bmNQcm9wcyA9IHtcbiAgICAgICAgICAgIHRhYmxlczpbXSxcbiAgICAgICAgICAgIHR5cGVzOiB7fVxuICAgICAgICB9XG4gICAgKSB7XG4gICAgICAgIHN1cGVyKHNjb3BlLCBpZCwgJHByb3BzKTtcbiAgICAgICAgaWYgKCRwcm9wcy5jb25maWdGaWxlKSB7XG4gICAgICAgICAgICBpZiAoIWV4aXN0c1N5bmMoJHByb3BzLmNvbmZpZ0ZpbGUpKSB0aHJvdyBuZXcgRXJyb3IoYENvbmZpZyBmaWxlICR7JHByb3BzLmNvbmZpZ0ZpbGV9IGRvZXMgbm90IGV4aXN0YCk7XG4gICAgICAgICAgICBpZiAoIS9qc29uLy50ZXN0KGV4dG5hbWUoJHByb3BzLmNvbmZpZ0ZpbGUpKSkgIHRocm93IG5ldyBFcnJvcihgRmlsZSBhdCAkeyRwcm9wcy5jb25maWdGaWxlfSBpcyBub3QgSlNPTiBmaWxlYCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29uZmlnRmlsZVBhdGggPSAkcHJvcHMuY29uZmlnRmlsZSB8fCBqb2luKHByb2Nlc3MuY3dkKCksICdkeW5hc3luYy5qc29uJyk7XG4gICAgICAgIGlmIChleGlzdHNTeW5jKGNvbmZpZ0ZpbGVQYXRoKSkge1xuICAgICAgICAgICAgdGhpcy4kY29uZmlnID0gSlNPTi5wYXJzZShyZWFkRmlsZVN5bmMoY29uZmlnRmlsZVBhdGgpLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSB0aGlzLnByb3BzO1xuICAgICAgICBpZiAoIXByb3BlcnRpZXMudGFibGVzPy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHRhYmxlcyBwcm92aWRlZC4gQ2Fubm90IGJ1aWxkIEFQSSBhbmQgRGF0YWJhc2Ugd2l0aG91dCB0YWJsZXMuIFBsZWFzZSBjb25maWd1cmUgcGFyYW1ldGVycyBvciBwcm92aWRlICdkeW5hc3luYy5qc29uJyBjb25maWcgZmlsZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGVmYXVsdEF1dGhvcml6YXRpb246IEF1dGhvcml6YXRpb25Nb2RlIHwgdW5kZWZpbmVkO1xuICAgICAgICBpZiAocHJvcGVydGllcy51c2VyUG9vbCB8fCAhcHJvcGVydGllcy5hdXRoPy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRlZmF1bHRBdXRob3JpemF0aW9uID0gdGhpcy5nZXRVc2VyUG9vbEF1dGhNb2RlKHByb3BlcnRpZXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVmYXVsdEF1dGhvcml6YXRpb24gPSAocHJvcGVydGllcy5hdXRoIHx8IFtdKS5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBhZGRpdGlvbmFsQXV0aG9yaXphdGlvbk1vZGVzOiBBdXRob3JpemF0aW9uTW9kZVtdIHwgdW5kZWZpbmVkID0gcHJvcGVydGllcy5hdXRoPy5sZW5ndGggP1xuICAgICAgICAgICAgcHJvcGVydGllcy5hdXRoIDogdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBjb25maWc6IEF1dGhvcml6YXRpb25Db25maWcgPSB7XG4gICAgICAgICAgICBkZWZhdWx0QXV0aG9yaXphdGlvbixcbiAgICAgICAgICAgIGFkZGl0aW9uYWxBdXRob3JpemF0aW9uTW9kZXNcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcGVydGllcy5kZWxldGVUYWJsZXNXaXRoU3RhY2spIHtcbiAgICAgICAgICAgIGlmICghcHJvcGVydGllcy50YWJsZVByb3BzKSBwcm9wZXJ0aWVzLnRhYmxlUHJvcHMgPSB7fTtcbiAgICAgICAgICAgIHByb3BlcnRpZXMudGFibGVQcm9wcy5yZW1vdmFsUG9saWN5ID0gUmVtb3ZhbFBvbGljeS5ERVNUUk9ZO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXBwc3luYyA9IG5ldyBBcHBTeW5jU3RhY2soc2NvcGUsIGAke2lkfUFwcFN5bmNTdGFja2AsIHtcbiAgICAgICAgICAgIGNvbmZpZyxcbiAgICAgICAgICAgIHRhYmxlczogcHJvcGVydGllcy50YWJsZXMgfHwgW10sXG4gICAgICAgICAgICBzY2hlbWFUeXBlczogcHJvcGVydGllcy50eXBlcyB8fCB7fSxcbiAgICAgICAgICAgIGFwaVByb3BzOiBwcm9wZXJ0aWVzLmFwaVByb3BzLFxuICAgICAgICAgICAgdGFibGVQcm9wczogcHJvcGVydGllcy50YWJsZVByb3BzXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnRhYmxlcyA9IHRoaXMuYXBwc3luYy50YWJsZXM7XG4gICAgfVxuXG4gICAgZ2V0IHByb3BzKCk6IER5bmFzeW5jUHJvcHMge1xuICAgICAgICByZXR1cm4gdGhpcy5tZXJnZVByb3BzKHRoaXMuJGNvbmZpZywgdGhpcy4kcHJvcHMpO1xuICAgIH1cblxuICAgIGFkZFRvU2NoZW1hKHN0cjpzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIXRoaXMuYXBwc3luYykgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgYWRkIHRvIHNjaGVtYSB1bnRpbCBhZnRlciBTY2hlbWEgaXMgY3JlYXRlZCcpO1xuICAgICAgICB0aGlzLmFwcHN5bmMuc2NoZW1hLnJvb3QuYWRkVG9TY2hlbWEoc3RyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwc3luYy5zY2hlbWEucm9vdC5nZXREZWZpbml0aW9uKHRoaXMuYXBwc3luYy5hcGkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbWVyZ2VQcm9wcyhjb25maWc6IER5bmFzeW5jUHJvcHMsIHByb3BzOiBEeW5hc3luY1Byb3BzKTogRHluYXN5bmNQcm9wcyB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5jb25maWcsXG4gICAgICAgICAgICAuLi5wcm9wcyxcbiAgICAgICAgICAgIHRhYmxlczogW1xuICAgICAgICAgICAgICAgIC4uLihjb25maWcudGFibGVzIHx8IFtdKSxcbiAgICAgICAgICAgICAgICAuLi4ocHJvcHMudGFibGVzIHx8IFtdKSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB0eXBlczoge1xuICAgICAgICAgICAgICAgIGVudW1zOiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLihjb25maWcudHlwZXM/LmVudW1zIHx8IHt9KSxcbiAgICAgICAgICAgICAgICAgICAgLi4uKHByb3BzLnR5cGVzPy5lbnVtcyB8fCB7fSlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHVuaW9uczoge1xuICAgICAgICAgICAgICAgICAgICAuLi4oY29uZmlnLnR5cGVzPy51bmlvbnMgfHwge30pLFxuICAgICAgICAgICAgICAgICAgICAuLi4ocHJvcHMudHlwZXM/LnVuaW9ucyB8fCB7fSlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHR5cGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLihjb25maWcudHlwZXM/LnR5cGVzIHx8IHt9KSxcbiAgICAgICAgICAgICAgICAgICAgLi4uKHByb3BzLnR5cGVzPy50eXBlcyB8fCB7fSlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGludGVyZmFjZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgLi4uKGNvbmZpZy50eXBlcz8uaW50ZXJmYWNlcyB8fCB7fSksXG4gICAgICAgICAgICAgICAgICAgIC4uLihwcm9wcy50eXBlcz8uaW50ZXJmYWNlcyB8fCB7fSlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGlucHV0czoge1xuICAgICAgICAgICAgICAgICAgICAuLi4oY29uZmlnLnR5cGVzPy5pbnB1dHMgfHwge30pLFxuICAgICAgICAgICAgICAgICAgICAuLi4ocHJvcHMudHlwZXM/LmlucHV0cyB8fCB7fSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFVzZXJQb29sQXV0aE1vZGUocHJvcGVydGllczogRHluYXN5bmNQcm9wcyk6IEF1dGhvcml6YXRpb25Nb2RlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGF1dGhvcml6YXRpb25UeXBlOiBBdXRob3JpemF0aW9uVHlwZS5VU0VSX1BPT0wsXG4gICAgICAgICAgICB1c2VyUG9vbENvbmZpZzoge1xuICAgICAgICAgICAgICAgIHVzZXJQb29sOiBwcm9wZXJ0aWVzLnVzZXJQb29sIHx8IG5ldyBVc2VyUG9vbCh0aGlzLnNjb3BlLCBgJHt0aGlzLmlkfVVzZXJQb29sYCksXG4gICAgICAgICAgICAgICAgYXBwSWRDbGllbnRSZWdleDogcHJvcGVydGllcy51c2VyUG9vbFJlZ2V4LFxuICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHByb3BlcnRpZXMudXNlclBvb2xEZW55ID8gVXNlclBvb2xEZWZhdWx0QWN0aW9uLkRFTlkgOiBVc2VyUG9vbERlZmF1bHRBY3Rpb24uQUxMT1dcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==