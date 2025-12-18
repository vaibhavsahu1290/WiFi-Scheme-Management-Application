import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  errorMsg:string="";
  constructor(private readonly auth:AuthService, private readonly fb:FormBuilder, private readonly router:Router) { }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      email:["",[Validators.required, Validators.email]],
      password:["",[Validators.required, Validators.minLength(6)]]
    });
  }
  onSubmit():void{
    if(!this.loginForm.valid){
      this.errorMsg="Please fill out the form correctly";
      return;
    }

    this.auth.login(this.loginForm.value).subscribe({
      next:(user)=>{
        localStorage.setItem('loginDTO',JSON.stringify(user));
        console.log("inside login component");

        this.auth.setLoginDetails(user.userRole,user.userId);

        if(user.userRole==='Admin'){
          this.router.navigate(['/admin/home']);
        }
        else{
          this.router.navigate(['/user/home']);
        }
      },
      error:()=>{
        this.errorMsg="Invalid email or Password";
      }
    });

  }

}
