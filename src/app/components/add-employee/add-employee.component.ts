import { Component, OnInit } from '@angular/core';
import { Employee } from "../../interfaces/Employee";
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  employee: Employee;

  constructor(private empService: EmployeeService,private _Router:Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.employee = {
      firstName: '',
      lastName: '',
      email: '',
      country: '',
      city: '',
      phone: null,
      salary: null

    }
  }


  onsubmit({value,valid}:{value:Employee,valid:boolean}) {
    if (valid) {
      this.empService.addEmployee(value);
      this.toastr.success('Employee Added Successfully!','Employees',{timeOut: 3000});
      this.employee={} as Employee;
      this._Router.navigate(['/'])
      
    }
   
  }

  
}
