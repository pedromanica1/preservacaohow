import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Calendar, Leaf } from "lucide-react";
import { unidades } from "@/data/unidades";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Unidades de Conservação — SC" },
      {
        name: "description",
        content:
          "Conheça as Unidades de Conservação da zona costeira catarinense administradas pelo IMA.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-6xl px-6 py-16 text-primary-foreground">
          <div className="flex items-center gap-2 text-sm uppercase tracking-widest opacity-80">
            <Leaf className="h-4 w-4" />
            Unidades de Conservação · Santa Catarina
          </div>
          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
            Preservar é Preciso
          </h1>
          <p className="mt-4 max-w-2xl text-base opacity-90 md:text-lg">
            Conheça as áreas de proteção ambiental administradas pelo IMA na
            zona costeira catarinense e contribua reportando observações.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">
              Áreas de Preservação
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {unidades.length} unidades disponíveis
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {unidades.map((u) => (
            <Link
              key={u.id}
              to="/unidade/$id"
              params={{ id: u.id }}
              className="group overflow-hidden rounded-xl bg-card transition-transform hover:-translate-y-1"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={u.imagem}
                  alt={u.nome}
                  width={1024}
                  height={640}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                  {u.categoria}
                </div>
                <h3 className="mt-2 text-lg font-semibold text-card-foreground">
                  {u.nome}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {u.descricao}
                </p>
                <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {u.municipios.join(", ")}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(u.dataCriacao).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        Projeto de extensão UNIVALI · Unidades de Conservação é Preciso
      </footer>
    </div>
  );
}
