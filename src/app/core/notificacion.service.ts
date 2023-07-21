import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor(private notification: NzNotificationService) { }

  success(title: string, message: string) {
    this.notification.success(title, message, { nzPlacement: 'bottomLeft' });
  }

  error(title: string, message: string) {
    this.notification.error(title, message, { nzPlacement: 'bottomLeft' });
  }

  warning(title: string, message: string) {
    this.notification.warning(title, message, { nzPlacement: 'bottomLeft' });
  }

  info(title: string, message: string) {
    this.notification.info(title, message, { nzPlacement: 'bottomLeft' });
  }
}
