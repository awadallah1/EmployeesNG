import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
// import {AngularFireDatabase, FirebaseListObservable,FirebaseObjectObservable } from "angularfire2/database-deprecated";
import { Observable } from 'rxjs';
//Angular Fire store  Uploading Files
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Employee } from "../interfaces/Employee";
import * as firebase from 'firebase/app'


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
        image: employee.image
      })
  }

  ///update with delete Image

  updateEmployeeWithDelete(employee: Employee, name: string) {
    this.empList.set(employee.$key,
      {
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        country: employee.country,
        city: employee.city,
        phone: employee.phone,
        salary: employee.salary,
        image: employee.image
      }).then(() => {
        if (name) {
          this.deleteImage(name);
        }
      });
  }

  deleteEmployee(id, name) {
    this.empList.remove(id)
    if (name) {
      this.deleteImage(name);
    }
  }

  public deleteImage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.storage.refFromURL(name).delete();
 }


}
