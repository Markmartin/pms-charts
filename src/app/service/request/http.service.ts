import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  CommonResponse,
  FormatResponse,
  CallbackFunc,
  UserInfoReq,
} from '@/service/request/http.interface';

// 请求成功数据处理
function formatResponse(
  response: HttpResponse<CommonResponse>
): FormatResponse {
  const status =
    response.status === 200 && response.body?.code === 200 ? true : false;
  const msg = status
    ? 'success'
    : response.statusText || response.body?.msg || '';
  return {
    status,
    msg,
    data: response.body?.data || null,
  };
}

// 网络请求错误处理
function formatResponseError(error: HttpErrorResponse): FormatResponse {
  const status = false;
  const msg = error.message || error.statusText || '';
  return {
    status,
    msg,
  };
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  apiInstance(
    method: string,
    url: string,
    body?: any,
    params?:
      | HttpParams
      | {
          [param: string]:
            | string
            | number
            | boolean
            | ReadonlyArray<string | number | boolean>;
        }
  ): Observable<FormatResponse> {
    return new Observable((subscriber) => {
      this.http
        .request<CommonResponse>(method, `${environment.baseUrl}${url}`, {
          body,
          params,
          observe: 'response',
        })
        .subscribe(
          (resp: HttpResponse<CommonResponse>) => {
            const response = formatResponse(resp);
            if (!response.status) {
              this.snackBar.open(response.msg, '', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 2000,
              });
            }
            subscriber.next(response);
          },
          (error: HttpErrorResponse) => {
            const response = formatResponseError(error);
            this.snackBar.open(response.msg, '', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 2000,
            });
            subscriber.next(response);
          }
        );
    });
  }

  userApiLogin(userInfoReq: UserInfoReq): Observable<FormatResponse> {
    return this.apiInstance('post', 'com/login', userInfoReq);
  }
}
