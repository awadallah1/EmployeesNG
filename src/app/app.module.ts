import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule,Routes } from "@angular/router";
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

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

const appRoutes:Routes= [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', component: DashboardComponent },
  // { path: '',   redirectTo: '', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
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
    EmployeesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    // AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,  // imports firebase/storage only needed for storage features
   

  ],
  providers: [EmployeeService,AngularFireDatabase,AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
