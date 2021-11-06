import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navBackgroundClass: String = "navTop";

  constructor(private router: Router) { }

  ngOnInit(): void {
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

  // This method will be triggered on clicking of SEARCH button
  // it'll redirect to TrackSearchComponent
  search(): any {
    this.router.navigateByUrl('/search');
  }

}
