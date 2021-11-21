import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  userData = new FormGroup({
    first_name: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]+'),
    ]),
    last_name: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]+'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    dni: new FormControl(0, Validators.pattern('[0-9]{10}')),
  });

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  createUser(): void {
    this.employeeService
      .getEmployeeByDni(this.userData.value.dni)
      .subscribe((resDni) => {
        if (resDni.length === 0) {
          this.employeeService
            .postEmployee(this.userData.value)
            .subscribe((resEmp) => {
              console.log('Employee created succesfully');
            });
          let genUser: string = this.userData.value.first_name;
          genUser = genUser.replace(' ', '');
          let genPass = Math.random().toString(36).slice(-8);
          this.authService
            .createUser({
              username: genUser,
              password: genPass,
            })
            .subscribe((resAuth) => console.log('Created user'));
        }
      });
  }
}
