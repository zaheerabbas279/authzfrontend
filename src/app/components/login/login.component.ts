import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthsrvService } from 'src/app/services/authsrv.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showSignup: boolean = false;
  showClickToSignup: boolean = true;
  email: any;
  password: any;

  constructor(private authSrv: AuthsrvService, private router: Router) { }

  ngOnInit(): void {
    if (this.authSrv.isLoggedIn()) {
      this.router.navigate(["dashboard"])
    }
  }

  login() {
    let data = {
      email: this.email,
      password: this.password
    }

    this.authSrv.login(data).subscribe((res: any) => {
      if (res) {
        this.authSrv.setToken(res.accessToken);
        this.authSrv.setRefreshToken(res.refreshToken);
        this.router.navigate(['/dashboard']);
        console.log('Logged In Successfully');
      }
      else {
        console.log('Login Failed');
      }
    })

  }

  showSignupFun() {
    this.showClickToSignup = false;
    this.showSignup = true;
  }

  hideSignup() {
    this.showSignup = false;
    this.showClickToSignup = true;
  }
}
