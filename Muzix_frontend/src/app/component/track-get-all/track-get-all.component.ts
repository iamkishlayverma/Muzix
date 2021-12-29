import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LastFmService } from 'src/app/service/last-fm.service';

@Component({
  selector: 'app-track-get-all',
  templateUrl: './track-get-all.component.html',
  styleUrls: ['./track-get-all.component.css']
})
export class TrackGetAllComponent implements OnInit {

  public tracks: any;
  public trackname: any;
  public searching: any;
  public songs: any;

  constructor(
    public _route: ActivatedRoute,
    public lastFmService: LastFmService) { }

  ngOnInit() {
    this.searching = true;
    this.trackname = this._route.snapshot.paramMap.get('trackname');
    console.log(this.trackname);
    this.tracks = this.lastFmService.searchTrack(this.trackname).subscribe(
      data => {
        this.tracks = data;
        console.log(data);
        this.songs = this.tracks.results.trackmatches.track
        this.searching = false;
      },
      error => {
        console.log(error.errorMessage);
      }
    );
  }
}
