export class UserNotification {
    id: number;
    subject: string;
    message: string;
    status: number;
    statusText: string;
    notificationId: number;
    deliveryVehicleName: string;
    dueTime: Date;
    // we currently don't receive these from the payload
    type: string;
    priority: string;
    action: string;
}
