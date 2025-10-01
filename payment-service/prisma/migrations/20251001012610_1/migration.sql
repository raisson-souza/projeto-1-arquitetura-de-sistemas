-- CreateTable
CREATE TABLE "public"."payment_orders" (
    "id" SERIAL NOT NULL,
    "total" DECIMAL(65,30) NOT NULL,
    "orderId" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "payment_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."payment_order_status" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "payment_order_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."payments" (
    "id" SERIAL NOT NULL,
    "total" DECIMAL(65,30) NOT NULL,
    "transactionId" TEXT,
    "statusId" INTEGER NOT NULL DEFAULT 1,
    "paymentMethodId" INTEGER NOT NULL,
    "paymentOrderId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."payment_status" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "payment_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."payment_methods" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."payment_orders" ADD CONSTRAINT "payment_orders_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "public"."payment_order_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payments" ADD CONSTRAINT "payments_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "public"."payment_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payments" ADD CONSTRAINT "payments_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "public"."payment_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payments" ADD CONSTRAINT "payments_paymentOrderId_fkey" FOREIGN KEY ("paymentOrderId") REFERENCES "public"."payment_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
