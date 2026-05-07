import { createFileRoute } from "@tanstack/react-router";
import { Leaf } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { UnidadeCard } from "@/components/UnidadeCard";

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
  const { data: unidades, isLoading, error } = useQuery({
    queryKey: ["unidades"],
    queryFn: () => api.listarUnidades(),
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-6xl px-6 py-16 text-primary-foreground">
          <div className="flex items-center gap-2 text-sm uppercase tracking-widest opacity-80">
            <Leaf className="h-4 w-4" />
            Unidades de Conservação · Santa Catarina
          </div>
          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">Preservar é Preciso</h1>
          <p className="mt-4 max-w-2xl text-base opacity-90 md:text-lg">
            Conheça as áreas de proteção ambiental administradas pelo IMA na zona costeira
            catarinense e contribua reportando observações.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Áreas de Preservação</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {isLoading
                ? "Carregando unidades..."
                : `${unidades?.length ?? 0} unidades disponíveis`}
            </p>
          </div>
        </div>

        {error && (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
            Não foi possível carregar as unidades. Verifique a configuração da API.
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {unidades?.map((u) => <UnidadeCard key={u.id} unidade={u} />)}
        </div>
      </main>

      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        Projeto de extensão UNIVALI · Unidades de Conservação é Preciso
      </footer>
    </div>
  );
}
