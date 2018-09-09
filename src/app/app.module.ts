import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";
import { HttpModule } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { AuthService } from "./core/auth.service";
import { AuthGuard } from "./core/auth.guard";

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeInfoComponent } from './components/employee-info/employee-info.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { EmployeeService } from './services/employee.service';
import { EmployeesComponent } from './components/employees/employees.component';
import { FooterComponent } from './components/footer/footer.component';
import { Globals } from './globals';

const appRoutes: Routes = [
  { path: 'register', component: RegisterComponent  },
  { path: 'login', component: LoginComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'employee/:id', component: EmployeeInfoComponent , canActivate:[AuthGuard]},
  { path: 'dashboard', component: DashboardComponent , canActivate:[AuthGuard] },
  { path: '', component: DashboardComponent , canActivate:[AuthGuard]  },
  { path: 'add-employee', component: AddEmployeeComponent, canActivate:[AuthGuard] },

  // { path: '',   redirectTo: '', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent, canActivate:[AuthGuard] }
];
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EmployeeInfoComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    PageNotFoundComponent,
    EmployeesComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SnotifyModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(
      {
        timeOut: 3000,
        positionClass: 'toast-top-center',
        preventDuplicates: true,
        easeTime: 400
      }), // ToastrModule added
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    // AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,  // imports firebase/storage only needed for storage features


  ],
  providers: [Globals, EmployeeService, AngularFireDatabase, AngularFireAuth,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService,AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
