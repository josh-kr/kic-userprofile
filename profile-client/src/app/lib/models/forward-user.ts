export class ForwardUser {
    id?: number;
    profileId: number;
    emailAddress: string;
    forwardMessages = true;
    forwardMessagesAnytime = true;
    customStartDateTime: Date;
    customEndDateTime: Date;
    forwardUserId: number;
    firstName: string;
    lastName: string;
}
