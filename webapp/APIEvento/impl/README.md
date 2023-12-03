# Início

Essa é a API que fornece os dados necessários para o Frontend, escrita em TypeScript com NestJS.

## Deploy AWS

Para realizar o deploy dessa API que está hospedada na AWS, você primeiro precisa realizar algumas configurações antes.

Verifique se você possui o AWS CLI, se não, procure no Google como instalar. Ao instalar, você executa `aws configure`,
e coloca alguns valores aleatórios, isso só vai servir para criar um arquivo numa pasta chamada `.aws` dentro da pasta do seu
usuário chamado `credentials`, depois que ele cria, abra esse arquivo e troque o conteúdo pelo conteúdo correto de autenticação
da AWS que você terá que conseguilos na AWS, procurar por AWS - IAM.

E agora, com o ambiente configurado, basta executar o comando `npm run deploy:aws`, e sua API está hospedada com sucesso na AWS.

## Rodando local

Para rodar local você precisa executar o comando `npm run start:debug` além de estar rodando o banco de dados no docker ou tendo configurado o `.env` com as variaveis do banco de dados.

## Preenchendo o banco de dados

Para começar a utilizar a API o que você deve fazer primeiro é cadastrar um usuário, ele será cadastrado como um usuário comum, mas isso pode ser alterado diretamente no banco de dados trocando para 'admin' em suas permissões. O cadastro do usuário será feito pelo swagger na rota `localhost:3000/swagger` dentro da sessão `users` na rota post `/users`.
Após isso você poderá utilizar na sessão Auth de autenticações a rota `auth/local` para fazer o login e obter o token de acesso que deve ser colado no botão `Authorize` e colar o token não se esquecendo de NÃO adicionar o Bearer do inicio do token.
Em seguida clique no botão `Authorize` e está autenticado e pode usar essa API pelo swagger.
A maior parte das rotas requerem authenticação para serem utilizadas, então o token deve ser enviado no header das requisições.

### Docker

Se não possuir o Docker e o Docker Compose instalado, instale na máquina antes para conseguir usar o banco Postgres localmente.

### Postgres

Use o seguinte comando para criar o arquivo de configurações a partir do exemplo:
```shell
cp .env.example.example .env.example
```

E depois, inicie o `container` que contém os serviços do Postgres usando:
```shell
docker-compose up -d postgres
```

Pronto! Agora, você pode criar uma `migration` usando `npm run add-migration v1`, e depois executa-la com `npm run migration` para iniciar o banco de dados. 

## Migrations

Para criar uma `migration`, use o comando:
```shell
npm run add-migration NOME_DA_MIGRATION
```

E para executar todas as suas `migrations`, use:
```shell
npm run migration
```

Caso queira realizar alguma operação mais complexa com o Typeorm, use o comando:
```shell
npm run typeorm:cli COMANDO
```

## Typeorm

Esse é o nome biblioteca que lida com o banco de dados, a estrutura desse cara é a seguinte:

- `src/migrations`: O local onde todas as migrations ficam.

## Estrutura

Sempre, ao criar uma nova entidade, crie uma pasta em `src` com o nome da entidade ( Ex: `src/products` ).
Dentro da pasta, deve possuir a seguinte estrutura:

- `products`
    - `products.module.ts`
    - `controllers` ( Todos os controllers relacionados ao produto )
        - `products.controller.ts`
    - `services` ( Todos os serviços relacionados ao produto )
        - `products.service.ts`
    - `models` ( Proxys, payloads e interfaces relacionados ao produto )
        - `products-create.payload.ts`
        - `products-update.payload.ts`
    - `entities` ( Todas as entidades relativas a esse modulo, **SEMPRE** devem possuir o `.entity.ts` )
        - `product.entity.ts`
    - `subscribers` ( Os subscribers relacionados a esse modulo )
        - `product.subscriber.ts`

## Autenticação

Há uma forma de autenticação na aplicação:
- Local
