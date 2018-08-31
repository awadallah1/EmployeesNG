import { Component, OnInit } from '@angular/core';
import { Globals } from "../../globals";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private global:Globals) { }

  ngOnInit() {
  }
  // glob(){
  //   this.global.changeMessage('Register');
  // }
}
