import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string;
  password:string;
  constructor(public auth: AuthService,
    private router: Router,private toast:ToastrService) { }

  ngOnInit() {
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
    await await this.afterSignIn();
  }

  async signInWithFacebook() {
    await this.auth.facebookLogin();
    // await this.afterSignIn();
  }

  // async signInWithTwitter() {
  //   await this.auth.twitterLogin();
  //   return await this.afterSignIn();
  // }

  // login with email and password
  onSubmit(){

    this.auth.login(this.email,this.password)
    .then(
      (res)=>{
          this.router.navigate(['/'])
      }).catch((err)=>{
        alert(err.message);
        this.router.navigate(['/login'])
      })
     
  }

  afterSignIn(){
    
    this.toast.success('You Login Sucessfully','LogIn')
    return this.router.navigate(['/'])
  }

  signout(){
    this.auth.signOut();
  }

}
