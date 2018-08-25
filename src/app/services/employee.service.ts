import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
// import {AngularFireDatabase, FirebaseListObservable,FirebaseObjectObservable } from "angularfire2/database-deprecated";
import { Observable } from 'rxjs';
//Angular Fire store  Uploading Files
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Employee } from "../interfaces/Employee";
import { finalize } from 'rxjs/operators';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  empList: AngularFireList<any>

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  downloadURL: Observable<string>;
  imageURL: string


  constructor(private afStorage: AngularFireStorage, private db: AngularFireDatabase) {
    // this.employees = db.list('employees').valueChanges() as Observable<Employee[]>
    this.empList = db.list('employees')

  }
  ///// Get Employees 
  getEmployees() {
    return this.empList;
  }
  getEmployee(id) {

    return this.db.object('employees/' + id).snapshotChanges();

  }

  addEmployee(emp: Employee) {
    
    this.empList.push(emp);
  }
  updateEmployee(employee: Employee) {
    this.empList.update(employee.$key,
      {
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        country: employee.country,
        city: employee.city,
        phone: employee.phone,
        salary: employee.salary,
        image:employee.image
      });
  }

  deleteEmployee(id) {
    this.empList.remove(id);
  }


  upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL()
        this.downloadURL.subscribe(url => {
          this.imageURL='';
          this.imageURL = url;
        });
               
      })
    )
      .subscribe();
  }

  deleteImage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.storage.refFromURL(name).delete();
    console.log('deleteeeeeeeeeeeeeeeeeeeeeeeeeeeed')
  }


}
