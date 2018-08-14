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

  employees = []

  constructor(public db: AngularFireDatabase) {
    // this.employees = db.list('employees').valueChanges() as Observable<Employee[]>
    this.empList = db.list('employees')
    this.empList.snapshotChanges()
      .subscribe(actions => {
        actions.forEach(action => {
          let y = action.payload.toJSON()
          y["$key"] = action.key
          this.employees.push(y as Employee)
        })
      })

    console.log(this.employees)
  }
  ///// Get Employees 
  getEmployees() {
    return this.employees;

  }
}
