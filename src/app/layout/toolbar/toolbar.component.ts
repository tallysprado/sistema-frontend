import { navbarData } from './nav-data';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { INavbarData } from './types';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { MenuListItemComponent } from './menu-list-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toolbar',
  imports: [
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MenuListItemComponent
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  showFiller = false;
  navbarData = navbarData;
  constructor(private oauthService: OAuthService) {}
  logout() {
    this.oauthService.logOut();
  }
}
