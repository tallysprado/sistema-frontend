import { KeycloakAngularModule } from 'keycloak-angular';
import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from "./layout/toolbar/toolbar.component";
import { KeycloakService } from 'keycloak-angular';



@Component({
  selector: 'app-root',
  imports: [ToolbarComponent, ToolbarComponent, KeycloakAngularModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sistema-frontend';



}
