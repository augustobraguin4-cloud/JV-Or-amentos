-- Cole este arquivo no SQL Editor do banco (Vercel > Storage > seu banco > Query / SQL Editor)
-- Pode executar mais de uma vez: ele não apaga dados existentes.

CREATE TABLE IF NOT EXISTS orcamentos (
  id            TEXT PRIMARY KEY,
  numero        INTEGER NOT NULL UNIQUE,
  status        TEXT NOT NULL,
  cliente       TEXT NOT NULL DEFAULT '',
  endereco      TEXT NOT NULL DEFAULT '',
  dados         JSONB NOT NULL,
  criado_em     TIMESTAMPTZ NOT NULL DEFAULT now(),
  atualizado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_orcamentos_status ON orcamentos (status);
