#!/bin/sh
# Encerra o script se qualquer comando falhar
set -e

echo "Running database migrations..."
# Usa `migrate deploy` que é seguro para automação
npx prisma db push

echo "Migrations applied. Starting the application..."
# Executa o comando principal do contêiner
exec "$@"