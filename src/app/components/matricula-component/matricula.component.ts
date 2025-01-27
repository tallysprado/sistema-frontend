import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { Aluno, GenericSelect, IAluno } from '../../models/aluno.models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioServiceService } from '../../services/usuario/usuario-service.service';
import { IUsuario, Usuario } from '../../models/usuario.models';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { map, Observable, startWith } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { IMatricula, MatriculaService } from '../../services/matricula.service';
import { DisciplinaElement } from '../../models/disciplina.models';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AlunoServiceService } from '../../services/aluno/aluno-service.service';

@Component({
  selector: 'app-filter',
  providers: [provideNgxMask()],
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatCheckboxModule,
    MatDividerModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    MatAutocompleteModule,
    AsyncPipe,
    CommonModule,
  ],
  template: `
    <div
      class="block card p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
    >
      <h3 class="text-lg font-bold mb-4 ml-4 text-gray-500">
        Matricular aluno
      </h3>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 p-3">
          <div>
            <mat-form-field class="!w-full !m-3">
              <mat-label>Nome</mat-label>
              <input
                size="small"
                matInput
                placeholder="Digite o nome do aluno"
                type="text"
                name="nome"
                style="text-transform: uppercase;"
                formControlName="nome"
                [formControl]="formControl"
                [matAutocomplete]="auto"
              />
              <mat-autocomplete
                #auto="matAutocomplete"
                (optionSelected)="onNameSelected($event.option.value)"
              >
                @for (option of filteredOptions | async; track option) {
                <mat-option [value]="option">{{ option }}</mat-option>
                }
              </mat-autocomplete>
            </mat-form-field>
          </div>

          <div>
            <mat-form-field class="!w-full !m-3">
              <mat-label>Matrícula</mat-label>
              <input
                size="small"
                matInput
                type="text"
                mask="A-9999999"
                name="matricula"
                (input)="onInput($event)"
                style="text-transform: uppercase;"
                formControlName="matricula"
              />
            </mat-form-field>
          </div>
        </div>

        <mat-divider></mat-divider>

        <ng-container
          *ngIf="dataSource && dataSource.data.length > 0 && usuario != null"
        >
          <mat-form-field class="!w-full !m-0 !p-0">
            <mat-label>Filtro</mat-label>
            <input
              matInput
              (keyup)="applyFilter($event)"
              placeholder="Digite o nome da disciplina"
              #input
            />
          </mat-form-field>
          <table
            mat-table
            [dataSource]="dataSource"
            class="overflow-y-auto mat-elevation-z8"
          >
            <ng-container matColumnDef="select">
              <th mat-header-cell *matHeaderCellDef>
                <mat-checkbox
                  (change)="$event ? toggleAllRows() : null"
                  [checked]="selection.hasValue() && isAllSelected()"
                  [indeterminate]="selection.hasValue() && !isAllSelected()"
                  [aria-label]="checkboxLabel()"
                >
                </mat-checkbox>
              </th>
              <td mat-cell *matCellDef="let row">
                <mat-checkbox
                  (click)="$event.stopPropagation()"
                  (change)="onCheckboxChange($event, row)"
                  [checked]="selection.isSelected(row)"
                  [aria-label]="checkboxLabel(row)"
                >
                </mat-checkbox>
              </td>
            </ng-container>

            <ng-container matColumnDef="nome">
              <th mat-header-cell *matHeaderCellDef>Nome</th>
              <td mat-cell *matCellDef="let element">{{ element.nome }}</td>
            </ng-container>

            <ng-container matColumnDef="descricao">
              <th mat-header-cell *matHeaderCellDef>Descrição</th>
              <td mat-cell *matCellDef="let element">
                {{ element.descricao }}
              </td>
            </ng-container>

            <ng-container matColumnDef="carga">
              <th mat-header-cell *matHeaderCellDef>Carga Horária</th>
              <td mat-cell *matCellDef="let element">
                {{ element.cargaHoraria }}
              </td>
            </ng-container>

            <ng-container matColumnDef="dataCriacao">
              <th mat-header-cell *matHeaderCellDef>Data Matrícula</th>
              <td mat-cell *matCellDef="let element">
                <div *ngIf="element.dataCriacao">
                  {{ element.dataCriacao | date : 'dd/MM/yyyy' }}
                </div>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr
              mat-row
              *matRowDef="let row; columns: displayedColumns"
              (click)="selection.toggle(row)"
            ></tr>
          </table>
        </ng-container>

        <div class="flex justify-end mt-4">
          <button
            mat-flat-button
            mat-dialog-close
            class="mr-5"
            type="button"
            (click)="limpar()"
          >
            Limpar
          </button>
          <button mat-flat-button type="submit">Salvar</button>
        </div>
      </form>
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
    @media (max-width: 768px) {
      .mobile-cols-1 {
        grid-template-columns: repeat(1, 1fr);
      }
    }
  `,
})
export class MatriculaComponent implements OnInit {
  form: FormGroup;
  formControl = new FormControl('');
  dataSource = new MatTableDataSource<DisciplinaElement>([]);
  private _snackBar = inject(MatSnackBar);
  options: string[] = [];
  optionsUsuario: (IUsuario | null)[] = [];
  displayedColumns: string[] = [
    'select',
    'nome',
    'descricao',
    'carga',
    'dataCriacao',
  ];
  selection = new SelectionModel<DisciplinaElement>(true, []);
  usuario: IUsuario | null | undefined;
  filteredOptions!: Observable<string[]>;
  disciplinasMatriculadas: DisciplinaElement[] = [];

  cargos: GenericSelect[] = [
    { value: 0, viewValue: 'ALUNO' },
    { value: 1, viewValue: 'PROFESSOR' },
    { value: 2, viewValue: 'COORDENADOR' },
  ];
  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioServiceService,
    private matriculaService: MatriculaService,
    private dialog: MatDialog,
    private alunoService: AlunoServiceService
  ) {
    this.form = this.fb.group({
      nome: [''],
      matricula: ['A - '],
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onCheckboxChange(event: MatCheckboxChange, row: DisciplinaElement): void {
    event.source.checked = this.selection.isSelected(row);

    if (!event.checked && this.selection.isSelected(row)) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Confirmar remoção de seleção',
          message: `Tem certeza que deseja remover a disciplina "${row.nome}"?`,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.selection.deselect(row);
          event.source.checked = false;
        } else {
          event.source.checked = true;
        }
      });
    } else if (event.checked) {
      this.selection.select(row);
    }
  }

  openConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar remoção de matrícula',
        message: 'Tem certeza que deseja remover o aluno da disciplina?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed', result);
    });
  }

  onNameSelected(selectedName: string) {
    this.usuario = this.optionsUsuario.find((u) => u?.nome === selectedName);
    if (this.dataSource.data.length === 0) {
      this.obterDisciplinas();
    }
    if (this.usuario) {
      this.matriculaService
        .findDisciplinasMatriculadas(this.usuario.aluno?.id ?? 0)
        .subscribe((matriculadas) => {
          this.disciplinasMatriculadas = matriculadas as DisciplinaElement[];

          this.matriculaService
            .findAllDisciplinas()
            .subscribe((todasDisciplinas) => {
              const disciplinasOrdenadas = [
                ...this.disciplinasMatriculadas,
                ...this.dataSource.data.filter(
                  (disciplina) =>
                    !this.disciplinasMatriculadas.some(
                      (mat) => mat.id === disciplina.id
                    )
                ),
              ];

              this.dataSource.data = disciplinasOrdenadas;

              this.selection.clear();
              this.selection.select(...this.disciplinasMatriculadas);
            });
        });

      this.form
        .get('matricula')
        ?.setValue(
          this.usuario.aluno?.matricula?.charAt(0) +
            '-' +
            this.usuario.aluno?.matricula?.slice(1)
        );
    }
  }

  ngOnInit() {
    this.filteredOptions = this.formControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
    this.obterDisciplinas();
    this.usuarioService.findAll().subscribe((res) => {
      this.optionsUsuario = res
        .filter((usuario) => usuario.aluno)
        .map((usuario) => usuario);

      this.options = res
        .filter((usuario) => usuario.aluno)
        .map((usuario) => usuario.nome);
    });
  }

  private obterDisciplinas() {
    this.matriculaService.findAllDisciplinas().subscribe((res) => {
      this.dataSource.data = res as DisciplinaElement[];
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  showSuccess() {
    this._snackBar.open('Dados salvos com sucesso', 'Fechar', {
      duration: 3000,
      panelClass: ['success-snackbar'],
    });
  }
  showError() {
    this._snackBar.open('Erro ao matricular aluno', 'Fechar', {
      duration: 3000,
      panelClass: ['error-snackbar'],
    });
  }
  showErrorMessage(message: string) {
    this._snackBar.open('Erro ao matricular aluno: ' + message, 'Fechar', {
      duration: 3000,
      panelClass: ['error-snackbar'],
    });
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      if (this.selection.selected.length > 0) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          data: {
            title: 'Confirmar remoção de matrícula',
            message:
              'Tem certeza que deseja remover o aluno das disciplinas selecionadas?',
          },
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.selection.clear();
          }
        });
      } else {
        this.selection.clear();
      }
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: DisciplinaElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }
  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let currentValue = inputElement.value;

    if (!currentValue.startsWith('A-')) {
      currentValue = 'A-' + currentValue.replace(/^A-*/, ''); // Remove duplicatas e corrige
    }

    if (currentValue.length < 2) {
      currentValue = 'A-';
    }

    this.form.get('matricula')?.setValue(currentValue, { emitEvent: false });
    inputElement.value = currentValue;
  }
  onSubmit() {
    if (this.usuario?.aluno?.id == null) {
      this.showErrorMessage('Aluno não encontrado');
      return;
    }
    const matricula: IMatricula = {
      idAluno: this.usuario?.aluno?.id ?? null,
      idDisciplinas: this.selection.selected.map((disciplina) => disciplina.id),
      status: true,
      dataCriacao: new Date(),
    };
    this.matriculaService.matricular(matricula).subscribe((res) => {
      this.showSuccess();
    });
    this.limpar();
  }
  limpar() {
    this.form.reset();
    this.dataSource.filter = '';
    this.dataSource.data = [];
    this.selection.clear();
    this.disciplinasMatriculadas = [];
    this.usuario = null;
    this.obterDisciplinas();
    this.form.controls['matricula'].setValue('A - ');
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      control?.setErrors(null);
      control?.markAsPristine();
      control?.markAsUntouched();
    });
  }
}
