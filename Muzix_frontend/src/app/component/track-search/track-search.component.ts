import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-track-search',
  templateUrl: './track-search.component.html',
  styleUrls: ['./track-search.component.css']
})
export class TrackSearchComponent implements OnInit {

  trackname: string | undefined;

  constructor(private _route: ActivatedRoute, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  search(): any {
    console.log('trackname : ' + this.trackname);
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
    this.router.navigate(['/getAllTrackByTrackName', this.trackname]);
  }
}
