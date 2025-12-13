# E-commerce - Arquitetura de Sistemas
### Raisson Silveira de Souza

Projeto G2 backend de um e-commerce com microsserviços, feito com NodeJS, Prisma, RabbitMQ, Kong, Kafka e API Gateway.

## Microsserviços

### Notification Service

Serviço de notificações que envia notificações fictícias com base na escuta de uma fila RabbitMQ.

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

### Postgres

Utilizado pelos serviços de pagamento, produto e usuários.

### MongoDB

Utilizado pelo serviço de pedidos.

## Kafka

Utilizado para comunicação entre os servços de pagamento e pedidos.

## Testes de Carga

Realiza um teste de carga geral com base no caminho feliz de solicitação de compra.

# Comandos

### Prisma Relacionados

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

`docker compose up --build product-db payment-db user-db order-db rabbitmq rabbitmq-queue-orchestrator zookeeper kafka init-kafka kafka-ui`
