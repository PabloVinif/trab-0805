import * as fs from 'fs';
import * as readline from 'readline';
import { Pessoa } from './pessoa.entity';
import { RepositorioDePessoas } from './repositorio-de-pessoas.interface';

export class PessoaCsvAdapter implements RepositorioDePessoas {
  constructor(private caminhoArquivo: string) {}

  async listarPessoas(): Promise<Pessoa[]> {
    const pessoas: Pessoa[] = [];
    const fileStream = fs.createReadStream(this.caminhoArquivo);

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    let isFirstLine = true;

    for await (const line of rl) {
      if (isFirstLine) {
        isFirstLine = false;
        continue;
      }

      const [nome, idadeStr, email] = line.split(',');

      if (nome && idadeStr && email) {
        pessoas.push(new Pessoa(nome.trim(), parseInt(idadeStr.trim(), 10), email.trim()));
      }
    }

    return pessoas;
  }
}
