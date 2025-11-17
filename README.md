npm install @prisma/client
npx prisma generate

POSTGRES
npx prisma migrate dev

MONGODV
npx prisma db push

K6 (executar internamente no container)
```k6 --out influxdb=http://influxdb:8086/k6-orders run /scripts/order-load-test.js```