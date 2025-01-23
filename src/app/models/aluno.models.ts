import { Disciplina, IUsuario, Usuario } from "./usuario.models";

export type Aluno = {
  id: number | null;
  nome: string | null;
  matricula: string | null;
  cpf: string | null;
  rg: string | null;
  email: string | null;
  disciplina: string | null;
  disciplinas: Disciplina[];
}

export interface IAluno  {
  usuario: Usuario | null;
  id: number | null;
  matricula: string | null;
}

export type GenericSelect = {
  value: number;
  viewValue: string;
}

