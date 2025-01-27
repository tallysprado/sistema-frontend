import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  imports: [
    MatDialogModule
  ],
  template: `
    <h2 mat-dialog-title>Detalhes do Usuário</h2>
    <mat-dialog-content>
      <p><strong>Nome:</strong> {{ data.nome }}</p>
      <p><strong>Matrícula:</strong> {{ data.matricula }}</p>
      <p><strong>E-mail:</strong> {{ data.email }}</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Fechar</button>
    </mat-dialog-actions>
  `,
})
export class ModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
