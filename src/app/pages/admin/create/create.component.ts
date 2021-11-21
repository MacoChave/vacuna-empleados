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
      Validators.pattern('[a-zA-Z]+'),
    ]),
    last_name: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z]+'),
    ]),
  });

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  createUser(): void {}
}
