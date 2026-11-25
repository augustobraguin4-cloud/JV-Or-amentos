# Gestão de Orçamentos — JV Serviços e Soluções

Sistema de orçamentos com banco de dados (Postgres) e hospedagem na Vercel.

## Estrutura

```
public/index.html   → tela do sistema (o que o usuário vê)
api/orcamentos.js   → API que lê e grava no banco (função serverless)
schema.sql          → cria a tabela no banco (rodar uma vez)
package.json        → dependência do banco
```

## Passo a passo para colocar no ar

### 1. Subir o projeto no GitHub
1. Crie uma conta em https://github.com (se não tiver).
2. Clique em **New repository**, marque **Private** e crie.
3. Na página do repositório, clique em **uploading an existing file** e arraste **todos os arquivos e pastas** desta pasta (incluindo `api` e `public`).
4. Clique em **Commit changes**.

### 2. Criar o projeto na Vercel
1. Crie uma conta em https://vercel.com usando o login do GitHub.
2. Clique em **Add New… → Project** e escolha o repositório `jv-orcamentos`.
3. **Ainda não clique em Deploy.** Antes, faça os passos 3 e 4.

### 3. Criar o banco de dados
1. No painel da Vercel, abra a aba **Storage** (ou **Marketplace**) e escolha **Postgres** (Neon).
2. Crie o banco e **conecte-o ao projeto** `jv-orcamentos`.
3. A Vercel vai criar automaticamente a variável `DATABASE_URL` (ou `POSTGRES_URL`) no projeto.

### 4. Definir a senha de acesso
1. No projeto, vá em **Settings → Environment Variables**.
2. Crie a variável:
   - **Name:** `SENHA_APP`
   - **Value:** a senha que o seu pai vai usar (escolha algo difícil de adivinhar).
3. Salve.

### 5. Criar a tabela
1. No painel do banco (Storage → seu banco), abra **Query** ou **SQL Editor**.
2. Cole o conteúdo do arquivo `schema.sql` e execute.
3. Deve aparecer uma mensagem de sucesso. Pode executar de novo sem problema.

### 6. Publicar
1. Volte em **Deployments** e clique em **Deploy** (ou **Redeploy**, se já tiver tentado antes).
2. Quando terminar, a Vercel mostra um link (algo como `jv-orcamentos.vercel.app`).
3. Abra o link, digite a senha e pronto.

## Uso no dia a dia
- Os orçamentos são salvos no banco automaticamente ao clicar em **Salvar orçamento**.
- O indicador no canto inferior da lateral mostra se está conectado ao banco.
- Faça **Exportar backup** de vez em quando: é um arquivo de segurança guardado no computador.

## Segurança
- Não compartilhe o link com pessoas de fora da empresa.
- Para trocar a senha, altere `SENHA_APP` em **Settings → Environment Variables** e faça um **Redeploy**.
- O navegador guarda a senha após o primeiro acesso naquele aparelho. Use o botão **Sair** em computadores que não são seus.

## Rodar no computador (opcional, para testes)
Com Node.js instalado:
```
npm install
npx vercel dev
```
É preciso criar um arquivo `.env.local` com `DATABASE_URL=...` e `SENHA_APP=...`.
