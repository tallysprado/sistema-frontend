import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Aluno, IAluno } from '../../models/aluno.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlunoServiceService {
  private url = environment.api;

  constructor(private httpClient: HttpClient) {}

  save(aluno: Aluno) {
    return this.httpClient.post(`${this.url}/v1/aluno`, aluno);
  }

  findAll() {
    return this.httpClient.get(`${this.url}/v1/aluno`);
  }

  findByMatricula(matricula: string): Observable<IAluno> {
    return this.httpClient.get<IAluno>(`${this.url}/v1/aluno/matricula/${matricula}`);
  }
}
