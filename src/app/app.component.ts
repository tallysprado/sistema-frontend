import { KeycloakAngularModule } from 'keycloak-angular';
import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { KeycloakService } from 'keycloak-angular';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-root',
  imports: [ToolbarComponent, ToolbarComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sistema-frontend';



}
