/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Pessoas` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Pessoas_email_key" ON "Pessoas"("email");

-- RenameForeignKey
ALTER TABLE "Ofertas" RENAME CONSTRAINT "fk_categoria" TO "Ofertas_categoria_ID_fkey";

-- RenameForeignKey
ALTER TABLE "Ofertas" RENAME CONSTRAINT "fk_pessoa" TO "Ofertas_pessoa_ID_fkey";
