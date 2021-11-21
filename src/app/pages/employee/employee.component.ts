import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  currentUser: number = 0;
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const local: any = sessionStorage.getItem('currentUser');
    this.userService.getUser(local).subscribe((res) => {
      this.users = res;
      console.info(this.users);
    });
  }

  logout(): void {
    sessionStorage.removeItem('currentItem');
    this.router.navigate(['/']);
  }
}
