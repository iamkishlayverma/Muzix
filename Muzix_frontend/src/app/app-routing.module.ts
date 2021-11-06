import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { PlaylistComponent } from './component/playlist/playlist.component';
import { TrackAddComponent } from './component/track-add/track-add.component';
import { TrackDeleteComponent } from './component/track-delete/track-delete.component';
import { TrackSearchComponent } from './component/track-search/track-search.component';

const routes: Routes = [
  { path: 'search', component: TrackSearchComponent },
  { path: 'savetrack/:mbid', component: TrackAddComponent },
  { path: 'myplaylist', component: PlaylistComponent },
  { path: 'deletetrack/:mbid', component: TrackDeleteComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
