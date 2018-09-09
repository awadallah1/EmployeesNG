import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Globals } from "../../globals";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {

  constructor(private auth: AuthService, private toast: ToastrService, private router: Router, private global: Globals) { }
  displayName: string;
  email: string;
  picture: string = '../../../assets/Images/live-messenger-blue_512x512.png';
  loggedin: string;


  /////ESSA/////
  isLogedIn: boolean;
  userEmail: string;
  EnableRegister: boolean;

  ngOnInit() {
    /// change if we want to use image upload///
    // this.set(null);
    /////
    this.auth.getAuth().subscribe(auth => {
      if (auth) {
      
        this.isLogedIn = true;
        this.userEmail = auth.email;
        if (auth.photoURL) {
          this.picture = auth.photoURL;
        }
      } else {
        this.isLogedIn = false;
      }
    }

    )

  }
  ngAfterViewInit() {
    // this.auth.getAuth().subscribe(auth => {
    //   if (auth) {
    //     this.isLogedIn = true;
    //     this.userEmail = auth.email;
       
    //   } else {
    //     this.isLogedIn = false;
    //   }
    // }

    // )


  }

  signOut() {
    this.auth.signOut().then(
      () => {
        this.toast.success('You are logged out Sucessfully', 'Logout');
        this.router.navigate(['/login']);
      },
      (error) => {
        // this.router.navigate(['/login']);
        // console.log('Errrrrrrrrrrrrrrrrrror')
      }
    )

    this.ngOnInit();

  }
  set(picture: string) {
    this.auth.set(picture);
  }

}
