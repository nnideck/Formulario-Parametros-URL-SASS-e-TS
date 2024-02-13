export interface Ideparts {
  id: number;
  nome: string;
}

export interface Iuser {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  nascimento: number;
  cpf: number;
  celular: number;
  sexo: string;
  foto: string;
  documentos?: Idocuments;
  notas: string;
  receber_ofertas: string;
  interesses: number[];
}

export interface Idocuments {
  id: number;
  nome: string;
  arquivo: string;
  usuarios_id: number;
}

export interface Iaddress {
  id: number;
  nome: string;
  rua: string;
  numero: number;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: number;
  usuarios_id: number;
}
