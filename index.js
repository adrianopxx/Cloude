const express = require('express');
const app = express();
const port = 3000;
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Rota para consultar todos os dados via POST
app.post('/dados', async (req, res) => {
    try {
      const dados = await prisma.cadastro.findMany(); // Substitua "nomeDaTabela" pelo nome da sua tabela no Prisma.
      res.json(dados);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar os dados' });
    }
  });
  

  // Rota para consultar um dado específico
  app.post('/ds', async (req, res) => {
    const { id } = req.body;
  
    try {
      const dado = await prisma.cadastro.findUnique({
        where: { id: parseInt(id) },
      });
  
      if (!dado) {
        return res.status(404).json({ error: 'Dado não encontrado' });
      }
  
      res.json(dado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar o dado' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

