import { PessoaCsvAdapter } from './pessoa/pessoa-csv.adapter';

async function bootstrap() {
  const adapter = new PessoaCsvAdapter('pessoas.csv');
  const pessoas = await adapter.listarPessoas();

  pessoas.forEach((p) => {
    console.log(`${p.nome} (${p.idade} anos) - ${p.email}`);
  });
}

bootstrap();
