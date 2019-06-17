import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Provider } from '@angular/core';
import { NotificationService } from '../notifications/notification.service';

/** Application-wide error handler that adds a UI notification to the error handling
 * provided by the default Angular ErrorHandler.
 */
@Injectable()
export class AppErrorHandler extends ErrorHandler {
  static provider: Provider = { provide: ErrorHandler, useClass: AppErrorHandler };

  constructor(private notificationsService: NotificationService) {
    super();
  }

  handleError(error: Error | HttpErrorResponse) {
    this.notificationsService.error('An error occurred.');

    super.handleError(error);
  }
}
