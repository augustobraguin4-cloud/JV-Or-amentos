// API de orçamentos — roda como função serverless na Vercel.
// Rotas:
//   GET    /api/orcamentos            -> lista todos
//   POST   /api/orcamentos            -> cria ou atualiza um orçamento (corpo JSON)
//   DELETE /api/orcamentos?id=...     -> exclui um orçamento
// Todas exigem o cabeçalho "x-senha" igual à variável de ambiente SENHA_APP.

import { neon } from '@neondatabase/serverless';

// A Vercel pode criar a variável como DATABASE_URL ou POSTGRES_URL, conforme a integração escolhida.
const sql = neon(process.env.DATABASE_URL || process.env.POSTGRES_URL);

export default async function handler(req, res) {
  const senhaEnviada = req.headers['x-senha'];
  if (!process.env.SENHA_APP || senhaEnviada !== process.env.SENHA_APP) {
    return res.status(401).json({ erro: 'Senha inválida' });
  }

  try {
    if (req.method === 'GET') {
      const linhas = await sql`SELECT dados FROM orcamentos ORDER BY numero DESC`;
      return res.status(200).json(linhas.map(l => l.dados));
    }

    if (req.method === 'POST') {
      const o = req.body;
      if (!o || !o.id || !o.numero || !o.status) {
        return res.status(400).json({ erro: 'Dados incompletos' });
      }
      const criado = o.criadoEm || new Date().toISOString();
      const atualizado = o.atualizadoEm || new Date().toISOString();

      await sql`
        INSERT INTO orcamentos (id, numero, status, cliente, endereco, dados, criado_em, atualizado_em)
        VALUES (${o.id}, ${o.numero}, ${o.status}, ${o.cliente || ''}, ${o.endereco || ''},
                ${JSON.stringify(o)}::jsonb, ${criado}, ${atualizado})
        ON CONFLICT (id) DO UPDATE SET
          numero        = EXCLUDED.numero,
          status        = EXCLUDED.status,
          cliente       = EXCLUDED.cliente,
          endereco      = EXCLUDED.endereco,
          dados         = EXCLUDED.dados,
          atualizado_em = EXCLUDED.atualizado_em`;
      return res.status(200).json({ ok: true });
    }

    if (req.method === 'DELETE') {
      const id = req.query.id;
      if (!id) return res.status(400).json({ erro: 'Informe o id' });
      await sql`DELETE FROM orcamentos WHERE id = ${id}`;
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ erro: 'Método não permitido' });
  } catch (err) {
    // número de orçamento repetido cai aqui (coluna numero é única)
    const msg = String(err.message || '');
    if (msg.includes('duplicate key') && msg.includes('numero')) {
      return res.status(409).json({ erro: 'Esse número de orçamento já existe' });
    }
    console.error(err);
    return res.status(500).json({ erro: 'Erro no servidor. Tente novamente.' });
  }
}
