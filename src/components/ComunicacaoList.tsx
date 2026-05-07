import type { Comunicacao } from "@/services/api";

export function ComunicacaoList({
  comunicacoes,
  carregando,
}: {
  comunicacoes: Comunicacao[];
  carregando?: boolean;
}) {
  if (carregando) {
    return <p className="text-sm text-muted-foreground">Carregando comunicações...</p>;
  }
  if (comunicacoes.length === 0) {
    return <p className="text-sm text-muted-foreground">Nenhuma comunicação enviada ainda.</p>;
  }
  return (
    <div className="space-y-3">
      {comunicacoes.map((c, i) => (
        <div key={c.id ?? i} className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-card-foreground">{c.titulo}</h3>
            <span className="text-xs text-muted-foreground">
              {new Date(c.data).toLocaleString("pt-BR")}
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{c.descricao}</p>
          <p className="mt-2 text-xs text-muted-foreground">por {c.email} · em análise</p>
        </div>
      ))}
    </div>
  );
}
