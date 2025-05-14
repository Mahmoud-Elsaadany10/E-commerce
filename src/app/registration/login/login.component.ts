import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegServeService } from '../service/reg-serve.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] ,
  imports:[CommonModule , FormsModule ,ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup;
  passwordVisible : boolean = false;
  iClick: boolean=false;
  constructor(private fb: FormBuilder ,
    private _LoginService:RegServeService ,
    private router:Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Getter for email form control
  get email() {
    return this.loginForm.get('email');
  }

  // Getter for password form control
  get password() {
    return this.loginForm.get('password');
  }

  get isFormValid() {
    return this.loginForm.valid;
  }

  get isFormSubmitted() {
    return this.loginForm.touched;
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      console.log('Login successful', loginData);
      this._LoginService.login(loginData).subscribe({
        next:(res)=>{
          this.router.navigate(['/home'])
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('refreshToken', res.data.refreshToken);
          this._LoginService.saveUser()
          console.log(res);
        }
      })
    } else {
      console.log('Form is invalid');
    }
  }

  iconClick(ele: HTMLElement) {
      this.iClick = !this.iClick;
      ele.getAttribute('type') === 'password'
        ? ele.setAttribute('type', 'text')
        : ele.setAttribute('type', 'password');
    }
}
