![Logo](./public/logo.png)


# Find a friend API
Esta é uma simples aplicação desenvolvida como solução do desafio do módulo 3 da trilha de node.js da Rocketseat, onde é possível se registrar como uma ORG para cadastrar alguns pets para adoção, o usuário que deseja adotar algum pet consegue filtra-los pelas caracteristicas e pela cidade da ORG. Essa aplicação foi construída usando SOLID, que representa um conjunto de cinco princípios de design de software orientado a objetos destinados a criar sistemas mais compreensíveis, flexíveis e sustentáveis, e também usando a abordagem de desenvolvimento de software TDD (Test-Driven Development). 

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](/LICENSE)

## 🛠 Tecnologias

The following tools were used to build the project:
  
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white)

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) 

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

## Regras da aplicação

- Deve ser possível cadastrar um pet
- Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- Deve ser possível filtrar pets por suas características
- Deve ser possível visualizar detalhes de um pet para adoção
- Deve ser possível se cadastrar como uma ORG
- Deve ser possível realizar login como uma ORG

## Regras de negócio

- Para listar os pets, obrigatoriamente precisamos informar a cidade
- Uma ORG precisa ter um endereço e um número de WhatsApp
- Um pet deve estar ligado a uma ORG
- O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- Todos os filtros, além da cidade, são opcionais
- Para uma ORG acessar a aplicação como admin, ela precisa estar logada


## Instalação

```bash
  # clone o repositório do projeto
  git clone https://github.com/ThiagoBarbosa05/find-a-friend-api.git

  # Entre no diretório do projeto clonado
  cd find-a-friend-api

  # Instale as dependências do projeto
  npm install

  # Inicialize o banco de dados em sua máquina
  docker-compose up -d

  ## Se não estiver o docker instalado na sua máquina pode seguir o guia de instalação
    disponível na guia de instalação no site oficial do docker ou pode usar 
    o banco de dados relacional de sua preferência


  ## Rode as migrations para o banco de dados
  npx prisma migrate dev

  ## Por fim para rodar o projeto
  npm run dev
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


