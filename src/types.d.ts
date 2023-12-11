

export interface Idepartamentos 
    {
      id: number,
      nome: string
    }

export interface Iusuario {
  
          id: number,
          nome: string,
          sobrenome: string
          email: string,
          nascimento: number,
          cpf: number,
          celular: number,
          sexo: string,
          receber_ofertas: string,
          interesses: number[],
          foto: string
}