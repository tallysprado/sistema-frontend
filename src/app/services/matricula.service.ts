import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DisciplinaElement } from '../models/disciplina.models';
import { environment } from '../../environments/environment';

export interface IMatricula {
  idAluno: number | null;
  idDisciplinas: number[];
  status: boolean;
  dataCriacao: Date;
}
@Injectable({
  providedIn: 'root'
})
export class MatriculaService {

  private readonly api = environment.api;

  constructor(private http: HttpClient) { }

  findAllDisciplinas() {
    return this.http.get(`${this.api}/v1/disciplina`);
  }

  matricular(matricula: IMatricula) {
    return this.http.post(`${this.api}/v1/protected/disciplina/matricula`, matricula);
  }

  findDisciplinasMatriculadas(idAluno: number):Observable<DisciplinaElement []> {
    return this.http.get<DisciplinaElement []>(`${this.api}/v1/protected/disciplina/matriculas/${idAluno}`);
  }
}
