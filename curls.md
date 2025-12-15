# Defina as URLs e Portas dos microsserviços

```bash
export PRODUCTS_URL="http://localhost:8000"
export ORDERS_URL="http://localhost:8001"
export PAYMENTS_URL="http://localhost:8002"
export USERS_URL="http://localhost:8003"
```

# Listar Produtos

`curl -X GET "$PRODUCTS_URL/products/list"`

# Criar Produto

```bash
curl -X POST "$PRODUCTS_URL/products/" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste",
    "price": 200,
    "stock": 10
}'
```

# Atualizar Produto


```bash
curl -X PUT "$PRODUCTS_URL/products/" \
  -H "Content-Type: application/json" \
  -d '{
    "id": 7,
    "name": "Novo teste",
    "price": 50,
    "stock": 1,
    "createdAt": "2025-12-01T00:00:00.000",
    "deleted": false
}'
```

# Atualizar Estoque

```bash
curl -X POST "$PRODUCTS_URL/products/update_stock" \
  -H "Content-Type: application/json" \
  -d '{
    "alterQuantity": 2,
    "id": 1
}'
```

# Deletar Produto

```bash
curl -X DELETE "$PRODUCTS_URL/products?id=7"
```

# Listar Pedidos


```bash
curl -X GET "$ORDERS_URL/orders/list"
```

# Criar Pedido

```bash
curl -X POST "$ORDERS_URL/orders/" \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": 1,
    "total": 100,
    "paymentMethodId": 1,
    "payment": {
        "payments": [
            {
                "total": 100,
                "paymentMethodId": 1
            }
        ]
    },
    "products": [
        {
            "id": 3,
            "name": "Mouse Gamer",
            "quantity": 1,
            "price": 100
        }
    ]
}'
```

# Atualizar Pedido

```bash
curl -X PUT "$ORDERS_URL/orders/" \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "clientId": 1,
    "paymentMethodId": 2,
    "products": [
        {
            "quantity": 1,
            "id": 1
        },
        {
            "quantity": 1,
            "id": 3
        }
    ],
    "status": 1,
    "createdAt": "2025-12-01T00:00:00.000",
    "deleted": false,
    "total": 100
}'
```

# Deletar Pedido

```bash
curl -X DELETE "$ORDERS_URL/orders?id=691dc6cd23c52611bb875d94"
```

# Buscar Pedido por ID


```bash
curl -X GET "$ORDERS_URL/orders?id=691dc6d964e5154513d79f84"
```

# Listar Pagamentos

```bash
curl -X GET "$PAYMENTS_URL/payments/list"
```

# Criar Pagamento


```bash
curl -X POST "$PAYMENTS_URL/payments/" \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "693f01eb2a6e5c2743393d72",
    "total": 100,
    "payments": [{
        "total": 100,
        "paymentMethodId": 1
    }],
    "statusId": 1
}'
```

# Processar Pagamento


```bash
curl -X POST "$PAYMENTS_URL/payments/process" \
  -H "Content-Type: application/json" \
  -d '{
    "paymentOrderId": 3810,
    "statusId": 1
}'
```

# Atualizar Pagamento


```bash
curl -X PUT "$PAYMENTS_URL/payments/" \
  -H "Content-Type: application/json" \
  -d '{
    "id": 3807,
    "orderId": "693f01eb2a6e5c2743393d72",
    "total": 100,
    "payments": [{
        "total": 100,
        "paymentMethodId": 1
    }],
    "statusId": 1,
    "createdAt": "2025-12-01T00:00:00.000",
    "deleted": false
}'
```

# Deletar Pagamento


```bash
curl -X DELETE "$PAYMENTS_URL/payments?id=3807"
```

# Buscar Pagamento por ID


```bash
curl -X GET "$PAYMENTS_URL/payments?id=3808"
```

# Listar Usuário


```bash
curl -X GET "$USERS_URL/users/list"
```

# Criar Usuário


```bash
curl -X POST "$USERS_URL/users/" \
  -H "Content-Type: application/json" \
  -d '{
   "name": "raisson",
   "email": "raisson@email.com",
   "typeId": 2
}'
```

# Atualizar Usuário


```bash
curl -X PUT "$USERS_URL/users/" \
  -H "Content-Type: application/json" \
  -d '{
   "name": "raisson",
   "email": "raisson@email.com",
   "typeId": 2,
   "createdAt": "2025-12-01T00:00:00.000",
   "deleted": false,
   "id": 2
}'
```

# Deletar Usuário


```bash
curl -X GET "$USERS_URL/users?id=1"
```
