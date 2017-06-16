import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { NgServiceWorker, ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';

import { MoviesService } from './services/movies.service';
import { NavbarService } from './services/navbar.service';

import { routing } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-popular-movies-pwa' }),
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    routing,
    ServiceWorkerModule
  ],
  providers: [
    MoviesService,
    NavbarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private _moviesService: MoviesService, private _navbarService: NavbarService, private _sw: NgServiceWorker) {
    this._sw.registerForPush({
      applicationServerKey: environment.applicationServerKey
    }).subscribe((sub: any) => {
      // Use details to register on your server to send notifications to this device
      console.log(sub);
    });
    this._sw.push.subscribe((msg: any) => {
      // Handle message when in app
      console.log(msg);
    });
  }
}