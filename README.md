# API cálculo da data de admissão, valor do salário bruto e dados do CEP.

* O objetivo é desenvolver uma API REST para cálculos de data e valor utilizando Node.js com TypeScript e um framework como NestJS ou Express. 
      Além disso, deve haver uma interface em Next.js para interação com o usuário.
    
O endpoint principal deverá receber data de admissão, valor salarial bruto e CEP, e processar as seguintes tarefas:

## ✅ Requisitos Funcionais
### Validação de Campos:
- Implementar validações rigorosas para garantir a tipagem correta e controle de caracteres.
### Cálculo e Retorno:

#### Calcular e retornar:
- Quantos dias, meses e anos se passaram desde a data de admissão até hoje.
- 35% do salário bruto.
- Dados completos do CEP.

### Chamada Externa:
- Utilizar a API do ViaCEP para obter informações do endereço a partir do CEP informado.

### Persistência de Dados: 
- Armazenar os dados no MongoDB utilizando Mongoose ou Prisma.

### Consultas RESTful:
- Criar endpoints para consulta global e individual dos registros.
- Implementar suporte a filtros e paginação.

### Testes e Validação:
- Validar os endpoints utilizando Postman, Insomnia ou Curl.
- Implementar testes automatizados (unitários e de integração) com Jest.

### Configuração Docker:
- Criar um Dockerfile e um docker-compose.yml para rodar a API e o banco MongoDB em containers.
### Documentação OpenAPI:
- Gerar a documentação dos endpoints utilizando Swagger (OpenAPI 3.0).

### Tratamento de Erros:
- Criar uma aplicação em Next.js que consuma a API desenvolvida, permitindo inserção e exibição dos resultados de forma amigável. data de admissão, valor do salário bruto e dados do CEP.

## Como rodar o projeto?

```sh
docker-compose up --build -d
```
### Acessar o frontend:
```sh
http://localhost:8080
```
### Acessar o backend:
```sh
http://localhost:3000
```
### Testar a API
- Importar no Postman o arquivo em:

```sh
assets/teste_instivo.postman_collection.json

```

ou

- usar cURL:

#### Fazer uma requisição
```sh
curl --location 'localhost:3000/employees' \
--header 'Content-Type: application/json' \
--data '{
   "admissionDate":"2020-01-01",
   "grossSalary":8000,
   "cep":"86080470"
}'
```

#### Pegar todos os registros
```sh
curl --location 'localhost:3000/employees'

```
#### Pegar registros com paginacao
```sh
curl --location 'localhost:3000/employees?page=1&limit=5'

```

#### Pegar registro por id
```sh
curl --location 'localhost:3000/employees/{id}'
```


