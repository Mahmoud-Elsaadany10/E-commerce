import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegServeService } from '../service/reg-serve.service';
import { strongPasswordValidator } from '../../core/custom/strongPassword';

@Component({
  selector: 'app-singup',
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.css'
})
export class SingupComponent {

  registerForm !: FormGroup;
  passwordVisible = false;

  constructor(private fb: FormBuilder , private Router:Router
    , private _RegisterService :RegServeService
  ) {}

   ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6),strongPasswordValidator]]
    });
  }


  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get address() {
    return this.registerForm.get('address');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get isFormValid() {
    return this.registerForm.valid;
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const registerData = this.registerForm.value;
      console.log('Registration successful', registerData);
      this._RegisterService.signup(registerData).subscribe({
        next:(res)=>{
        this.Router.navigate(['/login'])
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })

    } else {
      console.log('Form is invalid');
    }
  }
}
