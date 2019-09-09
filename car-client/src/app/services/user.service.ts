import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  username?: string;
  password?: string;
  coopDivisionNumber?: string;
  divisionNumber?: string;
  hqDivisionNumber?: string;
  zoneNumber?: string;
  locationNumber?: string;
  location?: string;
  fullName?: string;
  firstName?: string;
  initials?: string;
  lastName?: string;
  preferredName?: string;
  title?: string;
  jobCode?: string;
  emailAddress?: string;
  kxi?: string;
  remoteIpAddress?: string;
  userAgent?: string;
  roles?: any;
  tokenType?: string;
  tokenValue?: string;
  loginTime?: string;
  lastAccessedDateTime?: string;
  overrideDivisionNumber?: string;
  overrideZoneNumber?: string;
  overrideLocationNumber?: string;
  overrideRoles?: any;
  hash?: string;
  enabled?: string;
  groups?: string;
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  credentialsNonExpired?: boolean;
  divisionCode?: null;
  anonymous?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: BehaviorSubject<User> = new BehaviorSubject({});
  constructor() {}
}
