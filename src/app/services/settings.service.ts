import { Injectable } from '@angular/core';
import { Setting } from "../interfaces/setting";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  mySetting: Setting = {
    canRegister: true
  }
  constructor() {
    if (localStorage.getItem('ngSettings') != null) {
      this.mySetting = JSON.parse(localStorage.getItem('ngSettings'));
    }
  }

  getSettings() {
    return this.mySetting;
  }

  changeSetting(setting: Setting) {

    localStorage.setItem('ngSettings', JSON.stringify(setting))

  }

}
