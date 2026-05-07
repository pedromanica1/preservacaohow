// Camada de serviços REST.
// Configure VITE_API_BASE_URL no seu .env (ex: VITE_API_BASE_URL=https://api.exemplo.com)

export type Unidade = {
  id: string;
  nome: string;
  dataCriacao: string;
  instituicao: string;
  municipios: string[];
  descricao: string;
  imagem: string;
  categoria: "Parque" | "Reserva";
};

export type Comunicacao = {
  id?: string;
  titulo: string;
  descricao: string;
  email: string;
  data: string;
};

export type NovaComunicacao = Omit<Comunicacao, "id" | "data">;

const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "") ??
  "/api";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    ...init,
  });
  if (!res.ok) {
    throw new Error(`Erro na requisição ${path}: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

export const api = {
  listarUnidades: () => request<Unidade[]>("/unidades"),
  obterUnidade: (id: string) => request<Unidade>(`/unidades/${encodeURIComponent(id)}`),
  listarComunicacoes: (unidadeId: string) =>
    request<Comunicacao[]>(`/unidades/${encodeURIComponent(unidadeId)}/comunicacoes`),
  criarComunicacao: (unidadeId: string, payload: NovaComunicacao) =>
    request<Comunicacao>(`/unidades/${encodeURIComponent(unidadeId)}/comunicacoes`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
