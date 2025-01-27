import { MatIconModule } from '@angular/material/icon';
import { Component, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { INavbarData } from './types';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { HasRolesDirective } from 'keycloak-angular';
import Keycloak from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-menu-list-item',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    MatButtonModule,
    CommonModule,
    MatButtonModule
  ],
  template: `
    <div *ngIf="hasRealmRole(data.roles ? data.roles[0] : '')" class="w-full rounded-none">

        <mat-expansion-panel
          class="!w-full !shadow-none !border-0 !rounded-none !mat-elevation-z0"
        >
          <mat-expansion-panel-header class="!w-full !rounded-none">
            <mat-panel-title class="!w-full !text-md !rounded-none">
              {{ data.label }}
            </mat-panel-title>
          </mat-expansion-panel-header>
          <ng-container
            *ngIf="data.items && data.items.length > 0"
            class="w-full p-0 m-0"
          >
            <mat-nav-list
              class="!w-full !p-0 !mt-0 !shadow-none !border-0 !rounded-none"
            >
              @for (link of data.items; track link) {
              <div
                *ngIf="hasRealmRole(link.roles ? link.roles[0] : '')"
                class="w-full p-0 m-0"
              >
                <button
                  (click)="navigateTo(link.routerLink)"
                  class="hover:bg-gray-300 hover:shadow-lg flex
                  active:bg-gray-400 active:shadow-inner
                  rounded-none
                  transition-all duration-200 ease-in-out transform active:scale-98
                  justify-content-around w-full p-2 mb-2"
                >
                  <mat-icon class="ml-4 text-sm">{{ link.icon }} </mat-icon>
                  <label class="ml-2">{{ link.label }}</label>
                </button>
              </div>
              }
            </mat-nav-list>
          </ng-container>
        </mat-expansion-panel>
    </div>
  `,
  styles: [
    `
      :host {
        ::ng-deep {
          .mat-expansion-panel-body {
            padding: 0;
            border-radius: 0;
          }
        }
      }
      button {
        margin: 0;
        width: 100vh;
        left: 0;
        display: flex;
      }
    `,
  ],
})
export class MenuListItemComponent {
  @Input() data!: INavbarData;
  constructor(private router: Router, private keycloak: Keycloak) {}
  trackByFn(index: number, item: any) {
    return item.label;
  }
  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  hasRealmRole(role: string): boolean {
    // return this.keycloakService.isUserInRole(role);
    return this.keycloak.hasResourceRole(role);
  }
}
