import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from "../../interfaces/Employee";
import { EmployeeService } from '../../services/employee.service';


@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css']
})
export class EmployeeInfoComponent implements OnInit {

  id: string;
  employee: Employee = {}
  constructor(private _EmployeeService: EmployeeService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this._route.snapshot.params['id']
    this._EmployeeService.getEmployee(this.id).subscribe(action => {

      let employee = action.payload.val() as Employee;

      this.employee.$key = action.key;
      if (employee) {
        this.employee.firstName = employee.firstName;
        this.employee.lastName = employee.lastName;
        this.employee.email = employee.email;
        this.employee.country = employee.country;
        this.employee.city = employee.city;
        this.employee.phone = employee.phone;
        this.employee.salary = employee.salary;
        if (employee.image) { this.employee.image = employee.image; }
        else { this.employee.image = '' }
      }
    })


  }

  show() {
    console.log(this.employee)
  }

}
