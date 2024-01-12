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
  GET /pets
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











### Buscar pets disponíveis em uma cidade

```
  GET /pets/find/:city
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `city`      | `string` | **Obrigatório**. Cidade para fazer a busca dos pets |

| Parâmetros de filtragem   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `size`      | `string` | **Opcional**. filtrar por tamanho. Ex: `MEDIUM` |
| `ageRange`      | `string` | **Opcional**. filtrar por idade. Ex: `ADULT`|
| `independenceLevel`      | `string` | **Opcional**. filtrar por nível de dependência. Ex: `LOW`|
| `energy`      | `string` | **Opcional**. filtrar por nível de energia. Ex: `HIGH`|

+ response 200

  ```json
    {
      "pets": [
        {
            "id": "115ff322-f0c1-4f17-ade5-c0cbdea48364",
            "name": "pet-2",
            "about": "pet very cute",
            "age_range": "CUB",
            "size": "GIANT",
            "energy": "MEDIUM",
            "independence_level": "MEDIUM",
            "environment": "BROAD",
            "requirements": [
                "care",
                "food",
                "water"
            ],
            "user_id": "45b5e768-0df7-421f-999b-cc11fc8ac072",
            "created_at": "2024-01-04T00:04:35.166Z"
        },
        {
            "id": "ec3c615f-2073-41c7-8459-29a2170143bc",
            "name": "pet-1",
            "about": "pet very cute",
            "age_range": "CUB",
            "size": "SMALL",
            "energy": "MEDIUM",
            "independence_level": "MEDIUM",
            "environment": "BROAD",
            "requirements": [
                "care",
                "food",
                "water"
            ],
            "user_id": "eda529ca-1938-48d8-ab28-9f3db17186ec",
            "created_at": "2024-01-03T22:45:12.260Z"
        },
        {
            "id": "15b98a66-d43b-49e3-b69e-dcf9bffea9e9",
            "name": "pet-1",
            "about": "pet very cute",
            "age_range": "CUB",
            "size": "MEDIUM",
            "energy": "MEDIUM",
            "independence_level": "MEDIUM",
            "environment": "BROAD",
            "requirements": [
                "care",
                "food",
                "water"
            ],
            "user_id": "eda529ca-1938-48d8-ab28-9f3db17186ec",
            "created_at": "2024-01-03T22:24:22.153Z"
        }
      ]
    }
  ```

### Buscar detalhes de um pet

```
  GET /pets/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. ID do pet |

+ Response 200

    ```json
      {
        "pet": {
            "id": "ec3c615f-2073-41c7-8459-29a2170143bc",
            "name": "pet-1",
            "about": "pet very cute",
            "age_range": "CUB",
            "size": "SMALL",
            "energy": "MEDIUM",
            "independence_level": "MEDIUM",
            "environment": "BROAD",
            "requirements": [
                "care",
                "food",
                "water"
            ],
            "user_id": "eda529ca-1938-48d8-ab28-9f3db17186ec",
            "created_at": "2024-01-03T22:45:12.260Z"
          }
        }
    ```

    ## Autores

- [@ThiagoBarbosa05](https://github.com/ThiagoBarbosa05)


