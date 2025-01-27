import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { Aluno } from '../../models/aluno.models';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { UsuarioServiceService } from '../../services/usuario/usuario-service.service';
import { IUsuario, Usuario } from '../../models/usuario.models';
import { MatIconModule } from '@angular/material/icon';
import { trigger } from '@angular/animations';
import { state } from '@angular/animations';
import { style } from '@angular/animations';
import { transition } from '@angular/animations';
import { animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ModalComponent } from '../modal-component/modal-component.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatriculaService } from '../../services/matricula.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
@Component({
  selector: 'app-filter',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatDividerModule,
    FormsModule,
    MatIconModule,
    CommonModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
  template: `
    <div
      class="block card p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
    >
      <h3 class="text-lg font-bold mb-4 ml-4 text-gray-500">
        Consultar usuários
      </h3>
      <form [formGroup]="form" (ngSubmit)="findByFilter()">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 p-3">
          <div>
            <mat-form-field class="!w-full !m-3">
              <mat-label>Matrícula</mat-label>
              <input
                size="small"
                matInput
                type="text"
                style="text-transform: uppercase;"
                formControlName="matricula"
              />
            </mat-form-field>
          </div>

          <div>
            <mat-form-field class="!w-full !m-3">
              <mat-label>Nome</mat-label>
              <input size="small" matInput type="text" formControlName="nome" />
            </mat-form-field>
          </div>

          <div>
            <mat-form-field class="!w-full !m-3">
              <mat-label>Disciplina</mat-label>
              <input
                size="small"
                matInput
                type="text"
                formControlName="disciplina"
              />
            </mat-form-field>
          </div>

          <div>
            <mat-form-field class="!w-full !m-3">
              <mat-label>CPF</mat-label>
              <input size="small" matInput type="text" formControlName="cpf" />
            </mat-form-field>
          </div>

          <div>
            <mat-form-field class="!w-full !m-3">
              <mat-label>RG</mat-label>
              <input size="small" matInput type="text" formControlName="rg" />
            </mat-form-field>
          </div>

          <div>
            <mat-form-field class="!w-full !m-3">
              <mat-label>E-mail</mat-label>
              <input
                size="small"
                matInput
                type="text"
                formControlName="email"
              />
            </mat-form-field>
          </div>
        </div>

        <mat-divider></mat-divider>
        <div class="flex justify-end mt-3">
          <button
            type="button"
            mat-flat-button
            matTooltip="Limpar campos"
            class="mr-5"
            (click)="limpar()"
          >
            Limpar
          </button>
          <button
            type="submit"
            mat-flat-button
            type
            matTooltip="Consultar usuários"
            (click)="findByFilter()"
          >
            Consultar
          </button>
        </div>
      </form>
    </div>

    <div class="overflow-auto">
      <table
        *ngIf="dataSource.length > 0"
        mat-table
        multiTemplateDataRows
        [dataSource]="dataSource"
        class="min-w-full divide-y divide-gray-200 hidden md:table"
      >
        <!-- Loop das colunas -->
        @for (column of displayedColumns; track column) {
        <ng-container class="w-full md:w-1/4" matColumnDef="{{ column }}">
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            mat-header-cell
            *matHeaderCellDef
          >
            {{ column.toUpperCase() }}
          </th>
          <td mat-cell *matCellDef="let element">
            @if (column == 'Matrícula') { @if (element.aluno) {
            {{ element.aluno.matricula }}
            } @else if (element.professor) {
            {{ element.professor.matricula }}
            } @else if (element.coordenador) {
            {{ element.coordenador.matricula }}
            } } @else if (column == 'Ações') {
            <button
              matTooltip="Editar"
              class="!text-gray-600"
              mat-icon-button
              (click)="openEditPage(element.id)"
            >
              <mat-icon>edit</mat-icon>
            </button>
            <button
              matTooltip="Visualizar"
              (click)="openModal(element.id); $event.stopPropagation()"
              class="!text-gray-600"
              mat-icon-button
            >
              <mat-icon>visibility</mat-icon>
            </button>

            <button
              matTooltip="Excluir"
              (click)="deleteUser(element)"
              class="!text-red-700"
              mat-icon-button
            >
              <mat-icon>delete</mat-icon>
            </button>
            } @else if (column == 'Nome') {
            {{ element.nome.toUpperCase() || 'Sem Nome' }}
            } @else if (column == 'E-mail') {
            {{ element.email }}
            } @else {
            {{ element[column.toLocaleLowerCase()] }}
            }
          </td>
        </ng-container>
        }

        <!-- Expanded Content Column -->
        <ng-container matColumnDef="expand">
          <th mat-header-cell *matHeaderCellDef aria-label="row actions">
            &nbsp;
          </th>
          <td mat-cell *matCellDef="let element">
            <button
              mat-icon-button
              aria-label="expand row"
              matTooltip="Visualizar disciplinas"
              (click)="toggleRow(element); $event.stopPropagation()"
            >
              <mat-icon>
                {{
                  expandedElement === element
                    ? 'keyboard_arrow_up'
                    : 'keyboard_arrow_down'
                }}
              </mat-icon>
            </button>
          </td>
        </ng-container>

        <ng-container matColumnDef="expandedDetail">
          <td
            mat-cell
            *matCellDef="let element"
            [attr.colspan]="columnsToDisplayWithExpand.length"
          >
            <div
              class="flex overflow-hidden flex flex-col"
              [@detailExpand]="
                element == expandedElement ? 'expanded' : 'collapsed'
              "
            >
              <div
                class="!flex !flex-col !w-full"
                *ngFor="let disciplina of element.disciplinas; let i = index"
              >
                {{ i + 1 }} - {{ disciplina.nome }}
              </div>
              <br />
            </div>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="columnsToDisplayWithExpand"></tr>
        <tr
          mat-row
          *matRowDef="let element; columns: columnsToDisplayWithExpand"
          class="element-row"
        ></tr>
        <tr
          mat-row
          *matRowDef="let row; columns: ['expandedDetail']"
          class="detail-row"
        ></tr>
      </table>

      <!-- Mobile View -->
      <div class="block md:hidden mt-4">
        <div
          *ngFor="let element of dataSource"
          class="border rounded-lg mb-4 p-4 shadow"
        >
          <div class="font-bold text-gray-700">
            {{ element.nome.toUpperCase() || 'Sem Nome' }}
          </div>
          <div *ngFor="let column of displayedColumns">
            @if (column !== 'Ações' && column !== 'expand') {
            <div class="flex justify-between">
              <span class="font-medium text-gray-600">
                {{ column.toUpperCase() }}
              </span>
              <span class="text-gray-800">
                @if (column == 'Matrícula') { @if (element.aluno) {
                {{ element.aluno.matricula }}
                } @else if (element.professor) {
                {{ element.professor.matricula }}
                } @else if (element.coordenador) {
                {{ element.coordenador.matricula }}
                } } @else if (column == 'Nome') {
                {{ element.nome.toUpperCase() || 'Sem Nome' }}
                } @else {
                {{ element[column.toLocaleLowerCase()] }}
                }
              </span>
            </div>
            }
          </div>
          <div class="mt-4">
            <button
              matTooltip="Editar"
              class="text-blue-500 mr-2"
              mat-icon-button
            >
              <mat-icon>edit</mat-icon>
            </button>
            <button
              matTooltip="Visualizar"
              (click)="openModal(element.id); $event.stopPropagation()"
              class="text-blue-500"
              mat-icon-button
            >
              <mat-icon>visibility</mat-icon>
            </button>
            <button
              matTooltip="Excluir"
              (click)="deleteUser(element)"
              class="text-red-500"
              mat-icon-button
            >
              <mat-icon>delete</mat-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .table {
      width: 100%;
    }
    .card {
      height: 100%;
      width: 75vw;
    }
    tr.detail-row {
      height: 0px;
    }
    tr.element-row:not(.expanded-row):hover {
      background: whitesmoke;
    }
    tr.element-row:not(.expanded-row):active {
      background: #efefef;
    }
    .element-row td {
      border-bottom-width: 0;
    }

  `,
})
export class FilterComponent {
  form: FormGroup;
  usuario: Usuario = {
    id: null,
    nome: null,
    cpf: null,
    rg: null,
    email: null,
    cargo: null,
    senha: null,
    matricula: null,
    disciplina: null,
  };
  displayedColumns: string[] = [
    'Matrícula',
    'Nome',
    'Cargo',
    'E-mail',
    'Ações',
  ];
  dataSource: IUsuario[] = [];
  expandedElement: IUsuario | null = null;
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];

  constructor(
    private usuarioService: UsuarioServiceService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private matriculaService: MatriculaService
  ) {
    this.form = this.fb.group({
      matricula: [''],
      nome: [''],
      disciplina: [''],
      cpf: [''],
      rg: [''],
      email: [''],
    });
    this.findAluno();
  }

  deleteUser(element: IUsuario) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar exclusão',
        message: 'Esta ação não pode ser desfeita, deseja continuar?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const mat =
          element.aluno?.matricula ||
          element.professor?.matricula ||
          element.coordenador?.matricula;
        this.usuarioService.delete(element.id).subscribe(() => {
          this.findAluno();
        });
      }
    });
  }

  openEditPage(id: string | number) {
    console.log('Navigating to /users/create with ID:', id);

    this.router.navigate(['/users/edit', id]);
  }
  toggleRow(element: IUsuario) {
    this.expandedElement = this.expandedElement === element ? null : element;
  }

  openModal(element: any) {
    this.dialog.open(ModalComponent, {
      data: element,
    });
  }

  findByFilter() {
    this.usuarioService.findByFilter(this.form.value).subscribe((res) => {
      this.dataSource = res as IUsuario[];
    });
  }

  findAluno() {
    this.usuarioService.findAll().subscribe((res) => {
      this.dataSource = (res as IUsuario[]).map((usuario) => {
        console.log(usuario);
        return {
          ...usuario,
          disciplinas: usuario.aluno ? usuario.aluno.disciplinas : [],
        };
      });

      console.log(this.dataSource);
    });
  }

  limpar() {
    this.form.reset();
    this.dataSource = [];
  }
}
