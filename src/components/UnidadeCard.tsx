import { Link } from "@tanstack/react-router";
import { MapPin, Calendar } from "lucide-react";
import type { Unidade } from "@/services/api";

export function UnidadeCard({ unidade }: { unidade: Unidade }) {
  return (
    <Link
      to="/unidade/$id"
      params={{ id: unidade.id }}
      className="group overflow-hidden rounded-xl bg-card transition-transform hover:-translate-y-1"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="aspect-[16/10] overflow-hidden bg-secondary/40">
        <img
          src={unidade.imagem}
          alt={unidade.nome}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
          {unidade.categoria}
        </div>
        <h3 className="mt-2 text-lg font-semibold text-card-foreground">{unidade.nome}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{unidade.descricao}</p>
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {unidade.municipios.join(", ")}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {unidade.dataCriacao}
          </span>
        </div>
      </div>
    </Link>
  );
}
