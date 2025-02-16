export interface User {
  id?: number;
  nome: string;
  email: string;
  telefone: string;
  data_nascimento: string;
}

export interface NewUser {
  nome: string;
  email: string;
  telefone: string;
  data_nascimento: string;
}
