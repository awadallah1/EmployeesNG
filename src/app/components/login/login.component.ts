import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Globals } from "../../globals";
import { Setting } from "../../interfaces/setting";
import { SettingsService } from "../../services/settings.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  setting: Setting;
  canRegister: string = 'true';
  email: string;
  password: string;
  rPassword: string;
  rcPassword: string;
  rEmail: string;
  equal: boolean = false;
  forRegister = false;
  forLogin=true;
  forReset=false;
  resetEmail:string;
  


  socialAuth: boolean = false; // show Google and FB Sign in only when social auth is enabled
  error: any;
  dataLoading: boolean = false;
  brokenNetwork = false;
  constructor(public auth: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private toast: ToastrService,
    private gobal: Globals,
    private settingService: SettingsService) { }

  ngOnInit() {
    // this.afAuth.authState.subscribe(ss=>{
    //   if(ss.providerId!=null){
    //     if(ss.providerId=='firebase'){
    //       this.router.navigate(['/']);
    //     }
    //   }

    // })
    if(localStorage.getItem('canregister')){
      this.canRegister=localStorage.getItem('canregister')
    }else this.canRegister='true';
    this.afAuth.auth.getRedirectResult().then(result => {
      if (result.user) {
        this.router.navigate(['/']);
      }
    });

    if (localStorage.getItem('ngSettings') != null) {
      this.setting = JSON.parse(localStorage.getItem('ngSettings'));
      
    }else{
      this.setting= this.settingService.getSettings();
     
    }
   
   

  }
  ngAfterViewInit(): void {
    // this.getAuthStatus();
    // if (this.afAuth.authState) {
    // this.router.navigate(['/']);
    // }else{
    //   this.router.navigate(['/login']);
    // }


  }
  /// Anonymous Sign In
  async signInAnonymously() {
    await this.auth.anonymousLogin();
    return await this.router.navigate(['/'])
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

  }

  async signInWithTwitter() {
    await this.auth.twitterLogin();
    return await this.afterSignIn();
  }

  // login with email and password
  onSubmit() {

    this.auth.login(this.email, this.password)
      .then(
        (res) => {
          this.afterSignIn();
        }).catch((err) => {
          this.toast.error('Wrong Email or Password', 'LogIn');
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

  onRegister() {
    this.auth.emailSignUp(this.rEmail, this.rPassword)

  }

  onChange() {
    if (this.rcPassword == this.rPassword) {
      this.equal = true;

    } else {
      this.equal = false;

    }
  }

  resetPassword(){
    this.auth.resetPassword(this.resetEmail).then(
      ()=>{this.forLogin=true;
        this.forReset=false;}
    )

  }

}
