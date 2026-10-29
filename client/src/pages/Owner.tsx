import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import {
  ArrowDownRight,
  ArrowRight,
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  FileCheck2,
  Gauge,
  LayoutDashboard,
  ListFilter,
  Menu,
  Package,
  Plus,
  ShieldCheck,
  Truck,
  UserRound,
  WalletCards,
} from "lucide-react";

function BrandMark() {
  return <div className="brand-lockup"><span className="brand-mark"><span /></span><span className="brand-name">LOQ</span></div>;
}

const proposals = [
  { initials: "MC", color: "green", client: "Mariana Costa", machine: "Escavadeira hidráulica 320", period: "14 — 18 out, 2026", place: "São Paulo, SP", value: "R$ 4.900", status: "Nova proposta" },
  { initials: "RA", color: "orange", client: "Rafael Almeida", machine: "Pá carregadeira CAT 938", period: "21 — 23 out, 2026", place: "Barueri, SP", value: "R$ 2.580", status: "Em negociação" },
  { initials: "NS", color: "blue", client: "Norte Sul Obras", machine: "Escavadeira hidráulica 320", period: "03 — 12 nov, 2026", place: "Campinas, SP", value: "R$ 9.800", status: "Aguardando cliente" },
];

function SideNav({ onBack }: { onBack: () => void }) {
  const items = [
    { label: "Visão geral", icon: LayoutDashboard, active: true },
    { label: "Meus equipamentos", icon: Package },
    { label: "Propostas recebidas", icon: FileCheck2, count: 2 },
    { label: "Disponibilidade", icon: CalendarDays },
  ];
  return <aside className="side-nav owner-side"><BrandMark /><div className="profile-switcher"><div className="avatar avatar-lime">TF</div><div><strong>Terra Forte</strong><span>Proprietário</span></div><ChevronDown size={15} /></div><div className="nav-section-label">Gestão da operação</div><nav>{items.map(({ label, icon: Icon, active, count }) => <button className={`nav-item ${active ? "active" : ""}`} key={label} onClick={() => !active && toast.info(label, { description: "Módulo disponível na próxima etapa." })}><Icon size={18} /><span>{label}</span>{count && <b>{count}</b>}</button>)}</nav><div className="nav-section-label nav-spacer">Financeiro</div><nav><button className="nav-item" onClick={() => toast.info("Extrato financeiro em breve")}><WalletCards size={18} /><span>Pagamentos</span></button><button className="nav-item" onClick={() => toast.info("Relatórios em breve")}><Gauge size={18} /><span>Indicadores</span></button></nav><div className="side-nav-bottom"><button className="back-to-client" onClick={onBack}><ArrowRight size={15} /> Voltar para área do cliente</button><div className="security-note"><ShieldCheck size={17} /><span>Receba com segurança<br /><b>em cada locação</b></span></div></div></aside>;
}

function Metric({ label, value, delta, icon: Icon, tone }: { label: string; value: string; delta: string; icon: typeof Gauge; tone: string }) {
  return <div className="metric-card"><div className={`metric-icon ${tone}`}><Icon size={18} /></div><span>{label}</span><strong>{value}</strong><small><ArrowDownRight size={13} /> {delta}</small></div>;
}

export default function Owner() {
  const [, setLocation] = useLocation();
  const [proposalStates, setProposalStates] = useState<Record<string, string>>({});
  const updateProposal = (client: string, status: string) => { setProposalStates((prev) => ({ ...prev, [client]: status })); toast.success(status === "Aceita" ? "Proposta aceita" : "Proposta recusada", { description: `${client} será notificado agora.` }); };
  return <div className="app-shell owner-shell"><SideNav onBack={() => setLocation("/")} /><main className="main-content"><header className="topbar"><div className="mobile-brand"><Menu size={20} /><BrandMark /></div><div className="breadcrumb"><span>Área do proprietário</span><ChevronRight size={14} /><strong>Visão geral</strong></div><div className="topbar-actions"><button className="help-button" onClick={() => toast.info("Central de ajuda")}> <CircleHelp size={17} /> Ajuda</button><button className="icon-button" onClick={() => toast.info("Você está em dia", { description: "Nenhuma notificação nova." })}><Bell size={18} /></button><button className="top-avatar avatar-lime top-avatar-button" onClick={() => setLocation("/login")} aria-label="Trocar perfil">TF</button></div></header><section className="owner-heading"><div><span className="eyebrow">Quarta-feira, 08 de outubro de 2026</span><h1>Bom dia, Terra Forte</h1><p>Veja como sua frota está performando hoje.</p></div><button className="primary-button" onClick={() => toast.success("Novo equipamento", { description: "Formulário de cadastro pronto para a próxima etapa." })}><Plus size={17} /> Cadastrar equipamento</button></section><section className="metrics-grid"><Metric label="Receita este mês" value="R$ 18.420" delta="12,8% vs. mês anterior" icon={WalletCards} tone="green" /><Metric label="Locações ativas" value="06" delta="2 novas esta semana" icon={Truck} tone="blue" /><Metric label="Taxa de ocupação" value="78%" delta="4,2% vs. mês anterior" icon={Gauge} tone="lime" /><Metric label="Avaliação média" value="4,9" delta="28 avaliações" icon={ShieldCheck} tone="purple" /></section><section className="owner-grid"><div className="owner-panel proposals-panel"><div className="panel-heading"><div><span className="eyebrow">Ação necessária</span><h2>Propostas recebidas <span className="count-badge">{proposals.length}</span></h2></div><button className="text-action">Ver todas <ArrowRight size={15} /></button></div><div className="owner-proposals">{proposals.map((proposal) => { const status = proposalStates[proposal.client] || proposal.status; return <div className="owner-proposal" key={proposal.client}><div className={`avatar avatar-${proposal.color}`}>{proposal.initials}</div><div className="owner-proposal-info"><strong>{proposal.client}</strong><span>{proposal.machine}</span><small><CalendarDays size={13} /> {proposal.period} <span className="dot-separator" /> <span>{proposal.place}</span></small></div><div className="owner-proposal-value"><strong>{proposal.value}</strong><span className={`proposal-status ${status.includes("Nova") ? "new" : status === "Aceita" ? "accepted" : ""}`}>{status}</span></div>{status === "Nova proposta" ? <div className="proposal-actions"><button className="accept-action" onClick={() => updateProposal(proposal.client, "Aceita")}>Aceitar</button><button className="reject-action" onClick={() => updateProposal(proposal.client, "Recusada")}>Recusar</button></div> : <button className="icon-button small"><ChevronRight size={17} /></button>}</div>})}</div></div><div className="owner-panel fleet-panel"><div className="panel-heading"><div><span className="eyebrow">Visão da frota</span><h2>Seus equipamentos</h2></div><button className="icon-button small" onClick={() => toast.info("Equipamentos", { description: "Acesse a aba Meus equipamentos para ver a lista completa." })}><ArrowRight size={16} /></button></div><div className="fleet-list"><div className="fleet-item"><div className="fleet-thumb green-machine"><Truck size={20} /></div><div><strong>Escavadeira 320</strong><span>R$ 980/dia · 1 locação ativa</span></div><span className="fleet-status">Disponível</span></div><div className="fleet-item"><div className="fleet-thumb blue-machine"><Package size={20} /></div><div><strong>Pá carregadeira 938</strong><span>R$ 860/dia · 2 locações ativas</span></div><span className="fleet-status busy">Em uso</span></div><div className="fleet-item"><div className="fleet-thumb gray-machine"><Truck size={20} /></div><div><strong>Retroescavadeira JCB</strong><span>R$ 720/dia · Sem agenda</span></div><span className="fleet-status">Disponível</span></div></div><button className="outline-button full-button" onClick={() => toast.info("Calendário de disponibilidade", { description: "A visualização por período está sendo preparada." })}>Gerenciar disponibilidade <CalendarDays size={15} /></button></div></section><section className="owner-insight"><div className="insight-icon"><Sparkline /></div><div><strong>Sua ocupação cresceu 18% este mês</strong><span>Adicionar disponibilidade para novembro pode gerar até <b>R$ 6.240</b> em receita estimada.</span></div><button className="text-action" onClick={() => toast.info("Recomendação de preço", { description: "Vamos sugerir os melhores períodos para sua frota." })}>Ver oportunidade <ArrowRight size={15} /></button></section><footer className="main-footer"><span>LOQ · Gestão inteligente de equipamentos</span><span>Dados atualizados há 4 min <span className="live-dot" /></span></footer></main></div>;
}

function Sparkline() {
  return <svg viewBox="0 0 48 32" width="48" height="32" aria-hidden="true"><path d="M2 26 12 19 18 22 27 11 35 15 46 3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 26 12 19 18 22 27 11 35 15 46 3V32H2Z" fill="currentColor" opacity=".12" /></svg>;
}
