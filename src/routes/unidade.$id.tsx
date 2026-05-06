import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Calendar, Building2, Send } from "lucide-react";
import { useState } from "react";
import { unidades } from "@/data/unidades";

export const Route = createFileRoute("/unidade/$id")({
  component: UnidadeDetalhe,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <Link to="/" className="text-primary underline">
        Unidade não encontrada — voltar
      </Link>
    </div>
  ),
  loader: ({ params }) => {
    const u = unidades.find((x) => x.id === params.id);
    if (!u) throw notFound();
    return u;
  },
});

type Comunicacao = {
  titulo: string;
  descricao: string;
  email: string;
  data: string;
};

function UnidadeDetalhe() {
  const u = Route.useLoaderData();
  const [comunicacoes, setComunicacoes] = useState<Comunicacao[]>([]);
  const [form, setForm] = useState({ titulo: "", descricao: "", email: "" });

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.titulo || !form.descricao || !form.email) return;
    setComunicacoes([{ ...form, data: new Date().toISOString() }, ...comunicacoes]);
    setForm({ titulo: "", descricao: "", email: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <div
        className="relative"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-10 text-primary-foreground">
          <Link
            to="/"
            className="self-start inline-flex items-center gap-1 text-sm opacity-90 hover:opacity-100"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Link>
          <img
            src={u.imagem}
            alt={u.nome}
            className="h-40 w-auto rounded-lg bg-background/90 p-3"
          />
          <h1 className="text-center text-2xl font-bold md:text-3xl">
            {u.nome}
          </h1>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-[1fr_360px]">
          <section>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="h-4 w-4" /> {u.instituicao}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {u.municipios.join(", ")}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> {u.dataCriacao}
              </span>
            </div>
            <p className="mt-6 text-base leading-relaxed text-foreground">
              {u.descricao}
            </p>

            <h2 className="mt-10 text-xl font-semibold text-foreground">
              Comunicações
            </h2>
            <div className="mt-4 space-y-3">
              {comunicacoes.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Nenhuma comunicação enviada ainda.
                </p>
              )}
              {comunicacoes.map((c, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-border bg-card p-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-card-foreground">
                      {c.titulo}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {new Date(c.data).toLocaleString("pt-BR")}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {c.descricao}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    por {c.email} · em análise
                  </p>
                </div>
              ))}
            </div>
          </section>

          <aside className="rounded-xl bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
            <h2 className="text-lg font-semibold text-card-foreground">
              Enviar comunicação
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Reporte problemas ou sugestões aos gestores.
            </p>
            <form onSubmit={enviar} className="mt-4 space-y-3">
              <input
                type="text"
                placeholder="Título"
                value={form.titulo}
                onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              <textarea
                placeholder="Descrição detalhada"
                rows={4}
                value={form.descricao}
                onChange={(e) =>
                  setForm({ ...form, descricao: e.target.value })
                }
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="email"
                placeholder="Seu e-mail"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
              >
                <Send className="h-4 w-4" /> Enviar
              </button>
            </form>
          </aside>
        </div>
      </main>
    </div>
  );
}
