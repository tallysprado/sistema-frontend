import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { Aluno } from '../../models/aluno.models';
import { FormsModule } from '@angular/forms';
import { UsuarioServiceService } from '../../services/usuario/usuario-service.service';
import { IUsuario, Usuario } from '../../models/usuario.models';
import { MatIconModule } from '@angular/material/icon';
import { trigger } from '@angular/animations';
import { state } from '@angular/animations';
import { style } from '@angular/animations';
import { transition } from '@angular/animations';
import { animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
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
    MatGridListModule,
    MatTableModule,
    MatDividerModule,
    FormsModule,
    MatIconModule,
    CommonModule,
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
      <mat-grid-list cols="4" class="!w-full" rowHeight="100px">
        <mat-grid-tile>
          <mat-form-field class="!w-full !m-3">
            <mat-label>Matrícula</mat-label>
            <input
              size="small"
              matInput
              type="text"
              [(ngModel)]="aluno.matricula"
            />
          </mat-form-field>
        </mat-grid-tile>

        <mat-grid-tile>
          <mat-form-field class="!w-full !m-3">
            <mat-label>Nome</mat-label>
            <input size="small" matInput type="text" [(ngModel)]="aluno.nome" />
          </mat-form-field>
        </mat-grid-tile>

        <mat-grid-tile>
          <mat-form-field class="!w-full !m-3">
            <mat-label>Disciplina</mat-label>
            <input
              size="small"
              matInput
              type="text"
              [(ngModel)]="aluno.disciplina"
            />
          </mat-form-field>
        </mat-grid-tile>

        <mat-grid-tile>
          <mat-form-field class="!w-full !m-3">
            <mat-label>CPF</mat-label>
            <input size="small" matInput type="text" [(ngModel)]="aluno.cpf" />
          </mat-form-field>
        </mat-grid-tile>

        <mat-grid-tile>
          <mat-form-field class="!w-full !m-3">
            <mat-label>RG</mat-label>
            <input size="small" matInput type="text" [(ngModel)]="aluno.rg" />
          </mat-form-field>
        </mat-grid-tile>

        <mat-grid-tile>
          <mat-form-field class="!w-full !m-3">
            <mat-label>E-mail</mat-label>
            <input
              size="small"
              matInput
              type="text"
              [(ngModel)]="aluno.email"
            />
          </mat-form-field>
        </mat-grid-tile>
      </mat-grid-list>

      <mat-divider></mat-divider>
      <div class="flex justify-end mt-3">
        <button mat-flat-button class="primary-button mr-3">Consultar</button>
        <button mat-flat-button class="danger-button" (click)="limpar()">
          Limpar
        </button>
      </div>
    </div>

    <table
      mat-table
      multiTemplateDataRows
      [dataSource]="dataSource"
      class="!w-full !mat-elevation-z8"
    >
      @for (column of displayedColumns; track column) {
      <ng-container matColumnDef="{{ column }}">
        <th mat-header-cell *matHeaderCellDef>{{ column.toUpperCase() }}</th>
        <td mat-cell *matCellDef="let element">
          @if(column == 'Matrícula'){
            @if(element.aluno){
              {{ element.aluno.matricula }}
            } @else if (element.professor){
              {{ element.professor.matricula }}
            }

          }
          @else{
            {{ element[column.toLocaleLowerCase()] }}
          }
        </td>
      </ng-container>
      }
      <ng-container matColumnDef="expand">
        <th mat-header-cell *matHeaderCellDef aria-label="row actions">
          &nbsp;
        </th>
        <td mat-cell *matCellDef="let element">
          <button
            mat-icon-button
            aria-label="expand row"
            (click)="
              expandedElement = expandedElement === element ? null : element;
              $event.stopPropagation()
            "
          >
            @if (expandedElement === element) {
            <mat-icon>keyboard_arrow_up</mat-icon>
            } @else {
            <mat-icon>keyboard_arrow_down</mat-icon>
            }
          </button>
        </td>
      </ng-container>

      <!-- Expanded Content Column - The detail row is made up of this one column that spans across all columns -->
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
        [class.expanded-row]="expandedElement === element"
        (click)="expandedElement = expandedElement === element ? null : element"
      ></tr>
      <tr
        mat-row
        *matRowDef="let row; columns: ['expandedDetail']"
        class="detail-row"
      ></tr>
    </table>
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
  aluno: Aluno = {
    id: null,
    nome: null,
    matricula: null,
    cpf: null,
    rg: null,
    email: null,
    disciplina: null,
  };
  displayedColumns: string[] = ['Matrícula', 'Nome', 'Cargo', 'E-mail', 'Ações'];
  dataSource: IUsuario[] = [];
  expandedElement: IUsuario | null = null;
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];

  constructor(private usuarioService: UsuarioServiceService) {
    this.findAluno();
  }

  findAluno() {
    this.usuarioService.findAll().subscribe((res) => {
      this.dataSource = res as IUsuario[];
      this.dataSource = this.dataSource.map((item) => {
        return {
          ...item,
          disciplinas: [
            { id: 1, nome: 'Engenharia de Software' },
            { id: 2, nome: 'Qualidade de Software' },
            { id: 2, nome: 'Física I' },
            { id: 2, nome: 'Cálculo Diferencial e Integral II' },
          ],
        };
      });
      console.log(res);
    });
  }

  limpar() {
    this.aluno = {
      id: null,
      nome: null,
      matricula: null,
      cpf: null,
      rg: null,
      email: null,
      disciplina: null,
    };
  }
}
