# LOQ — Locação de máquinas

Projeto da disciplina de Gestão de Projetos — 8º semestre da Faculdade Impacta.

A LOQ é uma plataforma de locação inteligente de máquinas, conectando clientes, proprietários, transportadoras e operadores.

## Tecnologias

React, Vite, Express, tRPC, Drizzle ORM, TypeScript e Tailwind CSS.

## Requisitos

- Node.js instalado. O projeto foi executado com Node.js 24.22.0.
- pnpm 10.18.0, versão fixada pelo projeto em `package.json`.

Instale o pnpm uma vez pelo terminal Bash do VS Code:

```bash
npm install -g pnpm@10.18.0
hash -r
pnpm --version
```

## Instalação

No terminal Bash do VS Code, acesse a pasta do projeto e instale as dependências:

```bash
cd ~/<CAMINHO_D0_ARQUIVO>/Loq-app-feature-mvp-project
pnpm install
```

## Executar em desenvolvimento

Inicie o servidor pelo Bash:

```bash
NODE_ENV=development pnpm exec tsx watch server/_core/index.ts
```

Acesse [http://localhost:3000](http://localhost:3000). Para encerrar o servidor, pressione `Ctrl+C` no terminal.

## Comandos disponíveis

- `pnpm build`: gera `dist/index.js` e `dist/public/`.
- `pnpm start`: inicia o servidor de produção.
- `pnpm db:migrate`: aplica as migrações versionadas.
- `pnpm db:push`: gera e aplica alterações intencionais de schema.
- `pnpm check`: valida a tipagem.
- `pnpm test`: executa os testes.

## MVP

O MVP inclui visões demo para Locatário/Cliente, Proprietário/Locador, Transportadora e Operador, além de um login fictício para troca de persona.

O login demo não persiste dados nem envia informações para serviços externos. A configuração de plataforma é legível e editável por `webdev.config`.
