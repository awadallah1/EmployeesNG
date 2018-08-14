import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
// import {AngularFireDatabase, FirebaseListObservable,FirebaseObjectObservable } from "angularfire2/database-deprecated";
// import { Observable } from 'rxjs';
import { Employee } from "../interfaces/Employee";


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  empList: AngularFireList<any>
 

  constructor(public db: AngularFireDatabase) {
    // this.employees = db.list('employees').valueChanges() as Observable<Employee[]>
    this.empList = db.list('employees')
      
  }
  ///// Get Employees 
  getEmployees() {
    return this.empList;
  }
 
 
}
