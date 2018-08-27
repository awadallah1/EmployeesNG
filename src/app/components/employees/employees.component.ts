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

  employees: Employee[] = [];
  totalEmployees: number = 0
  totalSalaries: number = 0


  constructor(public empService: EmployeeService) {

    empService.empList.snapshotChanges()
      .subscribe(actions => {
        actions.forEach(action => {
          let y = action.payload.toJSON()
          y["$key"] = action.key
          this.employees.push(y as Employee)
        }); this.getTotals();
      })

  }

  ngOnInit() {
    

  }

  getTotals() {
    for (let index = 0; index < this.employees.length; index++) {
      this.totalEmployees += 1;
      this.totalSalaries += parseFloat(this.employees[index].salary.toString());
    }
  }



}
