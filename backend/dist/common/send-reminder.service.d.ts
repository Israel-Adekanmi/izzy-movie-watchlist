import { UsersService } from 'src/users/user.service';
export declare class SetReminderService {
    private userService;
    constructor(userService: UsersService);
    emailNotification(): Promise<void>;
}
