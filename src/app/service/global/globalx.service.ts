import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { UserInfo } from '@/service/http.interface';

@Injectable({
  providedIn: 'root',
})
export class GlobalxService {
  userInfo: UserInfo = {
    userCode: '',
    token: '',
    userId: '',
    accountNo: '',
  };
  // Observable data sources
  private userInfoSubject = new Subject<UserInfo>();
  userInfoObserve$ = this.userInfoSubject.asObservable();

  constructor() {}

  setUserInfo(info: UserInfo): void {
    this.userInfo = { ...info };
  }

  getUserInfo(): UserInfo {
    return this.userInfo;
  }
}
