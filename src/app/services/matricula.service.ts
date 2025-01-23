import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface IMatricula {
  idAluno: number | null;
  idDisciplinas: number[];
  status: boolean;
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

  findDisciplinasMatriculadas(idAluno: number) {
    return this.http.get(`http://localhost:8080/v1/disciplina/matriculas/${idAluno}`);
  }
}
