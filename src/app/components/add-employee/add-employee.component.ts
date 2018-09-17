import { Component, OnInit } from '@angular/core';
import { Employee } from "../../interfaces/Employee";
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { finalize, tap, count } from 'rxjs/operators';
import { SnotifyService, SnotifyPosition, SnotifyToastConfig, SnotifyToast } from 'ng-snotify';
import { FormControl } from '@angular/forms';
import { Observable, observable } from 'rxjs';
import * as firebase from 'firebase/app'
import { Globals } from '../../globals';
import { map, startWith } from 'rxjs/operators';
import { AddressService } from '../../services/address.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  myCountryControl = new FormControl();
  myCityControl = new FormControl();
  countryError: boolean = false;
  cityError: boolean = false;
  error: boolean = false;
  country: string;
  countryCode: string;
  city: string;
  cityObject: {} = {}
  countries = [];
  cities = [];
  filteredCities = [];
  couteriesNames: string[] = [];
  citiesNames: string[] = [];
  countryOptions: Observable<any[]>;
  cityOptions: Observable<any[]>;

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




  constructor(private address: AddressService, private globals: Globals, private snotifyService: SnotifyService, private afStorage: AngularFireStorage, private _route: ActivatedRoute, private empService: EmployeeService, private _Router: Router, private toastr: ToastrService) { }

  _countryFilter(value: string): any[] {
    const filterValue = value.toLowerCase();

    // return this.countries.filter(country => country['name'].toLowerCase().indexOf(filterValue) === 0);
    return this.countries.filter(country => country['name'].toLowerCase().match(filterValue));

  }

  _cityFilter(value: string): any[] {
    const filterValue = value.toLowerCase();

    // return this.filteredCities.filter(city => city['region'].toLowerCase().indexOf(filterValue) === 0);
    return this.filteredCities.filter(city => city['region'].toLowerCase().match(filterValue));
  }



  public ngOnInit() {
    this.getCountries();

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
          this.country = employee.country;
          this.city = employee.city;

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
          this.country = employee.country;
          this.city = employee.city;
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
    this.snotifyService.async('', 'Saving Data', successAction, { position: SnotifyPosition.centerCenter, showProgressBar: true });

  }

  onsubmit({ value, valid }: { value: Employee, valid: boolean }) {
    if (valid && !this.forEdit) {
      value.country = this.country;
      value.city = this.city;
      if (this.myEvent) {
        // this.onAsyncLoading(2400);
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
              this.snotifyService.remove();
              this.toastr.success('Employee Added Successfully!', 'Employees', { timeOut: 2000 });
              this._Router.navigate(['up']);

            });
          })
        )
          .subscribe();
      } else {
        // this.onAsyncLoading(1000);
        setTimeout(() => {
          value.image = '';
          this.empService.addEmployee(value);
          this.employee = {} as Employee;
          this.snotifyService.remove();
          this.toastr.success('Employee Added Successfully!', 'Employees', { timeOut: 2000 });
          this.forEdit = false;
          this._Router.navigate(['up']);
        }, 200);


      }
    }

    if (valid && this.forEdit) {
      if (!this.myEvent) {
        this.employee.country = this.country;
        this.employee.city = this.city;
        this.empService.updateEmployee(this.employee);
        this.onAsyncLoading(1000);
      } else {
        // this.onAsyncLoading(2000);
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
              this.employee.country = this.country;
              this.employee.city = this.city;
              this.employee.phone = value.phone;
              this.employee.salary = value.salary;
              this.employee.image = url;
              this.empService.updateEmployeeWithDelete(this.employee, this.oldImage)

            });
          })
        ).subscribe();

      }
      setTimeout(() => {
        this.toastr.success('Employee Updated Successfully!!', 'Employees', { timeOut: 2000 })
        this.employee = {} as Employee;
        this.snotifyService.remove();
        this.forEdit = false;
        this._Router.navigate(['up'])
      }, 200);

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
    if (!this.oldImage) {
      console.log('falseeeeee')
    }
    if (this.oldImage) {
      console.log('trueeeeeeeee')
    }
  }

  delete(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.storage.refFromURL(name).delete();

  }


  getCountries() {
    // this.address.getCountries().subscribe(
    //   next => { this.countries = next; }
    // )
    this.countries = this.address.getCountries();
    this.cities = this.address.getCities();
    this.countries.forEach(
      row => {
        this.couteriesNames.push(row['name'].toLowerCase());
      }
    )
    this.countryOptions = this.myCountryControl.valueChanges.pipe(
      startWith(''),
      map(value => this._countryFilter(value))

    )



  }
  getFilteredCities() {
    this.cities.forEach(
      row => {
        this.citiesNames.push(row['region'].toLowerCase());
      }
    )

    this.cityOptions = this.myCityControl.valueChanges.pipe(
      startWith(''),
      map(value => this._cityFilter(value))

    )
  }

  /// country change

  checkCountry() {

    if (this.couteriesNames.length && this.country) {
      this.city = '';
      if (this.couteriesNames.indexOf(this.country.toLowerCase()) > -1) {
        this.countryError = false;
        this.error = false;
        var result = this.countries.find(country => country.name.toLowerCase() === this.country.toLowerCase()) as Observable<any>;
        this.filteredCities = this.cities.filter(city => city['country'].toLowerCase() == result['code'].toLowerCase());
        this.getFilteredCities();
      } else {
        this.countryError = true;
        this.error = true;
      }
    } else {
      return false;
    }
  }

  checkCity() {

    if (this.citiesNames.length && this.city) {
      if (this.citiesNames.indexOf(this.city.toLowerCase()) > -1) {
        this.cityError = false;
        this.error = false;
      } else {
        this.cityError = true;
        this.error = true;
      }
    } else {
      return false;
    }
  }

  alert() {
    console.log(this.country)
    console.log(this.city)
    console.log(this.employee)
  }
  // data = [];
  // cities: any[] = [];
  // getData() {
  //   this.address.getCountry().subscribe(
  //     next => {
  //     this.data = next;
  //       this.data.forEach(row => this.address.getCity(row['code']).subscribe(
  //         city => { this.cities.push(city) }
  //       )
  //       )
  //     }
  //   )

  // }



}
