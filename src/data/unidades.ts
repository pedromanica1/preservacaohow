import logoAcarai from "@/assets/acarai-foto.jpg";
import logoAguai from "@/assets/logo-aguai.png";
import logoAraucarias from "@/assets/logo-araucarias.png";
import logoCanela from "@/assets/canela-preta.jpg";

export type Unidade = {
  id: string;
  nome: string;
  dataCriacao: string; // dd/mm/yyyy (formato fixo p/ evitar mismatch SSR)
  instituicao: string;
  municipios: string[];
  descricao: string;
  imagem: string;
  categoria: "Parque" | "Reserva";
};

export const unidades: Unidade[] = [
  {
    id: "acarai",
    nome: "Parque Estadual Acaraí",
    dataCriacao: "23/09/2005",
    instituicao: "IMA - Instituto do Meio Ambiente de SC",
    municipios: ["São Francisco do Sul"],
    descricao:
      "Área de preservação na zona costeira norte de SC, com restingas, lagoas, manguezais e praias preservadas.",
    imagem: logoAcarai,
    categoria: "Parque",
  },
  {
    id: "aguai",
    nome: "Reserva Biológica Estadual do Aguaí",
    dataCriacao: "12/06/1983",
    instituicao: "IMA - Instituto do Meio Ambiente de SC",
    municipios: ["Nova Veneza", "Siderópolis", "Treviso", "Maracajá"],
    descricao:
      "Reserva no sul catarinense que protege nascentes da Serra Geral e remanescentes da Mata Atlântica.",
    imagem: logoAguai,
    categoria: "Reserva",
  },
  {
    id: "araucarias",
    nome: "Parque Estadual das Araucárias",
    dataCriacao: "23/09/2003",
    instituicao: "IMA - Instituto do Meio Ambiente de SC",
    municipios: ["São Domingos", "Galvão"],
    descricao:
      "Protege um dos últimos redutos significativos da Floresta Ombrófila Mista, com araucárias centenárias.",
    imagem: logoAraucarias,
    categoria: "Parque",
  },
  {
    id: "canela-preta",
    nome: "Reserva Biológica da Canela Preta",
    dataCriacao: "30/12/1980",
    instituicao: "IMA - Instituto do Meio Ambiente de SC",
    municipios: ["Botuverá", "São João Batista", "Major Gercino"],
    descricao:
      "Reserva que protege a canela-preta e remanescentes de Mata Atlântica no vale do Itajaí.",
    imagem: logoCanela,
    categoria: "Reserva",
  },
];
