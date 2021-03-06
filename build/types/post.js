"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostResponse = exports.postInputType = void 0;
const graphql_upload_1 = require("graphql-upload");
const type_graphql_1 = require("type-graphql");
const error_1 = require("./error");
const Post_1 = require("../entities/Post");
let postInputType = class postInputType {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], postInputType.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], postInputType.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(() => graphql_upload_1.GraphQLUpload),
    __metadata("design:type", Object)
], postInputType.prototype, "image", void 0);
postInputType = __decorate([
    type_graphql_1.InputType()
], postInputType);
exports.postInputType = postInputType;
let PostResponse = class PostResponse {
};
__decorate([
    type_graphql_1.Field(() => [error_1.ErrorField], { nullable: true }),
    __metadata("design:type", Array)
], PostResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(() => Post_1.Post, { nullable: true }),
    __metadata("design:type", Post_1.Post)
], PostResponse.prototype, "post", void 0);
PostResponse = __decorate([
    type_graphql_1.ObjectType()
], PostResponse);
exports.PostResponse = PostResponse;
//# sourceMappingURL=post.js.map