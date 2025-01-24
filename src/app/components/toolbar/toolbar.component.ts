import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { KeycloakAngularModule } from 'keycloak-angular';
import { navbarData } from './nav-data';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
// import { OAuthService } from 'angular-oauth2-oidc';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { INavbarData } from './types';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { MenuListItemComponent } from './menu-list-item.component';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { HasRolesDirective, KeycloakService } from 'keycloak-angular';
import Keycloak from 'keycloak-js';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-toolbar',
  providers: [
    {
      provide: KeycloakService,
      useValue: new KeycloakService(),
    },
  ],
  imports: [
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MenuListItemComponent,
    KeycloakAngularModule,
  ],

  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent implements AfterViewInit, OnDestroy {
  @ViewChild('drawer') drawer!: MatDrawer;
  showFiller = false;
  navbarData = navbarData;
  private breakpointSubscription!: Subscription;
  isHandset: boolean = false;
  username: string = '';

  constructor(
    private keycloak: Keycloak,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngAfterViewInit() {
    this.breakpointSubscription = this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isHandset = result.matches;
        if (this.isHandset) {
          this.drawer.mode = 'over';
        } else {
          this.drawer.mode = 'side';
        }
      });

      this.keycloak.loadUserProfile().then((userProfile) => {
        this.username = userProfile.firstName || userProfile.username || '';
      });
  }
  ngOnDestroy() {
    if (this.breakpointSubscription) {
      this.breakpointSubscription.unsubscribe();
    }
  }

  closeDrawerIfMobile() {
    if (this.isHandset) {
      this.drawer.close();
    }
  }
  logout() {
    this.keycloak.logout();
  }
}
