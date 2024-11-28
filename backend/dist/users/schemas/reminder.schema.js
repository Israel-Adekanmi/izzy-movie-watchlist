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
exports.ReminderSchema = exports.Reminder = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Reminder = class Reminder {
};
exports.Reminder = Reminder;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", String)
], Reminder.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.Number, required: true }),
    __metadata("design:type", Number)
], Reminder.prototype, "movieId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.String, required: true }),
    __metadata("design:type", String)
], Reminder.prototype, "movieTitle", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.String, required: true }),
    __metadata("design:type", String)
], Reminder.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.Date, required: true }),
    __metadata("design:type", Date)
], Reminder.prototype, "reminderTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.Boolean, default: false }),
    __metadata("design:type", Boolean)
], Reminder.prototype, "isSent", void 0);
exports.Reminder = Reminder = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Reminder);
exports.ReminderSchema = mongoose_1.SchemaFactory.createForClass(Reminder);
//# sourceMappingURL=reminder.schema.js.map