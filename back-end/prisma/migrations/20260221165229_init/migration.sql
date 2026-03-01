-- CreateTable
CREATE TABLE "Categorias" (
    "categoria_ID" SERIAL NOT NULL,
    "CatNome" VARCHAR(255),

    CONSTRAINT "Categorias_pkey" PRIMARY KEY ("categoria_ID")
);

-- CreateTable
CREATE TABLE "Ofertas" (
    "oferta_ID" SERIAL NOT NULL,
    "titulo" VARCHAR(100),
    "descricao" TEXT,
    "categoria_ID" INTEGER,
    "nivel" VARCHAR(255),
    "pessoa_ID" INTEGER,

    CONSTRAINT "Ofertas_pkey" PRIMARY KEY ("oferta_ID")
);

-- CreateTable
CREATE TABLE "Pessoas" (
    "pessoa_ID" SERIAL NOT NULL,
    "nome_completo" VARCHAR(255),
    "email" VARCHAR(255),
    "telefone" VARCHAR(20),
    "descricao" TEXT,

    CONSTRAINT "Pessoas_pkey" PRIMARY KEY ("pessoa_ID")
);

-- CreateIndex
CREATE INDEX "idx_ofertas_categoria" ON "Ofertas"("categoria_ID");

-- CreateIndex
CREATE INDEX "idx_ofertas_pessoa" ON "Ofertas"("pessoa_ID");

-- AddForeignKey
ALTER TABLE "Ofertas" ADD CONSTRAINT "fk_categoria" FOREIGN KEY ("categoria_ID") REFERENCES "Categorias"("categoria_ID") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Ofertas" ADD CONSTRAINT "fk_pessoa" FOREIGN KEY ("pessoa_ID") REFERENCES "Pessoas"("pessoa_ID") ON DELETE CASCADE ON UPDATE NO ACTION;
