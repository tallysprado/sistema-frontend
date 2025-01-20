import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Aluno } from '../../models/aluno.models';

@Injectable({
  providedIn: 'root'
})
export class AlunoServiceService {
  private url = environment.api;

  constructor(private httpClient: HttpClient) {
   }

   save(aluno: Aluno){
    return this.httpClient.post(`${this.url}/aluno`, aluno);
   }

  findAll(){
    return this.httpClient.get(`${this.url}/aluno`);
  }
}
