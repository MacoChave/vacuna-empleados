import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/shared/models/employee.model';
import { EmployeeService } from 'src/app/shared/services/employee.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  updateMode: boolean = false;

  employee: Employee = {
    first_name: '',
    last_name: '',
    dni: 0,
    email: '',
    born_date: '',
    address: '',
    phone_number: 0,
    estado: '',
    id: 0,
  };

  employeeId: any;

  employeeData = new FormGroup({
    first_name: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]+'),
    ]),
    last_name: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]+'),
    ]),
    dni: new FormControl(0, [
      Validators.required,
      Validators.pattern('[0-9]{10}'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    born_date: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phone_number: new FormControl(0, [
      Validators.required,
      Validators.pattern('[0-9]+'),
    ]),
  });

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeId = sessionStorage.getItem('currentUser');
    this.employeeService
      .getEmployee(this.employeeId)
      .subscribe((res: Employee[]) => {
        this.employee = res[0];
        this.employeeData.setValue(this.employee);
      });
  }

  updateData(): void {
    this.updateMode = !this.updateMode;
  }

  updateEmployee(): void {
    this.updateMode = !this.updateMode;
    this.employeeService
      .getEmployeeByDni(this.employeeData.value.dni)
      .subscribe((res: Employee[]) => {
        if (res.length === 1) {
          this.employeeService
            .patchEmployee(this.employeeId, this.employeeData.value)
            .subscribe((res) => console.log(res));
        } else {
          alert('DNI no es único');
        }
      });
  }
}
