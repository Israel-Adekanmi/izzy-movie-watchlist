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
exports.HistorySchema = exports.History = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let History = class History {
};
exports.History = History;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, required: true }),
    __metadata("design:type", String)
], History.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                id: { type: mongoose_2.Schema.Types.Number, required: true },
                poster_path: { type: mongoose_2.Schema.Types.String, required: true },
                title: { type: mongoose_2.Schema.Types.String, required: true },
                release_date: { type: mongoose_2.Schema.Types.String, required: true },
                popularity: { type: mongoose_2.Schema.Types.Number, required: true },
            },
        ],
        default: [],
    }),
    __metadata("design:type", Array)
], History.prototype, "movies", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [mongoose_2.Schema.Types.String], default: [] }),
    __metadata("design:type", Array)
], History.prototype, "streakDate", void 0);
exports.History = History = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, strict: false })
], History);
exports.HistorySchema = mongoose_1.SchemaFactory.createForClass(History);
//# sourceMappingURL=history.schema.js.map