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
  btnTitle: string = 'Submit'
  forEdit: boolean = false;
  picFile: File;

  url: string

  id: string = this._route.snapshot.queryParams["id"];
  oldImage: string;

  constructor(private _route: ActivatedRoute, private empService: EmployeeService, private _Router: Router, private toastr: ToastrService) { }

  public ngOnInit() {

    if (this.id) {
      this.btnTitle = 'Edit'
      this.forEdit = true;
      this.empService.getEmployee(this.id).subscribe(action => {
       
        let employee = action.payload.val() as Employee;
        if (employee.image) { this.oldImage = employee.image; }

        this.employee.$key = action.key;

        this.employee.firstName = employee.firstName;
        this.employee.lastName = employee.lastName;
        this.employee.email = employee.email;
        this.employee.country = employee.country;
        this.employee.city = employee.city;
        this.employee.phone = employee.phone;
        this.employee.salary = employee.salary;
        if (this.empService.imageURL !='') {
        this.employee.image = this.empService.imageURL;
        }else{
          this.employee.image = this.oldImage;
        }





      })
    } else {
      this.employee = {
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        city: '',
        phone: null,
        salary: null,
        image: ''
      }

    }
  }


  onsubmit({ value, valid }: { value: Employee, valid: boolean }) {
    if (valid && !this.id) {
      if (this.empService.imageURL !='') { value.image = this.empService.imageURL; }
      this.empService.addEmployee(value);
      this.toastr.success('Employee Added Successfully!', 'Employees', { timeOut: 3000 });
      this.employee = {} as Employee;
      this._Router.navigate(['/'])

    }
  }

  onEdit() {
    this.employee.image = this.empService.imageURL;

    this.empService.updateEmployee(this.employee);
    
      setTimeout(() => {
        this.empService.deleteImage(this.oldImage);
        console.log('Toooooooot')
      }, 2000);

   


    this.toastr.success('Employee Updated Successfully!!', 'Employees', { timeOut: 3000 })

    this.employee = {} as Employee;
    this._Router.navigate(['/'])
  }

  deleteImage() {

    this.empService.deleteImage(this.oldImage)
  }

  onUpload(event) {
    this.empService.upload(event);
  }
  ///display image of input file
  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = () => {
        if (!event.target.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
          this.toastr.error('image should be JPG|JPEG|PNG|GIF', 'Employees', { timeOut: 5000 });
          this.url = '';
        }
        else {
          this.url = reader.result as string;
        }

      }
    }
  }



}
