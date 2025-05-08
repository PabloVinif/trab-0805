import { Pessoa } from './pessoa.entity';

export interface RepositorioDePessoas {
  listarPessoas(): Promise<Pessoa[]>;
}
