# Projeto Avanti - Troca de Conhecimentos 🚀

Este é o backend unificado para a plataforma de troca de conhecimentos, desenvolvido com **Node.js**, **Express**, **Prisma ORM** e **PostgreSQL**.

## 🛠️ Tecnologias
- **Node.js** (Ambiente de execução)
- **Express** (Framework web)
- **Prisma** (ORM para comunicação com o banco)
- **PostgreSQL** (Banco de dados relacional)

## 📋 Como Rodar o Projeto
1. Certifique-se de que o PostgreSQL está rodando.
2. Configure o arquivo `.env` com sua string de conexão.
3. Instale as dependências: `npm install`
4. Sincronize o banco de dados: `npx prisma db push`
5. Inicie o servidor: `node server.js`

## 🛣️ Rotas Principais
- **Categorias**: `POST /categorias` | `GET /categorias`
- **Pessoas**: `POST /pessoas` | `GET /pessoas`
- **Ofertas**: `POST /ofertas` | `GET /ofertas` | `DELETE /ofertas/:id`