import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { PlaylistComponent } from './component/playlist/playlist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingComponent } from './component/landing/landing.component';
import { TrackSearchComponent } from './component/track-search/track-search.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { TrackGetAllComponent } from './component/track-get-all/track-get-all.component';
import { TrackDeleteComponent } from './component/track-delete/track-delete.component';
import { TrackAddComponent } from './component/track-add/track-add.component';
import { TrackCardComponent } from './component/track-card/track-card.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './component/home/home.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PlaylistComponent,
    LandingComponent,
    TrackSearchComponent,
    NavbarComponent,
    TrackGetAllComponent,
    TrackDeleteComponent,
    TrackAddComponent,
    TrackCardComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
