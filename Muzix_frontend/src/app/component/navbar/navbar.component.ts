import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRegistrationServiceService } from 'src/app/service/login-registration-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navBackgroundClass: String = "navTop";
  isUserLoggedIn: Boolean = false;
  username: any | undefined;

  constructor(private router: Router, private loginRegistrationService: LoginRegistrationServiceService) { }

  ngOnInit(): void {
    var token = sessionStorage.getItem('jwtToken');
    if (token !== null && token !== undefined) {
      this.isUserLoggedIn = true;
      this.username = sessionStorage.getItem('currentUser')?.split("@")[0].substring(1);
      console.log("this.username : ", this.username);
    } else {
      this.isUserLoggedIn = false;
    }
  }

  // This method changes the Navbar color from
  // transparent(at the top) to navy-blue on scrolling down
  @HostListener('window:scroll') onScroll(): void {
    if (window.pageYOffset > 970) {
      this.navBackgroundClass = "navScrollDown";
    } else {
      this.navBackgroundClass = "navTop";
    }
  }

  // This method will be triggered on clicking of LOGIN button
  // it'll redirect to LoginComponent
  login(): any {
    this.router.navigateByUrl('/login');
  }

  logout(): any {
    this.loginRegistrationService.logout();
    this.router.navigateByUrl('/');
  }

  // This method will be triggered on clicking of SEARCH button
  // it'll redirect to TrackSearchComponent
  search(): any {
    this.router.navigateByUrl('/search');
  }

}
