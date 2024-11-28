import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { verifyEmailTemplate } from './templates/email-verification.template';
import { forgotPasswordTemplate } from './templates/forgot-password.template';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Create a transporter using SMTP settings
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

  private generateMailOptions(to: string, subject: string, html: string) {
    return {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    };
  }

  async sendVerificationEmail(email: string, verificationToken: string) {
    // Generate mail options
    try {
      const mailOptions = this.generateMailOptions(
        email,
        'Email Verification',
        verifyEmailTemplate(verificationToken).html,
      );

      // Send the email
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.log(error);
    }
  }

  async sendResetPassword(email: string, resetPassword: string) {
    // Generate mail options
    try {
      const mailOptions = this.generateMailOptions(
        email,
        'Reset Password',
        forgotPasswordTemplate(email, resetPassword).html,
      );
      // console.log(mailOptions);
      // Send the email
      const takeThis = await this.transporter.sendMail(mailOptions);
      return takeThis;
      // console.log()
    } catch (error) {
      console.log(error);
    }
  }
}
