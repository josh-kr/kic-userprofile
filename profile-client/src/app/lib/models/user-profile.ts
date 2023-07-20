export class UserProfile {
    id?: number;
    username: string;
    firstName?: string;
    lastName?: string;
    mobile?: string;
    provider?: string;
    other?: string;
    avatar?: any;
    receiveMessages = true;
    forwardMessages = false;
    emailAddress?: string;
}
