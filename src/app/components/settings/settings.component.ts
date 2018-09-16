import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { Setting } from "../../interfaces/setting";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {


  setting: Setting;

  constructor(private settings: SettingsService, private router : Router, private toaster: ToastrService) { }

  ngOnInit() {
    if (localStorage.getItem('ngSettings')) {
      this.setting = JSON.parse(localStorage.getItem('ngSettings'));

    } else {
      this.setting = this.settings.getSettings();
    }
  }
  register() {
    this.setting.canRegister = !this.setting.canRegister;
  }
  myChecked() {
    if (localStorage.getItem('ngSettings') != null) {
      this.setting = JSON.parse(localStorage.getItem('ngSettings'));
      return this.setting.canRegister;
    } else {
      return this.settings.getSettings().canRegister;
    }

  }

  mySubmit() {

    this.settings.changeSetting(this.setting);
    this.toaster.success("Settings saved successfully","EmployeesNG",{timeOut:2000});
    this.router.navigate(['/'])
    

  }

}
