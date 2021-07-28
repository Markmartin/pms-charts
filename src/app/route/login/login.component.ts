import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import * as _ from 'lodash';

import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from '@/service/request/http.service';
import { GlobalxService } from '@/service/global/globalx.service';
import { Role } from '@/service/request/http.interface';

function validateUserName(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const validate = control.value && control.value.length >= 6;
    const result = validate ? null : { userName: { value: control.value } };
    return result;
  };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  form = this.formBuilder.group({
    userName: [
      'pms_fsaca',
      {
        validators: [Validators.required, validateUserName()],
        updateOn: 'blur',
      },
    ],
    password: [
      'aiways',
      {
        validators: [Validators.required, validateUserName()],
        updateOn: 'blur',
      },
    ],
  });

  throttleSubmit = _.throttle(this.onSubmit, 2000, { trailing: false });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private httpService: HttpService,
    private globalx: GlobalxService
  ) {}

  ngOnInit(): void {
    const metaThemeColor = document.querySelector('meta[name=theme-color]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', '#eeeeee');
    }

    // const token = localStorage.getItem('token');
    // const user = localStorage.getItem('user');
    // if (token && user) {
    //   this.globalx.setUserInfo(JSON.parse(user));
    //   this.router.navigate(['charts']);
    // }
  }

  toggleHide(): void {
    this.hide = !this.hide;
  }

  getErrorMessage(key: string): string {
    return this.form.value[key] === '' ? '不能为空' : '长度不能小于6';
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.snackBar.open('请输入正确的登录信息', '', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 2000,
      });

      return;
    }

    const whiteRoles = [
      'rolePartnerAdmin',
      'rolePartnerManager',
      'rolePartnerHandleVehicle',
      'rolePartnerPlaner',
      'rolePartnerSale',
      'rolePartnerSaleManager',
    ];

    this.httpService.apiUserLogin(this.form.value).subscribe((resp) => {
      if (resp.status) {
        const { roleList } = resp.data.subMap;
        console.log(roleList);
        const permission = roleList.some((role: Role) =>
          whiteRoles.includes(role.roleCode)
        );
        if (!permission) {
          this.snackBar.open('暂无报表的访问权限', '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 2000,
          });
          return;
        }
        localStorage.setItem('token', resp.data.token);
        localStorage.setItem('user', JSON.stringify(resp.data));
        this.globalx.setUserInfo(resp.data);
        this.router.navigate(['charts']);
      }
    });
  }
}
