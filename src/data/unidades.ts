import acarai from "@/assets/acarai.jpg";
import fritz from "@/assets/fritz.jpg";
import rioVermelho from "@/assets/rio-vermelho.jpg";
import araucarias from "@/assets/araucarias.jpg";

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

export const unidades: Unidade[] = [
  {
    id: "acarai",
    nome: "Parque Estadual Acaraí",
    dataCriacao: "2005-09-23",
    instituicao: "IMA - Instituto do Meio Ambiente de SC",
    municipios: ["São Francisco do Sul"],
    descricao:
      "Área de preservação na zona costeira norte de Santa Catarina, com restingas, lagoas, manguezais e praias preservadas.",
    imagem: acarai,
    categoria: "Parque",
  },
  {
    id: "fritz",
    nome: "Parque Estadual Fritz Plaumann",
    dataCriacao: "2003-12-23",
    instituicao: "IMA - Instituto do Meio Ambiente de SC",
    municipios: ["Concórdia"],
    descricao:
      "Remanescente da Floresta Estacional Decidual às margens do rio Uruguai, abrigando rica biodiversidade da região oeste.",
    imagem: fritz,
    categoria: "Parque",
  },
  {
    id: "rio-vermelho",
    nome: "Parque Estadual do Rio Vermelho",
    dataCriacao: "2007-08-15",
    instituicao: "IMA - Instituto do Meio Ambiente de SC",
    municipios: ["Florianópolis"],
    descricao:
      "Localizado no norte da Ilha de Santa Catarina, protege restinga, dunas e a Lagoa da Conceição.",
    imagem: rioVermelho,
    categoria: "Parque",
  },
  {
    id: "araucarias",
    nome: "Parque Estadual das Araucárias",
    dataCriacao: "2003-09-23",
    instituicao: "IMA - Instituto do Meio Ambiente de SC",
    municipios: ["São Domingos", "Galvão"],
    descricao:
      "Protege um dos últimos redutos significativos da Floresta Ombrófila Mista, com araucárias centenárias.",
    imagem: araucarias,
    categoria: "Parque",
  },
];
