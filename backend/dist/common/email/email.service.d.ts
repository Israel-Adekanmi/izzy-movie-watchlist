export declare class EmailService {
    private transporter;
    constructor();
    private generateMailOptions;
    sendVerificationEmail(email: string, verificationToken: string): Promise<void>;
    sendResetPassword(email: string, resetPassword: string): Promise<any>;
    sendReminder(email: string, movieTitle: string, reminderTime: string): Promise<void>;
}
