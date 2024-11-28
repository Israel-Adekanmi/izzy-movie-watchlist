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
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
const email_verification_template_1 = require("./templates/email-verification.template");
const forgot_password_template_1 = require("./templates/forgot-password.template");
let EmailService = class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT),
            secure: process.env.EMAIL_SECURE === 'true',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }
    generateMailOptions(to, subject, html) {
        return {
            from: process.env.EMAIL_USER,
            to,
            subject,
            html,
        };
    }
    async sendVerificationEmail(email, verificationToken) {
        try {
            const mailOptions = this.generateMailOptions(email, 'Email Verification', (0, email_verification_template_1.verifyEmailTemplate)(verificationToken).html);
            await this.transporter.sendMail(mailOptions);
        }
        catch (error) {
            console.log(error);
        }
    }
    async sendResetPassword(email, resetPassword) {
        try {
            const mailOptions = this.generateMailOptions(email, 'Reset Password', (0, forgot_password_template_1.forgotPasswordTemplate)(email, resetPassword).html);
            const takeThis = await this.transporter.sendMail(mailOptions);
            return takeThis;
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EmailService);
//# sourceMappingURL=email.service.js.map