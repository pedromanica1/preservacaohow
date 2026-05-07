import { Link } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Calendar, Building2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, type Unidade, type NovaComunicacao } from "@/services/api";
import { ComunicacaoForm } from "./ComunicacaoForm";
import { ComunicacaoList } from "./ComunicacaoList";

export function UnidadeDetail({ unidade }: { unidade: Unidade }) {
  const queryClient = useQueryClient();

  const comunicacoesQuery = useQuery({
    queryKey: ["comunicacoes", unidade.id],
    queryFn: () => api.listarComunicacoes(unidade.id),
  });

  const criarMutation = useMutation({
    mutationFn: (payload: NovaComunicacao) => api.criarComunicacao(unidade.id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comunicacoes", unidade.id] });
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="relative" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-10 text-primary-foreground">
          <Link
            to="/"
            className="self-start inline-flex items-center gap-1 text-sm opacity-90 hover:opacity-100"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Link>
          <img
            src={unidade.imagem}
            alt={unidade.nome}
            className="h-40 w-auto rounded-lg bg-background/90 p-3"
          />
          <h1 className="text-center text-2xl font-bold md:text-3xl">{unidade.nome}</h1>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-[1fr_360px]">
          <section>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="h-4 w-4" /> {unidade.instituicao}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {unidade.municipios.join(", ")}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> {unidade.dataCriacao}
              </span>
            </div>
            <p className="mt-6 text-base leading-relaxed text-foreground">{unidade.descricao}</p>

            <h2 className="mt-10 text-xl font-semibold text-foreground">Comunicações</h2>
            <div className="mt-4">
              <ComunicacaoList
                comunicacoes={comunicacoesQuery.data ?? []}
                carregando={comunicacoesQuery.isLoading}
              />
            </div>
          </section>

          <ComunicacaoForm
            onSubmit={async (payload) => {
              await criarMutation.mutateAsync(payload);
            }}
            enviando={criarMutation.isPending}
          />
        </div>
      </main>
    </div>
  );
}
