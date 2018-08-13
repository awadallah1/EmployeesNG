import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from "../../interfaces/Employee"; 


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees:Employee[];
  constructor(public empService:EmployeeService) { }

  ngOnInit() {
this.empService.getEmployees().subscribe(data=>{
  this.employees=data;
  console.log(this.employees);
})
  }

}
