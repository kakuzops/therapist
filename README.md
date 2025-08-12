# therapist

Projeto Next.js com Prisma e PostgreSQL via Docker.

## Passos para configurar o ambiente

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repo>
   cd therapist
   ```

2. **Suba o banco de dados com Docker Compose:**
   ```bash
   docker-compose up -d
   ```
   Isso irá iniciar um container PostgreSQL acessível em `localhost:5432`.

3. **Configure o arquivo `.env`:**
   Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
   ```env
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/therapist_db
   # Adicione outras variáveis conforme necessário
   ```

4. **Instale as dependências:**
   Você pode usar qualquer gerenciador de pacotes:
   ```bash
   npm install
   # ou
   pnpm install
   # ou
   bun install
   ```

5. **Gere o cliente Prisma e rode as migrations:**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

6. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   # ou
   pnpm dev
   # ou
   bun dev
   ```

7. **Acesse a aplicação:**
   Abra [http://localhost:3000](http://localhost:3000) no navegador.

---

## Estrutura principal
- Código fonte: `src/`
- Rotas API: `src/app/api/`
- Componentes UI: `src/components/ui/`
- Prisma: `prisma/schema.prisma` e `prisma/migrations/`

## Observações
- O banco de dados é inicializado via Docker Compose.
- O arquivo `.env` é essencial para conectar ao banco.
- Use os comandos acima para garantir que as migrations estejam aplicadas antes de iniciar o servidor.
