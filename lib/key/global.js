"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaGlobalIndex = void 0;
const index_base_1 = require("./index-base");
class SchemaGlobalIndex extends index_base_1.BaseIndexKey {
    constructor(indexName, partitionKey, sortKey, serialize, include, capacity) {
        super(indexName, include, capacity);
        this.serialize = serialize;
        this.include = include;
        this.partitionKey = this.getKey(partitionKey);
        this.sortKey = sortKey ? this.getKey(sortKey) : undefined;
    }
    get pName() {
        return this.partitionKey.name;
    }
    get sName() {
        var _a;
        return (_a = this.sortKey) === null || _a === void 0 ? void 0 : _a.name;
    }
    isList() {
        return this.serialize || !this.sortKey;
    }
    get props() {
        return {
            indexName: this.indexName,
            partitionKey: this.partitionKey.attribute,
            sortKey: this.sortKey ? this.sortKey.attribute : undefined,
            projectionType: this.projectionType,
            nonKeyAttributes: this.nonKeyAttributes,
            readCapacity: this.readCapacity,
            writeCapacity: this.writeCapacity
        };
    }
}
exports.SchemaGlobalIndex = SchemaGlobalIndex;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2tleS9nbG9iYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsNkNBQTRDO0FBSTVDLE1BQWEsaUJBQWtCLFNBQVEseUJBQVk7SUFHL0MsWUFDSSxTQUFpQixFQUNqQixZQUFrQyxFQUNsQyxPQUE4QixFQUNwQixTQUFtQixFQUNuQixPQUFrQixFQUM1QixRQUFtQjtRQUduQixLQUFLLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUwxQixjQUFTLEdBQVQsU0FBUyxDQUFVO1FBQ25CLFlBQU8sR0FBUCxPQUFPLENBQVc7UUFLNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDOUQsQ0FBQztJQUVELElBQUksS0FBSztRQUNMLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUE7SUFDakMsQ0FBQztJQUVELElBQUksS0FBSzs7UUFDTCxPQUFPLE1BQUEsSUFBSSxDQUFDLE9BQU8sMENBQUUsSUFBSSxDQUFBO0lBQzdCLENBQUM7SUFFRCxNQUFNO1FBQ0YsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUMzQyxDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ0wsT0FBTztZQUNILFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTO1lBQ3pDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUztZQUMxRCxjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWM7WUFDbkMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtZQUN2QyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7WUFDL0IsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhO1NBQ3BDLENBQUE7SUFDTCxDQUFDO0NBQ0o7QUF4Q0QsOENBd0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgS2V5SW5zdGFuY2UgfSBmcm9tIFwiLi9pbnN0YW5jZVwiO1xuaW1wb3J0IHsgQmFzZUluZGV4S2V5IH0gZnJvbSBcIi4vaW5kZXgtYmFzZVwiO1xuaW1wb3J0IHsgR2xvYmFsU2Vjb25kYXJ5SW5kZXhQcm9wcyB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtZHluYW1vZGJcIjtcbmltcG9ydCB7IENhcGFjaXR5IH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBTY2hlbWFHbG9iYWxJbmRleCBleHRlbmRzIEJhc2VJbmRleEtleSB7XG4gICAgcGFydGl0aW9uS2V5OiBLZXlJbnN0YW5jZVxuICAgIHNvcnRLZXk/OiBLZXlJbnN0YW5jZVxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBpbmRleE5hbWU6IHN0cmluZyxcbiAgICAgICAgcGFydGl0aW9uS2V5OiBzdHJpbmcgfCBLZXlJbnN0YW5jZSxcbiAgICAgICAgc29ydEtleT86IHN0cmluZyB8IEtleUluc3RhbmNlLFxuICAgICAgICBwcm90ZWN0ZWQgc2VyaWFsaXplPzogYm9vbGVhbixcbiAgICAgICAgcHJvdGVjdGVkIGluY2x1ZGU/OiBzdHJpbmdbXSxcbiAgICAgICAgY2FwYWNpdHk/OiBDYXBhY2l0eVxuXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKGluZGV4TmFtZSwgaW5jbHVkZSwgY2FwYWNpdHkpO1xuICAgICAgICB0aGlzLnBhcnRpdGlvbktleSA9IHRoaXMuZ2V0S2V5KHBhcnRpdGlvbktleSk7XG4gICAgICAgIHRoaXMuc29ydEtleSA9IHNvcnRLZXkgPyB0aGlzLmdldEtleShzb3J0S2V5KSA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXQgcE5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFydGl0aW9uS2V5Lm5hbWVcbiAgICB9XG5cbiAgICBnZXQgc05hbWUoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc29ydEtleT8ubmFtZVxuICAgIH1cblxuICAgIGlzTGlzdCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VyaWFsaXplIHx8ICF0aGlzLnNvcnRLZXk7XG4gICAgfVxuXG4gICAgZ2V0IHByb3BzKCk6IEdsb2JhbFNlY29uZGFyeUluZGV4UHJvcHMge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW5kZXhOYW1lOiB0aGlzLmluZGV4TmFtZSxcbiAgICAgICAgICAgIHBhcnRpdGlvbktleTogdGhpcy5wYXJ0aXRpb25LZXkuYXR0cmlidXRlLFxuICAgICAgICAgICAgc29ydEtleTogdGhpcy5zb3J0S2V5ID8gdGhpcy5zb3J0S2V5LmF0dHJpYnV0ZSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHByb2plY3Rpb25UeXBlOiB0aGlzLnByb2plY3Rpb25UeXBlLFxuICAgICAgICAgICAgbm9uS2V5QXR0cmlidXRlczogdGhpcy5ub25LZXlBdHRyaWJ1dGVzLFxuICAgICAgICAgICAgcmVhZENhcGFjaXR5OiB0aGlzLnJlYWRDYXBhY2l0eSxcbiAgICAgICAgICAgIHdyaXRlQ2FwYWNpdHk6IHRoaXMud3JpdGVDYXBhY2l0eVxuICAgICAgICB9XG4gICAgfVxufSJdfQ==