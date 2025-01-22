import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { Aluno, GenericSelect } from '../../models/aluno.models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
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
import { AsyncPipe } from '@angular/common';
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
  providers: [provideNgxMask()],
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatDividerModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    MatAutocompleteModule,
    AsyncPipe,
  ],
  template: `
    <div
      class="block card p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
    >
      <h3 class="text-lg font-bold mb-4 ml-4 text-gray-500">
        Matricular aluno
      </h3>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
              <mat-autocomplete #auto="matAutocomplete" (optionSelected)="onNameSelected($event.option.value)">
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
        <div class="flex justify-end mt-3">
          <button mat-flat-button class="mr-3" type="submit">Salvar</button>
          <button
            mat-flat-button
            mat-dialog-close
            type="button"
            (click)="limpar()"
          >
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
  private _snackBar = inject(MatSnackBar);
  options: string[] = [];
  optionsUsuario: (IUsuario | null)[] = [];
  aluno: IUsuario | null = null;

  filteredOptions!: Observable<string[]>;

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
      nome: [''],
      matricula: ['A - '],
    });

  }

  onNameSelected(selectedName: string) {
    const usuario = this.optionsUsuario.find((u) => u?.nome === selectedName);
    if (usuario) {
      this.form.get('matricula')?.setValue(usuario.aluno?.matricula?.charAt(0) + '-' + usuario.aluno?.matricula?.slice(1));
    }
  }

  ngOnInit() {
    this.filteredOptions = this.formControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
    this.usuarioService.findAll().subscribe((res) => {

      this.optionsUsuario = res.filter(usuario => usuario.aluno).map(usuario => usuario);

      this.options = res
        .filter((usuario) => usuario.aluno)
        .map((usuario) => usuario.nome);
    });

  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
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
  showErrorMessage(message: string) {
    this._snackBar.open('Erro ao criar usuário: ' + message, 'Fechar', {
      duration: 3000,
      panelClass: ['error-snackbar'],
    });
  }
  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let currentValue = inputElement.value;

    // Garante que o valor sempre comece com "A-"
    if (!currentValue.startsWith('A-')) {
      currentValue = 'A-' + currentValue.replace(/^A-*/, ''); // Remove duplicatas e corrige
    }

    // Impede que o prefixo "A-" seja apagado
    if (currentValue.length < 2) {
      currentValue = 'A-';
    }

    // Atualiza o valor do formulário
    this.form.get('matricula')?.setValue(currentValue, { emitEvent: false });
    inputElement.value = currentValue;
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
          if (err.error.message !== undefined) {
            this.showErrorMessage(err.error.message);
          } else {
            this.showError();
          }
        },
      });
    } else {
      console.log('Formulário inválido');
      if (this.form.controls['cpf'].invalid) {
        this.form.controls['cpf'].setErrors({ invalid: true });
        this.form.controls['cpf'].markAsTouched();
        this.form.controls['cpf'].markAsDirty();
        this.form.controls['cpf'].updateValueAndValidity();
        this._snackBar.open('CPF inválido', 'Fechar', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      }
      if (this.form.controls['rg'].invalid) {
        this.form.controls['rg'].setErrors({ invalid: true });
        this.form.controls['rg'].markAsTouched();
        this.form.controls['rg'].markAsDirty();
        this.form.controls['rg'].updateValueAndValidity();
        this._snackBar.open('RG inválido', 'Fechar', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      }
      if (this.form.controls['email'].invalid) {
        this.form.controls['email'].setErrors({ invalid: true });
        this.form.controls['email'].markAsTouched();
        this.form.controls['email'].markAsDirty();
        this.form.controls['email'].updateValueAndValidity();
        this._snackBar.open('E-mail inválido', 'Fechar', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      }
      if (this.form.controls['nome'].invalid) {
        this.form.controls['nome'].setErrors({ invalid: true });
        this.form.controls['nome'].markAsTouched();
        this.form.controls['nome'].markAsDirty();
        this.form.controls['nome'].updateValueAndValidity();
        this._snackBar.open('Nome inválido', 'Fechar', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      }
      if (this.form.controls['cargo'].invalid) {
        this.form.controls['cargo'].setErrors({ invalid: true });
        this.form.controls['cargo'].markAsTouched();
        this.form.controls['cargo'].markAsDirty();
        this.form.controls['cargo'].updateValueAndValidity();
        this._snackBar.open('Cargo inválido', 'Fechar', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      }
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
