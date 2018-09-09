import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


import { auth } from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ToastrService } from 'ngx-toastr';

import { Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap, startWith, tap, filter, map } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { Globals } from "../globals";


interface User {
  uid: string;
  email?: string | null;
  photoURL?: string;
  displayName?: string;
}

@Injectable()
export class AuthService {
  user: Observable<User | null>;
  loggedin: boolean = false;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private toaster: ToastrService,
    private global: Globals
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
      // tap(user => localStorage.setItem('user', JSON.stringify(user))),
      // startWith(JSON.parse(localStorage.getItem('user')))
    );
  }

  ////// OAuth Methods /////
  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  githubLogin() {
    const provider = new auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
       
    var provider = new firebase.auth.FacebookAuthProvider();
    // this.global.changeMessage('nice');
    this.afAuth.auth.signInWithRedirect(provider).then(
      next=>{
        console.log(this.afAuth.auth.currentUser.photoURL)
        this.router.navigate(['dashboard']);
      }
    )
    
     
  }
        
          
    


  twitterLogin() {
    const provider = new auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: any) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(credential => {
        this.router.navigate(['dashboard'])
        this.toaster.success('Welcome to EmployeesNG!!!', 'success');
        return this.updateUserData(credential.user);
      })
      .catch(error => this.handleError(error));
  }

  //// Anonymous Auth ////
  anonymousLogin() {
    return this.afAuth.auth
      .signInAnonymously()
      .then(credential => {
        this.toaster.success('Welcome to EmployeesNG!!!', 'success');
        return this.updateUserData(credential.user); // if using firestore
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  //// Email/Password Auth ////
  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(credential => {
       this.emailLogin(email,password);
       this.router.navigate(['/'])
      })
      .catch(error => this.toaster.error(error, 'Register'));
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(credential => {
        this.toaster.success('Welcome to EmployeesNG!!!', 'success');
       
      })
      .catch(error => this.handleError(error));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = auth();

    return fbAuth
      .sendPasswordResetEmail(email)
      .then(() => this.toaster.success('Welcome to EmployeesNG!!!', 'success'))
      .catch(error => this.handleError(error));
  }

  /// signout and clear localstorrage Items

  // signOut() {
  //   localStorage.removeItem("displayName");
  //   localStorage.removeItem("email");
  //   localStorage.removeItem("picture");
  //   localStorage.setItem("loggedin", "false");
  //   this.router.navigate(['login']);
  //   return this.afAuth.auth.signOut().then(() => {
  //     localStorage.setItem("loggedin", "false");
  //     this.router.navigate(['login']);
  //   });
  // }


  // If error, console log and notify user
  private handleError(error: Error) {

    // console.error(error);
    // this.toaster.error(error.message, 'error');
  }

  // Sets user data to firestore after succesful login
  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || 'nameless user',
      photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ'
    };
    return userRef.set(data);

  }

  login(email, password) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userdata => resolve(userdata), err => reject(err))
    })
  }

  // method to retreive firebase auth after login redirect
  redirectLogin() {
    return this.afAuth.auth.getRedirectResult();
  }

  ////Essa
  getAuth() {
    return this.afAuth.authState.pipe(
      map(auth => auth)
    )
  }

  set(picture:string){
    this.afAuth.auth.currentUser.updateProfile({displayName:null, photoURL:picture})
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }
}