import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  userData = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login(): void {
    this.authService
      .login({
        username: this.userData.get('username')?.value,
        password: this.userData.get('password')?.value,
      })
      .subscribe((res: User[]) => {
        if (res.length === 0) console.error('User is not correct');
        else {
          if (res[0].rol === 'admin') {
            sessionStorage.setItem('currentUser', JSON.stringify(res[0]));
            this.router.navigate(['administrator']);
          } else {
            sessionStorage.setItem('currentUser', JSON.stringify(res[0]));
            this.router.navigate(['employee']);
          }
        }
      });
  }
}
