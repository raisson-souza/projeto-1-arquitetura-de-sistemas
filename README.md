# E-commerce - Arquitetura de Sistemas
### Raisson Silveira de Souza

Projeto G2 backend de um e-commerce com microsserviços, feito com NodeJS, Prisma, RabbitMQ, Kong, Redis, Kafka e API Gateway.

## Microsserviços

### Notification Service

Serviço de notificações que envia notificações fictícias com base na escuta de uma fila genérica do RabbitMQ.

### Order Service

Serviço de pedidos que realiza o gerenciamento de pedidos e se comunica diretamente com os serviços de usuário e produtos, e indiretamente com pagamentos (kafka) e notificações (rabbimq).

### Payment Service

Serviço de pagamentos que realiza o gerenciamento dos pagamentos dos pedidos e a confirmação de uso de estoque através da comunicação direta com produtos e recebimento de solicitações dos pedidos com Kafka.

### Product Service

Serviço de pedidos que realiza o gerenciamento dos pedidos, espera modificações do serviço de pagamentos.

### User Service

Serviço de usuários que realiza o gerenciamento dos usuários (clientes).

## Filas

### RabbitMQ

Fila de uso geral (consumida apenas pelo serviço de notificações).

## Bancos

### PostgreSQL

Utilizado pelos serviços de pagamento, produto e usuários.

### MongoDB

Utilizado pelo serviço de pedidos.

## Kafka

Utilizado para comunicação entre os serviços de pagamento e pedidos.

## Testes de Carga

Realiza um teste de carga geral com base no caminho feliz de solicitação de compra.

## Cache

Foi utilizado o Redis para o cacheamento de requisições GET dos serviços de pedidos, pagamentos, produtos e usuários.  
Esse mesmo cache é removido após uma hora ou quando o mesmo registro é modificado ou deletado.

## Seeder

Os serviços de pedidos, pagamentos, produtos e usuários possuem seeders que são executados durante a incialização dos mesmos via Docker, populando com dados iniciais para teste.

## Esquema Postman

No arquivo `esquema-postman.json` existe uma colection inteira com as requisições mapeadas e exemplos reais de retornos para utilização no Postman.

## Teste de Caminho Feliz

No arquivo `tester.py` existe uma rodada de teste inteira que cria um pedido, captura o ID do pagamento e então aprova o mesmo utilizando 3 requisições juntamente com a apresentação de métricas de tempo e exeução.  
Esse teste visa avaliar a comunicação entre todos os serviços diretamente e indiretamente.

# Comandos

### Docker

`docker compose up`

### Prisma Relacionados

Os seguintes comandos são para uso local rodando os serviços individualmente, **não são necessários na avaliação final do professor**.

Instalação NPM Prisma  
`npm install @prisma/client`

Geração dos arquivos Prisma  
`npx prisma generate`

Para migração de bancos PostgreSQL  
`npx prisma migrate dev`

Para migração de bancos MongoDB  
`npx prisma db push`

### Testes de Carga

Inicialização do teste de carga (necessita execução dentro do container do K6)
K6 (executar internamente no container)  
`k6 --out influxdb=http://influxdb:8086 k6-orders run /scripts/order-load-test.js`

### Validação Local dos Serviços

Comando para validação e teste dos serviços executados localmente e individualmente, **não é necessário na avaliação final do professor**.

`docker compose up --build product-db payment-db user-db order-db rabbitmq rabbitmq-queue-orchestrator zookeeper kafka init-kafka kafka-ui redis kong`

## Observações

- É possível que ao rodar o docker compose sem `-d`, estoure um **erro no container do rabbitmq**, indicando que o mesmo não está saudável, porém isso **não implica que os serviços pararão**, é possível executar novamente;
- No fluxo completo, ao remover os produtos do estoque na aprovação do pagamento e pedido, os mesmos são adicionados ao invés de subtraídos, esse erro ocorre na **má formatação da requisição** disparada por `orders` via axios, o mesmo não ocorre ao realizar a requisição manualmente via Postman;
- O gateway (Kong), apesar de ter sido devidamente implementado, na primeira execução de qualquer requisição leva um **tempo muito longo** (2-11 segundos) para obter uma resposta, isso não ocorre em requisições subsequentes, o problema não foi investigado.
- Os curls estão localizados no arquivo `curls.md`.
