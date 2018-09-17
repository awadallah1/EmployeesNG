import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from "../../interfaces/Employee";
import * as $ from 'jquery';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[] = null;
  totalEmployees: number = 0;
  totalSalaries: number = 0;


  constructor(private empService: EmployeeService) {

    setTimeout(() => {
      this.empService.empList.snapshotChanges()
        .subscribe(actions => {
          this.employees = []
          this.totalEmployees = 0
          this.totalSalaries = 0
          actions.forEach(action => {
            let y = action.payload.toJSON()
            y["$key"] = action.key
            this.employees.push(y as Employee)
            this.totalEmployees += 1;
            this.totalSalaries += parseFloat(y["salary"].toString());
          });

        })
    }, 200);


  }

  ngOnInit() {

  }

  // getTotals() {
  //   for (let index = 0; index < this.employees.length; index++) {
  //     this.totalEmployees += 1;
  //     this.totalSalaries += parseFloat(this.employees[index].salary.toString());
  //   }
  // }



}
