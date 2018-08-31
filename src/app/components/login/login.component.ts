import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Globals } from "../../globals";




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  email: string;
  password: string;
  socialAuth: boolean = false; // show Google and FB Sign in only when social auth is enabled
  error: any;
  dataLoading: boolean = false;
  brokenNetwork = false;
  constructor(public auth: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private toast: ToastrService,
    private gobal: Globals) { }

  ngOnInit() {
    // this.afAuth.authState.subscribe(ss=>{
    //   if(ss.providerId!=null){
    //     if(ss.providerId=='firebase'){
    //       this.router.navigate(['/']);
    //     }
    //   }
    
    // })

    this.afAuth.auth.getRedirectResult().then(result => {
      if (result.user) {
        this.router.navigate(['/']);
      }});
  }
  /// Anonymous Sign In
  async signInAnonymously() {
    await this.auth.anonymousLogin();
    return await this.router.navigate(['/'])
  }

  ngAfterViewInit(): void {
    // this.getAuthStatus();
    // if (this.afAuth.authState) {
      // this.router.navigate(['/']);
    // }else{
    //   this.router.navigate(['/login']);
    // }
    
    
  }


  /// Social Login

  // async signInWithGithub() {
  //   await this.auth.githubLogin();
  //   return await this.afterSignIn();
  // }

  async signInWithGoogle() {
    await this.auth.googleLogin();
    await this.afterSignIn();
  }

  async signInWithFacebook() {
    await this.auth.facebookLogin()
    
    // .catch((err) => {
    //   alert(err.message);
    //   this.router.navigate(['/login'])
    // })


    // await this.afterSignIn();
  }

  // async signInWithTwitter() {
  //   await this.auth.twitterLogin();
  //   return await this.afterSignIn();
  // }

  // login with email and password
  onSubmit() {

    this.auth.login(this.email, this.password)
      .then(
        (res) => {
         this.afterSignIn();
        }).catch((err) => {

          this.router.navigate(['/login'])
        })

  }

  afterSignIn() {
    this.toast.success('You Login Sucessfully', 'LogIn');
    // this.gobal.changeMessage('nice');

    this.router.navigate(['/']);
  }



  getAuthStatus() {
    this.auth.redirectLogin().then(function (result) {
      if (result.credential) {
        this.router.navigate(['/']);
        window.localStorage.setItem("displayName", result.user.displayName);
        window.localStorage.setItem("email", result.user.email);
        window.localStorage.setItem("picture", result.user.photoURL);

      }
      console.log(result.user)
    }).catch(
      (err) => {
        this.error = err;
      })
  }
  // glob(){
  //   this.gobal.changeMessage('Login');
  // }

}
