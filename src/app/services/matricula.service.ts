import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DisciplinaElement } from '../models/disciplina.models';

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

  constructor(private http: HttpClient) { }

  findAllDisciplinas() {
    return this.http.get(`http://localhost:8080/v1/disciplina`);
  }

  matricular(matricula: IMatricula) {
    return this.http.post(`http://localhost:8080/v1/disciplina/matricula`, matricula);
  }

  findDisciplinasMatriculadas(idAluno: number):Observable<DisciplinaElement []> {
    return this.http.get<DisciplinaElement []>(`http://localhost:8080/v1/disciplina/matriculas/${idAluno}`);
  }
}
