"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaPrimaryKey = void 0;
const base_1 = require("./base");
class SchemaPrimaryKey extends base_1.BaseKey {
    constructor(partitionKey, sortKey) {
        super();
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
    get keySchema() {
        const res = {
            partitionKey: this.partitionKey.attribute
        };
        if (this.sortKey)
            res.sortKey = this.sortKey.attribute;
        return res;
    }
}
exports.SchemaPrimaryKey = SchemaPrimaryKey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbWFyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9rZXkvcHJpbWFyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxpQ0FBaUM7QUFHakMsTUFBYSxnQkFBaUIsU0FBUSxjQUFPO0lBSXpDLFlBQ0ksWUFBa0MsRUFDbEMsT0FBOEI7UUFFOUIsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ0wsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQTtJQUNqQyxDQUFDO0lBRUQsSUFBSSxLQUFLOztRQUNMLE9BQU8sTUFBQSxJQUFJLENBQUMsT0FBTywwQ0FBRSxJQUFJLENBQUE7SUFDN0IsQ0FBQztJQUVELElBQUksU0FBUztRQUNULE1BQU0sR0FBRyxHQUFrQjtZQUN2QixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTO1NBQzVDLENBQUE7UUFDRCxJQUFJLElBQUksQ0FBQyxPQUFPO1lBQUUsR0FBRyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztRQUN2RCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7Q0FDSjtBQTVCRCw0Q0E0QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBLZXlJbnN0YW5jZSB9IGZyb20gXCIuL2luc3RhbmNlXCJcbmltcG9ydCB7IEJhc2VLZXkgfSBmcm9tIFwiLi9iYXNlXCI7XG5pbXBvcnQgeyBLZXlBdHRyaWJ1dGVzIH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBTY2hlbWFQcmltYXJ5S2V5IGV4dGVuZHMgQmFzZUtleSB7XG4gICAgcGFydGl0aW9uS2V5OiBLZXlJbnN0YW5jZVxuICAgIHNvcnRLZXk/OiBLZXlJbnN0YW5jZVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHBhcnRpdGlvbktleTogc3RyaW5nIHwgS2V5SW5zdGFuY2UsXG4gICAgICAgIHNvcnRLZXk/OiBzdHJpbmcgfCBLZXlJbnN0YW5jZVxuICAgICkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnBhcnRpdGlvbktleSA9IHRoaXMuZ2V0S2V5KHBhcnRpdGlvbktleSk7XG4gICAgICAgIHRoaXMuc29ydEtleSA9IHNvcnRLZXkgPyB0aGlzLmdldEtleShzb3J0S2V5KSA6IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXQgcE5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFydGl0aW9uS2V5Lm5hbWVcbiAgICB9XG5cbiAgICBnZXQgc05hbWUoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc29ydEtleT8ubmFtZVxuICAgIH1cblxuICAgIGdldCBrZXlTY2hlbWEoKTogS2V5QXR0cmlidXRlcyB7XG4gICAgICAgIGNvbnN0IHJlczogS2V5QXR0cmlidXRlcyA9IHtcbiAgICAgICAgICAgIHBhcnRpdGlvbktleTogdGhpcy5wYXJ0aXRpb25LZXkuYXR0cmlidXRlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc29ydEtleSkgcmVzLnNvcnRLZXkgPSB0aGlzLnNvcnRLZXkuYXR0cmlidXRlO1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cbn0iXX0=