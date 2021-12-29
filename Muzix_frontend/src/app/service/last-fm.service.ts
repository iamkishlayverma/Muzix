import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LastFmService {

    public lastfmUrl = 'https://ws.audioscrobbler.com/2.0';
    public apiKey = '01887f43a08fb7bf4dc2e293b5e2c5b9';

    public tracks: Observable<JSON> | undefined;

    constructor(private httpclient: HttpClient) { }

    public searchTrack(track: string): Observable<JSON> {
        this.tracks = this.httpclient.get<JSON>(this.lastfmUrl + '/?method=track.search&track=' + track +
            '&api_key=' + this.apiKey + '&format=json');
        return this.tracks;
    }
}
