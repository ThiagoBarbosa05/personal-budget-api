![Logo](./public/logo.png)


# Personal Budget Api 

API de orçamento pessoal construída com Node.js e TypeScript. Esta API permite que os usuários criem, atualizem e recuperem informações sobre seus orçamentos. Esse projeto foi construído usando o acrônimo SOLID e a abordagem de desenvolvimento TDD, "Test-Driven Development" (Desenvolvimento Orientado a Testes). 

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](/LICENSE)

## 🛠 Tecnologias

Tecnologias utilizadas para construir esse Projeto

  + Dependências de desenvolvimento

      - [TypeScript](https://www.typescriptlang.org/)
      - [Eslint](https://eslint.org/)
      - [Supertest](https://www.npmjs.com/package/supertest)
      - [Vitest](https://vitest.dev/)
      - [Docker](https://www.docker.com/)
   
  + Dependências de produção

      - [Prisma](https://www.prisma.io/)
      - [Express](https://expressjs.com/)
      - [bcryptjs](https://www.npmjs.com/package/bcryptjs)
      - [body-parser](https://www.npmjs.com/package/body-parser)
      - [cookie-parser](https://www.npmjs.com/package/cookie-parser)
      - [dayjs](https://day.js.org/)
      - [dotenv](https://www.npmjs.com/package/dotenv)
      - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
      - [zod](https://zod.dev/)
          
## Instalação

```bash
  # clone o repositório do projeto
  git clone https://github.com/ThiagoBarbosa05/personal-budget-api.git

  # Entre no diretório do projeto clonado
  cd personal-budget-api

  # Instale as dependências do projeto
  npm install

  # Inicialize o banco de dados em sua máquina
  docker-compose up -d

  ## Se não estiver o docker instalado na sua máquina pode seguir o guia de instalação
  ## disponível no site oficial do docker ou pode usar 
  ## o banco de dados relacional de sua preferência


  ## Rode as migrations para o banco de dados
  npx prisma migrate dev

  ## Por fim para rodar o projeto
  npm run dev

  ## A aplicação estará rodando em http://localhost:4000
```
    
## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar algumas variáveis de ambiente no arquivo `.env`

+ Conexão com o banco de dados: `DATABASE_URL="postgresql://postgres:postgres@localhost:5432/personalbudget?schema=public"`

+ Segredo JWT: `SECRET_KEY_JWT="digite_aqui_seu_segredo"`

## Rodando os testes

Para rodar os testes, siga os seguintes passos:

```bash
  # Para rodar os testes unitários
  npm run test

  # Para rodar os testes end-to-end
  npm run test:e2e

  # Obs: Os testes end-to-end não irá popular seu banco de dados.
```

## Estrutura do Projeto
  
  - `controllers`: Requisições HTTP.
  - `env`: Validação das variáveis de ambiente.
  - `repositories`: Contém a lógica para interagir com o banco de dados.
  - `types`: Contém os tipos typescript usados na aplicação.
  - `use-case`: Contém a lógica de negócios da aplicação.

## Banco de dados

Este projeto usa Prisma como ORM e PostgreSQL como banco de dados. A configuração do banco de dados pode ser encontrada no arquivo prisma/schema.prisma.

## Documentação da API

### Registra um usuário

```
  POST /register
```
+ Request (application/json)

    + Body

      ```json
        {
          "username": "John Doe",
          "email": "Johndoe@email.com",
          "password": "javascript",
        }
      ```
+ Response 201
  
    + Body

      ```json
      {
        "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5NWI0N2I1ZS02N2NjLTQxMDktOGU5OS1hZWExMzMxZjA5M2UiLCJpYXQiOjE3MDUwOTczMzcsImV4cCI6MTcwNTA5NzkzN30.MhixDbV-eSca4JFTPhiPM_k1OjJxs8erX6MdQkL-fBc",
        "refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5NWI0N2I1ZS02N2NjLTQxMDktOGU5OS1hZWExMzMxZjA5M2UiLCJpYXQiOjE3MDUwOTczMzd9.cGZRta_fQ8j7XuZCrhTE9twkOtktzvQx9c-vdhO_brU"
      }
      ```
    
    + Header 
      ```
          Set-Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiT1JHIiwic3ViIjoiNTNhN2I0NGItYjQ4YS00MjBiLWEyYWQtNmJiOTEwMjZlNTgwIiwiaWF0IjoxNzA0NzUxNTUyLCJleHAiOjE3MDUzNTYzNTJ9.lkFRkXmxMh92ubjBwGAQGyNRMG2QHpci0ay3jCuDP7M; 
          Path=/; 
          Secure; 
          HttpOnly;
      ```

### Autentica o usuário

```
  POST /login
```

+ Request (application/json)

    + Body

      ```json
        {
          "email": "Johndoe@email.com",
          "password": "javascript",
        }
      ```
+ Response 200
  
    + Body

      ```json
          {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwMmE4NjBiZC1iMWVkLTRkZjgtOWMwOS02MjUzMzJkMWQyZjkiLCJpYXQiOjE3MDUwOTc0MjAsImV4cCI6MTcwNTA5ODAyMH0.iZxHCSOaxwMdKdQRKEfAS7TIvZrDf1v9urwCYK6Xg4U",
            "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwMmE4NjBiZC1iMWVkLTRkZjgtOWMwOS02MjUzMzJkMWQyZjkiLCJpYXQiOjE3MDUwOTc0MjB9.MC-VvxcUIW13748cdtJbPZLNkc5AJ4XXjxnBszTxr8Q"
          }
      ```
    
    + Header 
      ```
          Set-Cookie: refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiT1JHIiwic3ViIjoiNTNhN2I0NGItYjQ4YS00MjBiLWEyYWQtNmJiOTEwMjZlNTgwIiwiaWF0IjoxNzA0NzUxNTUyLCJleHAiOjE3MDUzNTYzNTJ9.lkFRkXmxMh92ubjBwGAQGyNRMG2QHpci0ay3jCuDP7M; 
          Path=/; 
          Secure; 
          HttpOnly;
      ```

### Refresh token do usuário

```
  POST /refresh-token
```

+ Request (application/json)

    + Body
  
  ```json
    {
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwMmE4NjBiZC1iMWVkLTRkZjgtOWMwOS02MjUzMzJkMWQyZjkiLCJpYXQiOjE3MDUwOTc0MjB9.MC-VvxcUIW13748cdtJbPZLNkc5AJ4XXjxnBszTxr8Q"
    }
  ```

+ Response 200

    + body
 
        ```json
          {
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwMmE4NjBiZC1iMWVkLTRkZjgtOWMwOS02MjUzMzJkMWQyZjkiLCJpYXQiOjE3MDUwOTc3NDksImV4cCI6MTcwNTA5ODM0OX0.519xVIZPGCW2u67KytBRZrpdpirQQTKAsBkeQArO6yg"
          }
        ```

### Recupera um usuário

```
  GET /users/me
```

+ Request

    + Header

        ```
        Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiT1JHIiwic3ViIjoiNTNhN2I0NGItYjQ4YS00MjBiLWEyYWQtNmJiOTEwMjZlNTgwIiwiaWF0IjoxNzA0NzUxNTUyLCJleHAiOjE3MDQ3NTIxNTJ9.TnMbzx37iAPKwM0Ynj_I-WtTQs_dfjwGUT5TN7Vf_mw
        ```

+ Response 200

    + Body 

        ```json
            {
              "user": {
                  "id": "02a860bd-b1ed-4df8-9c09-625332d1d2f9",
                  "username": "John Doe",
                  "email": "johndoe@email.com",
                  "password": null,
                  "created_at": "2024-01-12T21:22:34.864Z",
                  "updated_at": "2024-01-12T21:22:34.864Z"
              }
            }
        ```

### Cria um envelope

```
  POST /envelopes
```
+ Request

  + Header

        ```
          Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiT1JHIiwic3ViIjoiNTNhN2I0NGItYjQ4YS00MjBiLWEyYWQtNmJiOTEwMjZlNTgwIiwiaWF0IjoxNzA0NzUxNTUyLCJleHAiOjE3MDQ3NTIxNTJ9.TnMbzx37iAPKwM0Ynj_I-WtTQs_dfjwGUT5TN7Vf_mw
        ```

  + Body (Application/json)

      ```json
        {          
          "description": "envelope 1",
          "amount": 1249.45
        }
      ```
    
### Recupera uma lista de envelopes de um usuário

```
  GET /envelopes
```

+ Request

    + Header

        ```
        Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiT1JHIiwic3ViIjoiNTNhN2I0NGItYjQ4YS00MjBiLWEyYWQtNmJiOTEwMjZlNTgwIiwiaWF0IjoxNzA0NzUxNTUyLCJleHAiOjE3MDQ3NTIxNTJ9.TnMbzx37iAPKwM0Ynj_I-WtTQs_dfjwGUT5TN7Vf_mw
        ```

+ Response 200

    + Body 

        ```json
            {
              "envelopes": [
                  {
                      "id": "d3cd612e-baf9-4b8d-b98c-2541a3c128e1",
                      "description": "envelope-1",
                      "amount": 123895,
                      "created_at": "2024-01-12T21:22:57.844Z",
                      "updated_at": "2024-01-12T21:29:28.009Z",
                      "user_id": "02a860bd-b1ed-4df8-9c09-625332d1d2f9",
                      "Transaction": [
                          {
                              "id": "88f7a905-9af5-404b-a656-cd891050045a",
                              "payment_recipient": "example",
                              "payment_amount": 1050,
                              "created_at": "2024-01-12T21:24:33.925Z",
                              "updated_at": "2024-01-12T21:29:28.004Z",
                              "envelope_id": "d3cd612e-baf9-4b8d-b98c-2541a3c128e1"
                          }
                      ],
                      "totalAmountTransactions": 1050
                  },
                  {
                      "id": "737cb456-be3f-40f4-ad48-f6c1a41622aa",
                      "description": "App Development",
                      "amount": 124945,
                      "created_at": "2024-01-12T22:33:01.316Z",
                      "updated_at": "2024-01-12T22:33:01.316Z",
                      "user_id": "02a860bd-b1ed-4df8-9c09-625332d1d2f9",
                      "Transaction": [],
                      "totalAmountTransactions": 0
                  }
              ]
          }
        ```

### Recupera um envelope especifico

```
  GET /envelopes/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. ID do envelope |

+ Request

    + Header

        ```
        Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiT1JHIiwic3ViIjoiNTNhN2I0NGItYjQ4YS00MjBiLWEyYWQtNmJiOTEwMjZlNTgwIiwiaWF0IjoxNzA0NzUxNTUyLCJleHAiOjE3MDQ3NTIxNTJ9.TnMbzx37iAPKwM0Ynj_I-WtTQs_dfjwGUT5TN7Vf_mw
        ```

+ Response 200

    ```json
          {
            "envelope": {
                "id": "d3cd612e-baf9-4b8d-b98c-2541a3c128e1",
                "description": "App Development",
                "amount": 1238.95,
                "created_at": "2024-01-12T21:22:57.844Z",
                "updated_at": "2024-01-12T21:29:28.009Z",
                "user_id": "02a860bd-b1ed-4df8-9c09-625332d1d2f9",
                "Transaction": [
                    {
                        "id": "88f7a905-9af5-404b-a656-cd891050045a",
                        "payment_recipient": "example",
                        "payment_amount": 1050,
                        "created_at": "2024-01-12T21:24:33.925Z",
                        "updated_at": "2024-01-12T21:29:28.004Z",
                        "envelope_id": "d3cd612e-baf9-4b8d-b98c-2541a3c128e1"
                    }
                ],
                "totalAmountTransactions": 1050
            }
          }
    ```

```
  PUT /envelopes/:envelopeId
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `envelopeId`      | `string` | **Obrigatório**. ID do envelope a ser atualizado |

+ Request

  + Header

        ```
          Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiT1JHIiwic3ViIjoiNTNhN2I0NGItYjQ4YS00MjBiLWEyYWQtNmJiOTEwMjZlNTgwIiwiaWF0IjoxNzA0NzUxNTUyLCJleHAiOjE3MDQ3NTIxNTJ9.TnMbzx37iAPKwM0Ynj_I-WtTQs_dfjwGUT5TN7Vf_mw
        ```

  + Body (Application/json)

      ```json
        {          
          "description": "envelope updated",
          "amount": 124.45
        }
      ```

### Deleta um envelope

```
  DELETE /envelopes/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. ID do envelope a ser deletado |

+ Request

  + Header

        ```
          Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiT1JHIiwic3ViIjoiNTNhN2I0NGItYjQ4YS00MjBiLWEyYWQtNmJiOTEwMjZlNTgwIiwiaWF0IjoxNzA0NzUxNTUyLCJleHAiOjE3MDQ3NTIxNTJ9.TnMbzx37iAPKwM0Ynj_I-WtTQs_dfjwGUT5TN7Vf_mw
        ```

### Transfer valor de um envelope para outro

```
  POST /envelopes/transfer/:amountFrom/:amountTo
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `amountFrom`      | `string` | **Obrigatório**. ID do envelope doador |
| `amountTo`      | `string` | **Obrigatório**. ID do envelope recebedor |

+ Request

  + Header

        ```
          Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiT1JHIiwic3ViIjoiNTNhN2I0NGItYjQ4YS00MjBiLWEyYWQtNmJiOTEwMjZlNTgwIiwiaWF0IjoxNzA0NzUxNTUyLCJleHAiOjE3MDQ3NTIxNTJ9.TnMbzx37iAPKwM0Ynj_I-WtTQs_dfjwGUT5TN7Vf_mw
        ```

  + Body (Application/json)

      ```json
        {          
          "amountToUpdate": 123.45
        }
      ```

### Cria uma transação

```
  POST /transactions
```
+ Request

  + Header

        ```
          Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiT1JHIiwic3ViIjoiNTNhN2I0NGItYjQ4YS00MjBiLWEyYWQtNmJiOTEwMjZlNTgwIiwiaWF0IjoxNzA0NzUxNTUyLCJleHAiOjE3MDQ3NTIxNTJ9.TnMbzx37iAPKwM0Ynj_I-WtTQs_dfjwGUT5TN7Vf_mw
        ```

  + Body (Application/json)

      ```json
        {          
          "payment_recipient": "transaction 1",
          "payment_amount": 32.50,
          "envelope_id": "d3cd612e-baf9-4b8d-b98c-2541a3c128e1"
        }
      ```


### Recupera todas as transações de um envelope

```
  GET /transactions/:envelopeId
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `envelopeId`      | `string` | **Obrigatório**. ID do envelope |


+ Response 200

  + Body (Application/json)

      ```json
        {
          "transactions": [
              {
                  "id": "88f7a905-9af5-404b-a656-cd891050045a",
                  "payment_recipient": "adwd",
                  "payment_amount": 1050,
                  "created_at": "2024-01-12T21:24:33.925Z",
                  "updated_at": "2024-01-12T21:29:28.004Z",
                  "envelope_id": "d3cd612e-baf9-4b8d-b98c-2541a3c128e1"
              }
          ]
        }
      ```


### Atualiza uma transação

```
  PUT /transactions/:envelopeId/:transactionId
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `envelopeId`      | `string` | **Obrigatório**. ID do envelope |
| `transactionId`      | `string` | **Obrigatório**. ID da transação a ser atualizada |

+ Request

  + Header

        ```
          Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiT1JHIiwic3ViIjoiNTNhN2I0NGItYjQ4YS00MjBiLWEyYWQtNmJiOTEwMjZlNTgwIiwiaWF0IjoxNzA0NzUxNTUyLCJleHAiOjE3MDQ3NTIxNTJ9.TnMbzx37iAPKwM0Ynj_I-WtTQs_dfjwGUT5TN7Vf_mw
        ```

  + Body (Application/json)

      ```json
        {          
           "payment_recipient": "transaction updated",
           "payment_amount": 1050,
        }
      ```

### Deleta um envelope

```
  DELETE /transaction/:transactionId
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `transactionId`      | `string` | **Obrigatório**. ID da transação a ser deletada |


 ## Autores

- [@ThiagoBarbosa05](https://github.com/ThiagoBarbosa05)


