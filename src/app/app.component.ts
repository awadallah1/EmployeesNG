import { Component, OnInit } from '@angular/core';
import { Globals } from './globals';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(public golbals: Globals) { }

  ngOnInit() {
    /////////very Important////////
    // setTimeout(() => {
    //   $('.fire').hover(function () {
    //     $(this).slideUp();
    //   });
    // },5000);

  }
  //very Important and thats best Jquiry on all Project
  ngAfterViewChecked() {

    // $("tr").hover(function () {
    //   $(this).slideUp();
    // });
  }


}
