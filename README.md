
<h1 align="center">
  GymPass
</h1>

<h3 align="center">
  Essa API tem como objetivo a realização de check-in em uma academia.
</h3>

## 🚀 Tecnologias

Principais tecnologias usadas para desenvolver esta API

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Fastify](https://www.fastify.io/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Zod](https://github.com/colinhacks/zod)
- [DayJs](https://day.js.org/)

## Requisitos Funcionais

- [x] Deve ser possivel se cadastrar.
- [x] Deve ser possivel se autenticar.
- [x] Deve ser possivel obter o perfil de um usuario logado.
- [x] Deve ser possivel obter o numero de check-ins realizado pelo usuario logado.
- [x] Deve ser possivel o usuario obter o seu historico de check-ins.
- [x] Deve ser possivel o usuario buscar academia mais proximas (ate 10km).
- [x] Deve ser possivel o usuario buscar academias pelo nome.
- [x] Deve ser possivel o usuario realizar check-in em uma academia.
- [x] Deve ser possivel validar o check-in de um usuario.
- [x] Deve ser possivel cadastrar uma academia.

## Regras de Negocio

- [x] Usuario nao deve poder se cadastrar com um e-mail duplicado.
- [x] O usuario nao pode fazer 2 check-ins no mesmo dia.
- [x] O usuario nao pode fazer check-in se nao estiver perto (100m) da academia.
- [x] O check-in soh pode ser validado ate 28 minutos apos criado.
- [x] O check-in soh pode ser validado por administradores.
- [x] A academia soh pode ser cadastrada por ADM.

## Requisitos nao funcionais

- [x] A senha do usuario precisa estar criptografada.
- [x] Os dados da aplicacao precisam estar persistidos em um bando PostgresSQL.
- [x] Todas listas de dados precisam estar paginados com 20 itens por pagina.
- [x] O usuario deve ser identificado por um JWT.
