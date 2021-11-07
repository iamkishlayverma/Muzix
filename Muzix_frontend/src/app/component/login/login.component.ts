import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginRegistrationServiceService } from 'src/app/service/login-registration-service.service';
import Swal from 'sweetalert2';
import { UserInfo } from '../user-info';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any = {};
  isLoginClicked = true;
  isLoginFailed: boolean | undefined;

  signupForm: any = {};
  isSignupClicked = false;
  isSignupFailed: boolean | undefined;

  errorMessage: any;

  private loginInfo: UserInfo | undefined;
  private registerInfo: UserInfo | undefined;

  constructor(private router: Router, private spinner: NgxSpinnerService, private loginRegistrationService: LoginRegistrationServiceService) { }

  ngOnInit(): void {
    this.isLoginClicked = true;
    this.isSignupClicked = false;
  }

  loginClicked(): void {
    this.isLoginClicked = true;
    this.isSignupClicked = false;
  }

  signupClicked(): void {
    this.isLoginClicked = false;
    this.isSignupClicked = true;
  }

  login(): void {
    this.signupForm.email = null;
    this.signupForm.password = null;
    this.signupForm.confirmPassword = null;

    this.loginInfo = new UserInfo(
      this.loginForm.email,
      this.loginForm.password
    );

    this.loginRegistrationService.authenticate(this.loginInfo).subscribe(
      data => {
        console.log("token: ", data);
        sessionStorage.setItem('jwtToken', data);
        sessionStorage.setItem('currentUser', JSON.stringify(this.loginInfo?.email));
        this.swalPopup('success', 'Signed in successfully!');
        this.router.navigateByUrl('/');
      },
      error => {
        this.errorMessage = error.error.message;
        this.isSignupFailed = true;
        this.swalPopup('error', 'Error while signing in!');
      }
    );
  }

  register(): void {
    if (this.signupForm.password !== this.signupForm.confirmPassword) {
      this.swalPopup('error', 'Error! Both Password and Confirm Password should match!');
    } else {
      this.loginForm.email = null;
      this.loginForm.password = null;

      this.registerInfo = new UserInfo(
        this.signupForm.email,
        this.signupForm.password
      );

      this.loginRegistrationService.register(this.registerInfo).subscribe(
        data => {
          this.swalPopup('success', 'Registered successfully!');
          console.log("Registered Used data: ", data);
          this.router.navigateByUrl('/');
        },
        error => {
          this.isSignupFailed = true;
          this.swalPopup('error', 'Error while registering!');
        }
      );
      this.loadSpinner();
    }
  }

  // This method will load the spinner
  // The spinner will last for 5 seconds(i.e., 5000ms)
  loadSpinner(): any {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }

  // This method is used to open pop-up
  // on successful operation as well as on 
  // failed or error operation
  swalPopup(iconType: any, titleText: any) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: iconType,
      title: titleText
    })
  }

}
