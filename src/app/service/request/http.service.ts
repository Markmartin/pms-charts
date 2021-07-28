import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
  UserInfoReq,
} from '@/service/request/http.interface';

// import { GlobalxService } from '@/service/global/globalx.service';

// 请求成功数据处理
function formatResponse(
  response: HttpResponse<CommonResponse>
): FormatResponse {
  const status =
    response.status === 200 && response.body?.code === 200 ? true : false;
  const msg = status
    ? 'success'
    : response.body?.msg || response.statusText || '';
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

const unauthorized = [401, 1000];

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  baseUrl = environment.baseUrl;
  constructor(
    private http: HttpClient,
    private router: Router,
    // private globalxService: GlobalxService,
    private snackBar: MatSnackBar
  ) {}

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
              // 返回登录页面
              if (unauthorized.includes(resp.body?.code || 200)) {
                localStorage.clear();
                this.router.navigate(['login']);
              }
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

  // 用户登录
  apiUserLogin(userInfoReq: UserInfoReq): Observable<FormatResponse> {
    return this.apiInstance('post', 'com/login', userInfoReq);
  }

  // 查询地区集合
  apiAreaSet(): Observable<FormatResponse> {
    return this.apiInstance('get', 'admin/area/listByVo', null, {
      type: 1,
      pcode: '0',
    });
  }

  // 销售日报可视化数据
  apiSalesChart(
    selectDate: string,
    dateType: string,
    area: string
  ): Observable<FormatResponse> {
    return this.apiInstance(
      'get',
      'admin/salesReport/reportSaleJournal',
      null,
      { selectDate, dateType, area }
    );
  }

  // 试驾排名可视化数据
  apiDriveChart(
    selectDate: string,
    dateType: string,
    area: string
  ): Observable<FormatResponse> {
    return this.apiInstance(
      'get',
      'admin/salesReport/reportStoreTestDriveRanking',
      null,
      { selectDate, dateType, area }
    );
  }

  // 线索跟进可视化数据
  apiClueFollowChart(
    selectDate: string,
    area: string
  ): Observable<FormatResponse> {
    return this.apiInstance(
      'get',
      'admin/salesReport/reportClueFollowing',
      null,
      { selectDate, area }
    );
  }

  // 线索分发可视化数据
  apiClueDistributionChart(selectDate: string): Observable<FormatResponse> {
    return this.apiInstance(
      'get',
      'admin/salesReport/reportClueDestribute',
      null,
      { selectDate }
    );
  }
}
