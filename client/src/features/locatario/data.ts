export type Machine = {
  id: string;
  title: string;
  shortTitle: string;
  category: string;
  location: string;
  distance: string;
  daily: number;
  image: string;
  owner: string;
  ownerInitials: string;
  rating: number;
  reviews: number;
  tag: string;
  specs: [string, string, string];
  available: string;
  availableNow: boolean;
};

export const SPEC_LABELS = ["Peso operacional", "Potência", "Caçamba"] as const;

export const machines: Machine[] = [
  {
    id: "esc-320",
    title: "Escavadeira hidráulica 320",
    shortTitle: "Escavadeira 320",
    category: "Escavadeiras",
    location: "Cajamar, SP",
    distance: "24 km de você",
    daily: 980,
    image: "/machines/escavadeira-320.jpg",
    owner: "Terra Forte Máquinas",
    ownerInitials: "TF",
    rating: 4.9,
    reviews: 28,
    tag: "Mais procurada",
    specs: ["20,5 t", "145 hp", "1,2 m³"],
    available: "Disponível agora",
    availableNow: true,
  },
  {
    id: "esc-volvo",
    title: "Escavadeira Volvo EC210",
    shortTitle: "Volvo EC210",
    category: "Escavadeiras",
    location: "Osasco, SP",
    distance: "31 km de você",
    daily: 1150,
    image: "/machines/escavadeira-volvo.webp",
    owner: "Construmax Rental",
    ownerInitials: "CR",
    rating: 4.8,
    reviews: 19,
    tag: "Entrega rápida",
    specs: ["21,0 t", "148 hp", "1,0 m³"],
    available: "Disponível em 14/10",
    availableNow: false,
  },
  {
    id: "esc-case",
    title: "Escavadeira CASE CX380E",
    shortTitle: "CASE CX380E",
    category: "Escavadeiras",
    location: "Jundiaí, SP",
    distance: "52 km de você",
    daily: 1480,
    image: "/machines/escavadeira-case.webp",
    owner: "Lopes Equipamentos",
    ownerInitials: "LE",
    rating: 4.7,
    reviews: 14,
    tag: "Alta capacidade",
    specs: ["37,8 t", "270 hp", "2,2 m³"],
    available: "Disponível em 18/10",
    availableNow: false,
  },
  {
    id: "pa-938",
    title: "Pá carregadeira CAT 938",
    shortTitle: "Pá carregadeira 938",
    category: "Pás carregadeiras",
    location: "Guarulhos, SP",
    distance: "42 km de você",
    daily: 860,
    image: "/machines/escavadeira-volvo.webp",
    owner: "Base Locadora",
    ownerInitials: "BL",
    rating: 4.6,
    reviews: 11,
    tag: "Ótimo custo-benefício",
    specs: ["15,4 t", "188 hp", "2,7 m³"],
    available: "Disponível agora",
    availableNow: true,
  },
];

export const categories = ["Todas", "Escavadeiras", "Pás carregadeiras", "Retroescavadeiras"] as const;

export const getMachine = (id: string) => machines.find((machine) => machine.id === id);

export type ProposalStatus = "Enviada" | "Em negociação" | "Aceita" | "Aguardando pagamento" | "Cancelada";
export type ProposalTone = "green" | "blue" | "yellow";

export type Proposal = {
  id: string;
  machineId: string;
  machine: string;
  owner: string;
  period: string;
  total: number;
  status: ProposalStatus;
  tone: ProposalTone;
};

export const proposalStatuses: ProposalStatus[] = ["Enviada", "Em negociação", "Aceita", "Aguardando pagamento", "Cancelada"];

export const statusClass: Record<ProposalStatus, string> = {
  Enviada: "status-sent",
  "Em negociação": "status-negotiation",
  Aceita: "status-success",
  "Aguardando pagamento": "status-warning",
  Cancelada: "status-danger",
};

export const initialProposals: Proposal[] = [
  { id: "PRP-2041", machineId: "esc-320", machine: "Escavadeira 320", owner: "Terra Forte Máquinas", period: "14 — 18 out, 2026", total: 5450, status: "Em negociação", tone: "green" },
  { id: "PRP-2037", machineId: "pa-938", machine: "Pá carregadeira 938", owner: "Base Locadora", period: "21 — 23 out, 2026", total: 2580, status: "Aceita", tone: "blue" },
  { id: "PRP-2029", machineId: "esc-volvo", machine: "Volvo EC210", owner: "Construmax Rental", period: "02 — 06 nov, 2026", total: 6900, status: "Aguardando pagamento", tone: "yellow" },
];

export const activeRental = {
  id: "LOQ-10428",
  machine: "Escavadeira 320",
  headline: "Chegada prevista hoje, até 16:30",
  route: "Saindo de Cajamar, SP → Rod. Anhanguera, km 24",
  distanceLeft: "18 km",
  currentStep: 2,
};

export const rentalSteps = ["Proposta aceita", "Em preparação", "Em transporte", "Entregue"] as const;
