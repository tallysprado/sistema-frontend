import { KeycloakAngularModule } from 'keycloak-angular';
import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { KeycloakService } from 'keycloak-angular';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';



@Component({
  selector: 'app-root',
  imports: [ToolbarComponent, ToolbarComponent, HttpClientModule, KeycloakAngularModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [KeycloakService],

})
export class AppComponent {
  title = 'sistema-frontend';



}
