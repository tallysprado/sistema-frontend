import { MatIconModule } from '@angular/material/icon';
import { Component, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { INavbarData } from './types';
import { MatButton, MatButtonModule } from '@angular/material/button';

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
  ],
  template: `
    <mat-accordion
      class="!w-full !p-0 !mt-0 !shadow-none !border-0 !rounded-none"
    >
      <mat-expansion-panel class="!w-full !shadow-none !border-0 !rounded-none">
        <mat-expansion-panel-header class="!w-full">
          <mat-panel-title class="!w-full !text-md">
            {{ data.label }}
          </mat-panel-title>
        </mat-expansion-panel-header>
        <ng-container *ngIf="data.items && data.items.length > 0">
          <mat-nav-list>
            @for (link of data.items; track link) {
            <button
            (click)="navigateTo(link.routerLink)"
              class="hover:bg-gray-200 hover:shadow-sm flex justify-content-around w-full p-2 mb-2"
            >
              <mat-icon class="ml-0 text-sm">{{ link.icon }} </mat-icon>
              <label class="ml-5">{{ link.label }}</label>
            </button>
            }
          </mat-nav-list>
        </ng-container>
      </mat-expansion-panel>
    </mat-accordion>
  `,
  styles: [
    `
      button{
        margin: 00; width: 100vh; left: 0; display: flex;
      }
    `,
  ],
})
export class MenuListItemComponent {
  @Input() data!: INavbarData;
  constructor(private router: Router) {}
  trackByFn(index: number, item: any) { return item.label; }
  navigateTo(path: string) { this.router.navigate([path]); }
}
