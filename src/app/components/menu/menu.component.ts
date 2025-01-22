import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
  MatTreeModule,
} from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

interface Node {
  name: string;
  roles?: string[];
  routerLink?: string;
  icon?: string;
  children?: Node[];
}

const TREE_DATA: Node[] = [
  {
    name: 'Usuários',
    roles: ['coordenador'],
    icon: 'people',
    children: [
      {
        name: 'Criar',
        roles: ['coordenador'],
        routerLink: '/users/create',
        icon: 'add_circle',
      },
      {
        name: 'Consultar',
        roles: ['coordenador'],
        icon: 'person_search',
        routerLink: '/users/aluno',
      },
    ],
  },
  {
    name: 'Matrícula',
    roles: ['coordenador'],
    icon: 'person_search',
    routerLink: '/matricula/create',
    children: [{ name: 'Consultar' }, { name: 'Criar' }],
  },
];

@Component({
  selector: 'app-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatTreeModule, MatButtonModule, MatIconModule, RouterModule, CommonModule],
  template: `
    <mat-tree [dataSource]="dataSource" [treeControl]="treeControl"
    class="!w-full !hover:bg-gray-200 !hover:shadow-sm"
    >
  <div class="w-full hover:bg-gray-200 hover:shadow-sm">


    <mat-tree-node *matTreeNodeDef="let node" matTreeNodePadding
      class="!w-full !hover:bg-gray-200 !hover:shadow-sm"
      >
        <!-- use a disabled button to provide padding for tree leaf -->
        <button mat-icon-button
        (click)="navigateTo(node.routerLink)"
        class="hover:bg-gray-200"
        >
          <mat-icon>{{ node.icon }}</mat-icon>
        </button>
        {{ node.name }}
      </mat-tree-node>
<div class="w-full hover:bg-gray-200 hover:shadow-sm">
      <mat-tree-node
        *matTreeNodeDef="let node; when: hasChild"
        matTreeNodePadding
        matTreeNodeToggle
        class="!w-full !hover:bg-gray-200 !hover:shadow-sm"
        [cdkTreeNodeTypeaheadLabel]="node.name"
      >
        <button
          mat-icon-button
          matTreeNodeToggle
          [attr.aria-label]="'Toggle ' + node.name"
        >
          <mat-icon class="mat-icon-rtl-mirror">
            {{ treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right' }}
          </mat-icon>
        </button>
        {{ node.name }}
      </mat-tree-node>
</div>
      </div>
    </mat-tree>
  `,
  styles: ``,
})
export class MenuComponent {
  private _transformer = (node: Node, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<FlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private router: Router) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
