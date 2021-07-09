import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from '@/service/http.service';
import { GlobalxService } from '@/service/global/globalx.service';

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
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private httpService: HttpService,
    private globalx: GlobalxService
  ) {}

  ngOnInit(): void {}

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

    this.httpService.userApiLogin((resp) => {
      if (resp.status) {
        this.globalx.setUserInfo(resp.data);
        this.router.navigate(['charts']);
      }
    });
  }
}
