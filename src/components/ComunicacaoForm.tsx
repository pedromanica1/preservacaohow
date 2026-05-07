import { useState } from "react";
import { Send } from "lucide-react";
import type { NovaComunicacao } from "@/services/api";

type Props = {
  onSubmit: (payload: NovaComunicacao) => Promise<void> | void;
  enviando?: boolean;
};

export function ComunicacaoForm({ onSubmit, enviando }: Props) {
  const [form, setForm] = useState<NovaComunicacao>({
    titulo: "",
    descricao: "",
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.titulo || !form.descricao || !form.email) return;
    await onSubmit(form);
    setForm({ titulo: "", descricao: "", email: "" });
  };

  return (
    <aside className="rounded-xl bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
      <h2 className="text-lg font-semibold text-card-foreground">Enviar comunicação</h2>
      <p className="mt-1 text-xs text-muted-foreground">
        Reporte problemas ou sugestões aos gestores.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
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
          onChange={(e) => setForm({ ...form, descricao: e.target.value })}
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
          disabled={enviando}
          className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90 disabled:opacity-60"
        >
          <Send className="h-4 w-4" /> {enviando ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </aside>
  );
}
