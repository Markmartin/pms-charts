import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

function validateUserName(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const validate = control.value && control.value.length >= 6;
    return validate ? { userName: { value: control.value } } : null;
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
    userName: ['', [Validators.required, validateUserName()]],
    password: ['', Validators.required],
  });
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  toggleHide() {
    this.hide = !this.hide;
  }

  getErrorMessage() {}

  onSubmit() {
    console.log('提交');
  }
}
