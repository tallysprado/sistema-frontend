import { Aluno, GenericSelect } from "./aluno.models";
import { DisciplinaElement } from "./disciplina.models";

export type Usuario = {
  id: number | null;
  nome: string | null;
  cargo: GenericSelect | null;
  email: string | null;
  senha: string | null;
  cpf: string | null;
  rg: string | null;
  matricula: string | null;
  disciplina: string | null;
}

export interface IUsuario {
  id: number;
  nome: string;
  cargo: Cargo;
  email: string;
  cpf: string;
  rg: string;
  aluno: Aluno | null;
  professor: Professor | null;
  disciplinas: Disciplina[];
  coordenador: Coordenador | null;
  [key: string]: any;

}

export type Professor = {
  id: number;
  nome: string;
  matricula: string;
}

export type Coordenador = {
  id: number;
  nome: string;
  matricula: string;
}

export type Disciplina = {
  id: number;
  nome: string;
}

export enum Cargo {
  ALUNO = 1,
  PROFESSOR = 2,
  COORDENADOR = 3,
}


