import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SettingsService } from "../services/settings.service";
import { Setting } from "../interfaces/setting";
@Injectable({
  providedIn: 'root'
})
export class canRegisterGuard implements CanActivate {
  setting:Setting;
  constructor(
    private settings: SettingsService,
    
  ) { }
  
  canActivate():boolean {
    if (localStorage.getItem('ngSettings') != null) {
      this.setting = JSON.parse(localStorage.getItem('ngSettings'));
      if (this.setting.canRegister!=true) {
        localStorage.setItem('canregister','false');
        return true;
       
      } else {
            localStorage.setItem('canregister','true');
        return true;
      }
    }else{
      this.setting= this.settings.getSettings();
      return true;
    }
    
  }
}
