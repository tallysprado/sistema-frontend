import { Component, inject, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { Aluno, GenericSelect } from '../../models/aluno.models';
import { MatSnackBar } from '@angular/material/snack-bar';
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
import { Usuario } from '../../models/usuario.models';
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
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  template: `
    <div
      class="block card p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
    >
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <mat-grid-list cols="2" class="!w-full" rowHeight="100px">
          <mat-grid-tile>
            <mat-form-field class="!w-full !m-3">
              <mat-label>Nome</mat-label>
              <input
                size="small"
                matInput
                type="text"
                name="nome"
                formControlName="nome"
              />
            </mat-form-field>
          </mat-grid-tile>

          <mat-grid-tile>
            <mat-form-field class="!w-full !m-3">
              <mat-label>Cargo</mat-label>
              <mat-select formControlName="cargo" name="cargo">
                @for (cargo of cargos; track cargo) {
                <mat-option [value]="cargo.value">{{
                  cargo.viewValue
                }}</mat-option>
                }
              </mat-select>
            </mat-form-field>
          </mat-grid-tile>

          <mat-grid-tile>
            <mat-form-field class="!w-full !m-3">
              <mat-label>CPF</mat-label>
              <input
                size="small"
                name="cpf"
                matInput
                type="text"
                formControlName="cpf"
              />
            </mat-form-field>
          </mat-grid-tile>

          <mat-grid-tile>
            <mat-form-field class="!w-full !m-3">
              <mat-label>RG</mat-label>
              <input
                size="small"
                matInput
                type="text"
                name="rg"
                formControlName="rg"
              />
            </mat-form-field>
          </mat-grid-tile>

          <mat-grid-tile>
            <mat-form-field class="!w-full !m-3">
              <mat-label>E-mail</mat-label>
              <input
                size="small"
                matInput
                type="text"
                name="email"
                formControlName="email"
              />
            </mat-form-field>
          </mat-grid-tile>
        </mat-grid-list>

        <mat-divider></mat-divider>
        <div class="flex justify-end mt-3">
          <button mat-flat-button class="mr-3" type="submit" >Salvar</button>
          <button mat-flat-button mat-dialog-close type="button" (click)="limpar()">
            Limpar
          </button>
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
  `,
})
export class CriarUsuarioComponent {
  form: FormGroup;
  private _snackBar = inject(MatSnackBar);

  cargos: GenericSelect[] = [
    { value: 0, viewValue: 'ALUNO' },
    { value: 1, viewValue: 'PROFESSOR' },
    { value: 2, viewValue: 'COORDENADOR' },
  ];
  dataSource = ELEMENT_DATA;
  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioServiceService
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cargo: ['', Validators.required],
      cpf: [''],
      rg: [''],
      email: ['', Validators.email],
    });
  }
  showSuccess() {
    this._snackBar.open('Usuário criado com sucesso', 'Fechar', {
      duration: 3000,
      panelClass: ['success-snackbar'],
    });
  }
  showError() {
    this._snackBar.open('Erro ao criar usuário', 'Fechar', {
      duration: 3000,
      panelClass: ['error-snackbar'],
    });
  }
  onSubmit() {
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('Formulário válido');
      const formData = this.form.value;
      this.usuarioService.criarUsuario(formData).subscribe({
        next: (res) => {
          console.log(res);
          this.showSuccess();
        },
        error: (err) => {
          console.log(err);
          this.showError();
        },
      });
    } else {
      console.log('Formulário inválido');
    }
  }
  limpar() {
    this.form.reset();
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      control?.setErrors(null);
      control?.markAsPristine();
      control?.markAsUntouched();
    });
  }
}
