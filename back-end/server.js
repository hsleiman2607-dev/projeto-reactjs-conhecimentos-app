import 'dotenv/config';
import express from "express";
import prisma from "./PrismaClient.js";

const app = express();
app.use(express.json());

// ==========================================
// 1. ROTAS DE CATEGORIAS
// ==========================================
app.post("/categorias", async (req, res) => {
    const { CatNome } = req.body; 
    if (!CatNome) return res.status(400).json({ error: "O campo CatNome é obrigatório" });
    try {
        const nova = await prisma.categoria.create({ data: { CatNome } });
        res.status(201).json(nova);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get("/categorias", async (req, res) => {
    const lista = await prisma.categoria.findMany();
    res.json(lista);
});

// ==========================================
// 2. ROTAS DE PESSOAS (Com Telefone e Descrição)
// ==========================================
app.post("/pessoas", async (req, res) => {
    const { nome_completo, email, telefone, descricao, CatID } = req.body;
    if (!nome_completo || !email || !CatID) {
        return res.status(400).json({ error: "Nome, Email e CatID são obrigatórios" });
    }
    try {
        const pessoa = await prisma.pessoa.create({
            data: { 
                nome_completo, 
                email, 
                telefone: telefone || null,
                descricao: descricao || null,
                CatID: parseInt(CatID) 
            }
        });
        res.status(201).json(pessoa);
    } catch (e) { res.status(500).json({ error: "E-mail duplicado ou erro no banco." }); }
});

app.get("/pessoas", async (req, res) => {
    const lista = await prisma.pessoa.findMany({ include: { categoria: true } });
    res.json(lista);
});

// ==========================================
// 3. ROTAS DE OFERTAS (Com Filtro Extra e Join)
// ==========================================
app.post("/ofertas", async (req, res) => {
    const { titulo, descricao, nivel, categoria_ID, pessoa_ID } = req.body;
    if (!titulo || !categoria_ID || !pessoa_ID) {
        return res.status(400).json({ error: "Título, categoria_ID e pessoa_ID são obrigatórios" });
    }
    try {
        const novaOferta = await prisma.oferta.create({
            data: {
                titulo,
                descricao: descricao || null,
                nivel: nivel || null,
                categoria_ID: parseInt(categoria_ID),
                pessoa_ID: parseInt(pessoa_ID)
            }
        });
        res.status(201).json(novaOferta);
    } catch (e) { res.status(500).json({ error: "Erro ao criar oferta. Verifique IDs." }); }
});

// GET /ofertas - Suporta filtro opcional: /ofertas?categoria_ID=1
app.get("/ofertas", async (req, res) => {
    const { categoria_ID } = req.query;
    try {
        const ofertas = await prisma.oferta.findMany({
            where: categoria_ID ? { categoria_ID: parseInt(categoria_ID) } : {},
            include: { categoria: true, pessoa: true }
        });
        res.json(ofertas);
    } catch (e) { res.status(500).json({ error: "Erro ao buscar ofertas" }); }
});

app.delete("/ofertas/:id", async (req, res) => {
    try {
        await prisma.oferta.delete({ where: { id: parseInt(req.params.id) } });
        res.status(204).send();
    } catch (e) { res.status(500).json({ error: "Erro ao deletar" }); }
});

app.put("/ofertas/:id", async (req, res) => {
    const { titulo, descricao, nivel, categoria_ID, pessoa_ID } = req.body;
    try {
        const ofertaAtualizada = await prisma.oferta.update({
            where: { id: parseInt(req.params.id) },
            data: {
                titulo: titulo || undefined,
                descricao: descricao || undefined,
                nivel: nivel || undefined,
                categoria_ID: categoria_ID ? parseInt(categoria_ID) : undefined,
                pessoa_ID: pessoa_ID ? parseInt(pessoa_ID) : undefined
            }
        });
        res.json(ofertaAtualizada);
    } catch (e) { res.status(500).json({ error: "Erro ao atualizar" }); 
}
});

app.listen(8080, () => console.log("🚀 Backend 100% Completo em http://localhost:8080"));