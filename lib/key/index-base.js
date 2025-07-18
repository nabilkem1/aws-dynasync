"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseIndexKey = void 0;
const aws_dynamodb_1 = require("aws-cdk-lib/aws-dynamodb");
const base_1 = require("./base");
class BaseIndexKey extends base_1.BaseKey {
    constructor(indexName, include, capacity) {
        super();
        this.indexName = indexName;
        this.include = include;
        const props = (include === null || include === void 0 ? void 0 : include.length) ? this.handleProjection(include) : undefined;
        this.projectionType = props === null || props === void 0 ? void 0 : props.projectionType;
        this.nonKeyAttributes = props === null || props === void 0 ? void 0 : props.nonKeyAttributes;
        this.list = this.isList();
        this.readCapacity = capacity === null || capacity === void 0 ? void 0 : capacity.read;
        this.writeCapacity = capacity === null || capacity === void 0 ? void 0 : capacity.write;
    }
    isList() {
        return false;
    }
    handleProjection($include = []) {
        const include = Array.isArray($include) ? $include : [$include];
        if (include && include.length) {
            if (include.some(a => /keys?.?only/i.test(a))) {
                return {
                    projectionType: aws_dynamodb_1.ProjectionType.KEYS_ONLY,
                };
            }
            return {
                projectionType: aws_dynamodb_1.ProjectionType.INCLUDE,
                nonKeyAttributes: include
            };
        }
        return {
            projectionType: aws_dynamodb_1.ProjectionType.ALL
        };
    }
}
exports.BaseIndexKey = BaseIndexKey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgtYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9rZXkvaW5kZXgtYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyREFBMEQ7QUFDMUQsaUNBQWlDO0FBR2pDLE1BQWEsWUFBYSxTQUFRLGNBQU87SUFPckMsWUFDb0IsU0FBaUIsRUFDdkIsT0FBa0IsRUFDNUIsUUFBbUI7UUFHbkIsS0FBSyxFQUFFLENBQUM7UUFMUSxjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQ3ZCLFlBQU8sR0FBUCxPQUFPLENBQVc7UUFLNUIsTUFBTSxLQUFLLEdBQUcsQ0FBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUMzRSxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxjQUFjLENBQUM7UUFDNUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxnQkFBZ0IsQ0FBQztRQUNoRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxJQUFJLENBQUM7UUFDbkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsS0FBSyxDQUFDO0lBQ3pDLENBQUM7SUFFUyxNQUFNO1FBQ1osT0FBTyxLQUFLLENBQUE7SUFDaEIsQ0FBQztJQUVTLGdCQUFnQixDQUFDLFdBQTZCLEVBQUU7UUFJdEQsTUFBTSxPQUFPLEdBQWEsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFFLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDM0IsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUMzQyxPQUFPO29CQUNILGNBQWMsRUFBRSw2QkFBYyxDQUFDLFNBQVM7aUJBQzNDLENBQUE7YUFDSjtZQUNELE9BQU87Z0JBQ0gsY0FBYyxFQUFFLDZCQUFjLENBQUMsT0FBTztnQkFDdEMsZ0JBQWdCLEVBQUMsT0FBTzthQUMzQixDQUFBO1NBQ0o7UUFDRCxPQUFPO1lBQ0gsY0FBYyxFQUFFLDZCQUFjLENBQUMsR0FBRztTQUNyQyxDQUFBO0lBQ0wsQ0FBQztDQUNKO0FBOUNELG9DQThDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb2plY3Rpb25UeXBlIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1keW5hbW9kYlwiO1xuaW1wb3J0IHsgQmFzZUtleSB9IGZyb20gXCIuL2Jhc2VcIjtcbmltcG9ydCB7IENhcGFjaXR5IH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBCYXNlSW5kZXhLZXkgZXh0ZW5kcyBCYXNlS2V5IHtcbiAgICBwdWJsaWMgcmVhZG9ubHkgbGlzdDpib29sZWFuXG4gICAgcHVibGljIHJlYWRvbmx5IHByb2plY3Rpb25UeXBlPzogUHJvamVjdGlvblR5cGVcbiAgICBwdWJsaWMgcmVhZG9ubHkgbm9uS2V5QXR0cmlidXRlcz86IHN0cmluZ1tdXG4gICAgcHVibGljIHJlYWRvbmx5IHJlYWRDYXBhY2l0eT86IG51bWJlclxuICAgIHB1YmxpYyByZWFkb25seSB3cml0ZUNhcGFjaXR5PzogbnVtYmVyXG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIHJlYWRvbmx5IGluZGV4TmFtZTogc3RyaW5nLFxuICAgICAgICBwcm90ZWN0ZWQgaW5jbHVkZT86IHN0cmluZ1tdLFxuICAgICAgICBjYXBhY2l0eT86IENhcGFjaXR5XG5cbiAgICApIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgY29uc3QgcHJvcHMgPSBpbmNsdWRlPy5sZW5ndGggPyB0aGlzLmhhbmRsZVByb2plY3Rpb24oaW5jbHVkZSkgOiB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMucHJvamVjdGlvblR5cGUgPSBwcm9wcz8ucHJvamVjdGlvblR5cGU7XG4gICAgICAgIHRoaXMubm9uS2V5QXR0cmlidXRlcyA9IHByb3BzPy5ub25LZXlBdHRyaWJ1dGVzO1xuICAgICAgICB0aGlzLmxpc3QgPSB0aGlzLmlzTGlzdCgpO1xuICAgICAgICB0aGlzLnJlYWRDYXBhY2l0eSA9IGNhcGFjaXR5Py5yZWFkO1xuICAgICAgICB0aGlzLndyaXRlQ2FwYWNpdHkgPSBjYXBhY2l0eT8ud3JpdGU7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGlzTGlzdCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGhhbmRsZVByb2plY3Rpb24oJGluY2x1ZGU6c3RyaW5nIHwgc3RyaW5nW10gPSBbXSk6IHtcbiAgICAgICAgcHJvamVjdGlvblR5cGU6UHJvamVjdGlvblR5cGVcbiAgICAgICAgbm9uS2V5QXR0cmlidXRlcz86c3RyaW5nW11cbiAgICB9IHtcbiAgICAgICAgY29uc3QgaW5jbHVkZTogc3RyaW5nW10gPSBBcnJheS5pc0FycmF5KCRpbmNsdWRlKSA/ICRpbmNsdWRlIDogWyRpbmNsdWRlXTsgXG4gICAgICAgIGlmIChpbmNsdWRlICYmIGluY2x1ZGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaW5jbHVkZS5zb21lKGEgPT4gL2tleXM/Lj9vbmx5L2kudGVzdChhKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBcbiAgICAgICAgICAgICAgICAgICAgcHJvamVjdGlvblR5cGU6IFByb2plY3Rpb25UeXBlLktFWVNfT05MWSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHByb2plY3Rpb25UeXBlOiBQcm9qZWN0aW9uVHlwZS5JTkNMVURFLFxuICAgICAgICAgICAgICAgIG5vbktleUF0dHJpYnV0ZXM6aW5jbHVkZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwcm9qZWN0aW9uVHlwZTogUHJvamVjdGlvblR5cGUuQUxMXG4gICAgICAgIH1cbiAgICB9XG59Il19