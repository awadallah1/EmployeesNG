import { Component, OnInit } from '@angular/core';
import { Employee } from "../../interfaces/Employee";
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  employee: Employee = {};
  btnTitle:string='Submit'
  forEdit:boolean=false;

  id: string = this._route.snapshot.queryParams["id"];

  constructor(private _route: ActivatedRoute, private empService: EmployeeService, private _Router: Router, private toastr: ToastrService) { }

  public ngOnInit() {
    if (this.id) {
      this.btnTitle='Edit'
      this.forEdit=true;
      this.empService.getEmployee(this.id).subscribe(action => {

        let employee = action.payload.val() as Employee;

        this.employee.$key = action.key;

        this.employee.firstName = employee.firstName;
        this.employee.lastName = employee.lastName;
        this.employee.email = employee.email;
        this.employee.country = employee.country;
        this.employee.city = employee.city;
        this.employee.phone = employee.phone;
        this.employee.salary = employee.salary;



      })
    } else {
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
  }


  onsubmit({ value, valid }: { value: Employee, valid: boolean }) {
    if (valid) {
      this.empService.addEmployee(value);
      this.toastr.success('Employee Added Successfully!', 'Employees', { timeOut: 3000 });
      this.employee = {} as Employee;
      this._Router.navigate(['/'])

    }
      }

      onEdit(){
        this.empService.updateEmployee(this.employee);
        this.toastr.success('Employee Updated Successfully!!','Employees', { timeOut: 3000 })
        
        this.employee = {} as Employee;
        this._Router.navigate(['/'])
      }


}
