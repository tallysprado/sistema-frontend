import { Aluno, GenericSelect } from "./aluno.models";

export type Usuario = {
  id: number | null;
  nome: string | null;
  cargo: GenericSelect | null;
  email: string | null;
  senha: string | null;
  cpf: string | null;
  rg: string | null;
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
}

export type Professor = {
  id: number;
  nome: string;
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


