import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
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
  getEmployee(id) {
    
    return this.db.object('employees/'+id).snapshotChanges();

  }

  addEmployee(emp:Employee){
    this.empList.push(emp);
  }
  updateEmployee(employee : Employee){
    this.empList.update(employee.$key,
      {
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        country: employee.country,
        city: employee.city,
        phone: employee.phone,
        salary: employee.salary
      });
  }

  deleteEmployee(id){
    this.empList.remove(id);
  }
 
 
}
