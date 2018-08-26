import { Component, OnInit } from '@angular/core';
import { Employee } from "../../interfaces/Employee";
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { SnotifyService, SnotifyPosition, SnotifyToastConfig, SnotifyToast } from 'ng-snotify';

import { Observable } from 'rxjs';
import * as firebase from 'firebase/app'


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  downloadURL: Observable<string>;
  imageURL: string
  employee: Employee = {};
  btnTitle: string = 'Submit'
  forEdit: boolean = false;
  picFile: File;
  myEvent: any;


  url: string

  id: string = this._route.snapshot.queryParams["id"];
  oldImage: string = null;




  constructor(private snotifyService: SnotifyService, private afStorage: AngularFireStorage, private _route: ActivatedRoute, private empService: EmployeeService, private _Router: Router, private toastr: ToastrService) { }

  public ngOnInit() {

    if (this.id) {
      this.btnTitle = 'Edit'
      this.forEdit = true;
      this.empService.getEmployee(this.id).subscribe(action => {
        let employee = action.payload.val() as Employee;
        if (employee.image != '') {
          this.oldImage = employee.image;
          this.employee.$key = action.key;

          this.employee.firstName = employee.firstName;
          this.employee.lastName = employee.lastName;
          this.employee.email = employee.email;
          this.employee.country = employee.country;
          this.employee.city = employee.city;
          this.employee.phone = employee.phone;
          this.employee.salary = employee.salary;
          this.employee.image = employee.image;


        } else {
          this.oldImage = '';
          this.employee.$key = action.key;

          this.employee.firstName = employee.firstName;
          this.employee.lastName = employee.lastName;
          this.employee.email = employee.email;
          this.employee.country = employee.country;
          this.employee.city = employee.city;
          this.employee.phone = employee.phone;
          this.employee.salary = employee.salary;
          this.employee.image = employee.image;

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

  onAsyncLoading(time: number) {
    const successAction = Observable.create(observer => {
    });
    this.snotifyService.async('', 'Saving Data', successAction, { timeout: time, position: SnotifyPosition.centerCenter, showProgressBar: true });

  }

  onsubmit({ value, valid }: { value: Employee, valid: boolean }) {
    if (valid && !this.forEdit) {
      if (this.myEvent) {
        this.onAsyncLoading(2400);
        const id = Math.random().toString(36).substring(2);
        this.ref = this.afStorage.ref(id);
        this.task = this.ref.put(this.myEvent.target.files[0]);
        this.task.snapshotChanges().pipe(
          finalize(() => {
            this.downloadURL = this.ref.getDownloadURL()
            this.downloadURL.subscribe(url => {

              value.image = url;
              this.empService.addEmployee(value);
              this.employee = {} as Employee;
              this.toastr.success('Employee Added Successfully!', 'Employees', { timeOut: 3000 });
              this._Router.navigate(['/']);

            });
          })
        )
          .subscribe();
      } else {
        this.onAsyncLoading(1000);
        setTimeout(() => {
          value.image = '';
          this.empService.addEmployee(value);
          this.employee = {} as Employee;
          this.toastr.success('Employee Added Successfully!', 'Employees', { timeOut: 3000 });
          this.forEdit=false;
          this._Router.navigate(['/']);
        }, 2000);


      }
    }

    if (valid && this.forEdit) {

      if (!this.myEvent) {
        this.empService.updateEmployee(this.employee);
        this.onAsyncLoading(1000);
      } else {
        this.onAsyncLoading(2000);
        const id = Math.random().toString(36).substring(2);
        this.ref = this.afStorage.ref(id);
        this.task = this.ref.put(this.myEvent.target.files[0]);
        this.task.snapshotChanges().pipe(
          finalize(() => {
            
            this.downloadURL = this.ref.getDownloadURL()
            this.downloadURL.subscribe(url => {
              this.employee.$key = this.id;
              this.employee.firstName = value.firstName;
              this.employee.lastName = value.lastName;
              this.employee.email = value.email;
              this.employee.country = value.country;
              this.employee.city = value.city;
              this.employee.phone = value.phone;
              this.employee.salary = value.salary;
              
              this.employee.image = url;
              
              this.empService.updateEmployeeWithDelete(this.employee, this.oldImage)
              
            });
          })
        ).subscribe();

      }
      
      setTimeout(() => {
        this.toastr.success('Employee Updated Successfully!!', 'Employees', { timeOut: 3000 })
        this.employee = {} as Employee;
        this.forEdit=false;
        this._Router.navigate(['/'])
      }, 3000);

    }
  }

  

  deleteImage() {

    this.empService.deleteImage(this.oldImage)
  }


  ///display image of input file
  onSelectFile(event) { // called each time file input changes

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      // if (!localStorage.getItem('myFile') || localStorage.getItem('myFile') == '')


      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = () => {
        if (!event.target.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
          this.toastr.error('image should be JPG|JPEG|PNG|GIF', 'Employees', { timeOut: 5000 });
          this.url = '';
        }
        else {
          if (event.target.files[0].size > 100000) {
            this.toastr.error('image should be not more than 100kb', 'Employees', { timeOut: 5000 });
            this.url = '';
          } else {
            this.url = reader.result as string;
            this.myEvent = event;
          }
        }


      }
    }
  }

  show() {
    if(!this.oldImage){
      console.log('falseeeeee')
    }
    if(this.oldImage){
      console.log('trueeeeeeeee')
    }
    
    
  }

  delete(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.storage.refFromURL(name).delete();
    console.log('deleteeeeeeeeeeeeeeeeeeeeeeeeeeeed')
  }
}
