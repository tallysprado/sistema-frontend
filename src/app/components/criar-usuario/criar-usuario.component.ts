import { Component, inject, OnInit, ViewChild } from '@angular/core';
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
import { IUsuario, Usuario } from '../../models/usuario.models';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

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
    CommonModule,
  ],
  template: `
    <div
      class="block card p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
    >
      <h3 class="text-lg font-bold mb-4 ml-4 text-gray-500">
        {{ action }} usuário
      </h3>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 p-3">
          <div>
            <mat-form-field class="!w-full !m-3">
              <mat-label>Nome</mat-label>
              <input
                size="small"
                matInput
                type="text"
                name="nome"
                style="text-transform: uppercase;"
                formControlName="nome"
              />
            </mat-form-field>
          </div>

          <div>
            <mat-form-field class="!w-full !m-3">
              <mat-label>Cargo</mat-label>
              <mat-select
              [disabled]="action === 'Editar'"

              formControlName="cargo" name="cargo">
                @for (cargo of cargos; track cargo) {
                <mat-option
                [disabled]="action === 'Editar'"
                [value]="cargo.value">{{
                  cargo.viewValue
                }}</mat-option>
                }
              </mat-select>
            </mat-form-field>
          </div>

          <div>
            <mat-form-field class="!w-full !m-3">
              <mat-label>CPF</mat-label>
              <input
                size="small"
                name="cpf"
                matInput
                type="text"
                mask="999.999.999-99"
                formControlName="cpf"
              />
              <mat-error
                *ngIf="
                  form.controls['cpf'].invalid && form.controls['cpf'].touched
                "
              >
                CPF inválido
              </mat-error>
            </mat-form-field>
          </div>

          <div>
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
          </div>

          <div>
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
          </div>
        </div>

        <mat-divider></mat-divider>
        <div class="flex justify-end mt-3">
          <button
            mat-flat-button
            mat-dialog-close
            type="button"
            class="mr-5"
            (click)="limpar()"
          >
            Limpar
          </button>
          <button mat-flat-button  type="submit">Salvar</button>

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
export class CriarUsuarioComponent implements OnInit {
  form: FormGroup;
  private _snackBar = inject(MatSnackBar);
  action: string = 'Criar';
  userId: number | null = null;
  cargos: GenericSelect[] = [
    { value: 0, viewValue: 'ALUNO' },
    { value: 1, viewValue: 'PROFESSOR' },
    { value: 2, viewValue: 'COORDENADOR' },
  ];
  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioServiceService,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cargo: ['', Validators.required],
      cpf: [''],
      rg: [''],
      email: ['', Validators.email],
    });
  }
  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userId = Number(userId);
      this.action = 'Editar';
      this.usuarioService.findById(Number(userId)).subscribe((res) => {
        this.form.reset();
        this.form.patchValue(res);
        this.form.controls['cargo'].setValue(
          this.cargos.find((cargo) => cargo.viewValue === res.cargo.toString())
            ?.value
        );
      });
    }
  }
  showSuccess() {
    this._snackBar.open('Usuário criado com sucesso', 'Fechar', {
      duration: 3000,
      panelClass: ['success-snackbar'],
    });
  }
  showSuccessEdit() {
    this._snackBar.open('Usuário atualizado com sucesso', 'Fechar', {
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
  onSubmit() {
    if (this.userId != null) {
      this.usuarioService.updateUsuario(this.userId, this.form.value).subscribe({
        next: (res) => {
          this.showSuccessEdit();
        },
        error: (err) => {
          this.showError();
        },
      });
    } else {
      console.log(this.form.value);
      if (this.form.valid) {
        if (this.form.controls['cpf'].value.length !== 11) {
          this.form.controls['cpf'].setErrors({ invalid: true });
          this.form.controls['cpf'].markAsTouched();
          this.form.controls['cpf'].markAsDirty();
          this.form.controls['cpf'].updateValueAndValidity();
          this._snackBar.open('CPF inválido', 'Fechar', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
        } else {
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
        }
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
      this.limpar();
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
