import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UsersService } from 'src/users/user.service';

@Injectable()
export class SetReminderService {
  constructor(private userService: UsersService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async emailNotification() {
    console.log('Checking for reminders...');
    try {
      await this.userService.sendReminderNotifications();
      console.log('Reminder Sent...');
    } catch (error) {
      console.error('Error sending email:', error);
    }
    return;
  }
}
