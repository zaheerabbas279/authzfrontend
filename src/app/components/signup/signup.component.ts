import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthsrvService } from 'src/app/services/authsrv.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  email: any;
  password: any;
  constructor(private auth: AuthsrvService, private router: Router) { }

  ngOnInit(): void {
  }

  signup() {
    let data = {
      email: this.email,
      password: this.password
    }
    console.log('sign up data', data);
    this.auth.signup(data).subscribe((res: any) => {
      if (res) {
        this.email = "";
        this.password = "";

        console.log('registered successfully!!!');
        alert('Registered Successfully! Please Login')
      }
    })
  }
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
}
