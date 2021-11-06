import { Component, OnInit } from '@angular/core';
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

  constructor(private spinner: NgxSpinnerService, private loginRegistrationService: LoginRegistrationServiceService) { }

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
    console.log("loginInfo: ", this.loginInfo);

    this.loginRegistrationService.login(this.loginInfo).subscribe(
      data => {
        Swal.fire({
          title: 'Login Successful',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        console.log("data: ", data);
      },
      error => {
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
        Swal.fire({
          title: 'Error!',
          text: this.errorMessage,
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    );
  }

  register(): void {
    if (this.signupForm.password !== this.signupForm.confirmPassword) {
      Swal.fire({
        title: 'Error!',
        text: 'Passowrd and Confirm Password fields are not matching',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    } else {
      this.loginForm.email = null;
      this.loginForm.password = null;

      this.registerInfo = new UserInfo(
        this.signupForm.email,
        this.signupForm.password
      );
      console.log("registerInfo: ", this.registerInfo);

      this.loginRegistrationService.register(this.registerInfo).subscribe(
        data => {
          Swal.fire({
            title: 'Registration Successful',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          console.log("data: ", data);
        },
        error => {
          this.errorMessage = error.error.message;
          this.isSignupFailed = true;
          Swal.fire({
            title: 'Error!',
            text: this.errorMessage,
            icon: 'error',
            confirmButtonText: 'Ok'
          });
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

}
