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

Para rodar esse projeto, você vai precisar adicionar algumas variáveis de ambiente no arquivo `.env`, você encontrará um exemplo de como prenncher essas variáveis no seguinte arquivo `.env.example`


## Rodando os testes

Para rodar os testes, siga os seguintes passos:

```bash
  # Para rodar os testes unitários
  npm run test

  # Para rodar os testes end-to-end
  npm run test:e2e
```


## Documentação da API

### Registra um usuário como uma ORG

```
  POST /register
```
+ Request (application/json)

    + Body

      ```json
        {
          "name": "Jonh Doe",
          "email": "Johndoe@email.com",
          "password": "javascript",
          "whatsapp_number": "22999999999",
          "postal_code": "20910025"
          
          # Not Required
          "street": "Avenida do Exército",
          "city": "Rio de Janeiro",
          "state": "RJ",
        }
      ```
+ Response 201
  
    + Body

      ```json
          {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiT1JHIiwic3ViIjoiNTNhN2I0NGItYjQ4YS00MjBiLWEyYWQtNmJiOTEwMjZlNTgwIiwiaWF0IjoxNzA0NzUxNTUyLCJleHAiOjE3MDQ3NTIxNTJ9.TnMbzx37iAPKwM0Ynj_I-WtTQs_dfjwGUT5TN7Vf_mw"
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
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiT1JHIiwic3ViIjoiNTNhN2I0NGItYjQ4YS00MjBiLWEyYWQtNmJiOTEwMjZlNTgwIiwiaWF0IjoxNzA0NzUxNTUyLCJleHAiOjE3MDQ3NTIxNTJ9.TnMbzx37iAPKwM0Ynj_I-WtTQs_dfjwGUT5TN7Vf_mw"
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
  PATCH /token/refresh
```

+ Response 200

  ```json
    {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiT1JHIiwic3ViIjoiNDAwOTY3NTMtNWRkNy00ZGM4LWJmNmEtNjdhMTI1NTRhODIwIiwiaWF0IjoxNzA0NzUyNjc3LCJleHAiOjE3MDQ3NTMyNzd9.0bY3L41z1fhihoOfBCTIXPd-3e-hwhTdRqMI17VlTmw"
    }
  ```

### Registrar um pet

```
  POST /pets
```

+ Request (application/json)

    + Body 


        ```json
          {
            "ageRange": "CUB",
            "name": "pet-3",
            "size": "SMALL",
            "energy": "MEDIUM",
            "independenceLevel": "MEDIUM",
            "environment": "BROAD",

            # Not required
            "about": "pet very cute",
            "requirements": [
                "care",
                "food",
                "water"
            ]
          }
        ```

    + Header

        ```
        Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiT1JHIiwic3ViIjoiNTNhN2I0NGItYjQ4YS00MjBiLWEyYWQtNmJiOTEwMjZlNTgwIiwiaWF0IjoxNzA0NzUxNTUyLCJleHAiOjE3MDQ3NTIxNTJ9.TnMbzx37iAPKwM0Ynj_I-WtTQs_dfjwGUT5TN7Vf_mw
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


