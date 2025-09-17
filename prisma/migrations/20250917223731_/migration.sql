-- AlterTable
ALTER TABLE "public"."orders" ADD COLUMN     "statusId" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "public"."order_status" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "order_status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "public"."order_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
