import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { Setting } from "../../interfaces/setting";


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {


  setting: Setting;

  constructor(private settings: SettingsService) { }

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

  }

}
