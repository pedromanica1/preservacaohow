import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { UnidadeDetail } from "@/components/UnidadeDetail";

export const Route = createFileRoute("/unidade/$id")({
  component: UnidadeDetalhe,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <Link to="/" className="text-primary underline">
        Unidade não encontrada — voltar
      </Link>
    </div>
  ),
  errorComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <Link to="/" className="text-primary underline">
        Erro ao carregar unidade — voltar
      </Link>
    </div>
  ),
});

function UnidadeDetalhe() {
  const { id } = Route.useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["unidade", id],
    queryFn: () => api.obterUnidade(id),
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        Carregando...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Link to="/" className="text-primary underline">
          Não foi possível carregar a unidade — voltar
        </Link>
      </div>
    );
  }

  return <UnidadeDetail unidade={data} />;
}
