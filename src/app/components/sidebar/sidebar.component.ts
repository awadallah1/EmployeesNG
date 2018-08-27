import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../interfaces/Employee';
import {SnotifyService, SnotifyPosition} from 'ng-snotify';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  id:string;
  employee:Employee={};
 

  constructor(private snotify:SnotifyService, private empService:EmployeeService, private router:Router, private _route:ActivatedRoute) {}

  ngOnInit() {
    this.id = this._route.snapshot.params['id']
    
  }

  editClick(){
    this.router.navigate(['/add-employee'],{queryParams:{id:this.id}})
   }

   deleteClick(){
    this.snotify.confirm('Alert !!! Delete Employment??','Employee',{animation: {
      enter: 'fadeIn',
      exit: 'fadeOut',
      time: 1000
    },position:SnotifyPosition.centerCenter,
    buttons:[{text: 'ok', action: () => {
      
         this.empService.getEmployee(this.id).subscribe(
           response=>{
             let _employee =response.payload.val() as Employee;
            
            if(this.employee.image){
              this.empService.deleteEmployee(this.id,_employee.image);
            }else{
              this.empService.deleteEmployee(this.id,null);
            }
            }
         )
         
      this.snotify.remove();
      this.snotify.success('Employee Deleted Successfully.','Employees',{showProgressBar:false,position:SnotifyPosition.rightTop,timeout:1000});
      this.router.navigate(['/']);
    }},
    {text: 'Cancel', action: () => this.snotify.remove()}]})

     
   }



}
