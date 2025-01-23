import { Component } from '@angular/core';

@Component({
  selector: 'app-forbidden',
  imports: [],
  template: `
    <div class="flex justify-center items-center mt-5 flex-col">
      <h1 class="text-4xl font-bold">Acesso negado</h1>
      <h2 class="text-lg mt-5">Você não tem permissão para acessar esta página.</h2>
    </div>
  `,
  styles: ``
})
export class ForbiddenComponent {

}
