import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  public user = new User();
  confirmPassword?: string;
  myForm!: FormGroup;
  err : any ;


  constructor(private formBuilder: FormBuilder ,
              private authService : AuthService , private router : Router) { }
  
  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }
  onRegister() {
    this.authService.registerUser(this.user).subscribe(
    {
      next: (res) => {
        alert("veillez confirmer votre email");
        this.router.navigate(["/login"]);
        // this.router.navigate(["/verifEmail",this.user.email]);
      },
      error: (err: any) => 
      {
        if (err.status = 400) 
          { this.err = err.error.message;}
      }
    }
    )
  }

}