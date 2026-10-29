import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  FileCheck2,
  Filter,
  Heart,
  LayoutGrid,
  ListFilter,
  MapPin,
  Menu,
  MessageSquareText,
  PackageCheck,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Truck,
  UserRound,
  X,
  Zap,
} from "lucide-react";

const machines = [
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
    rating: 4.9,
    reviews: 28,
    tag: "Mais procurada",
    specs: ["20,5 t", "145 hp", "1,2 m³"],
    available: "Disponível agora",
  },
  {
    id: "esc-volvo",
    title: "Escavadeira Volvo EC210",
    shortTitle: "Volvo EC210",
    category: "Escavadeiras",
    location: "Osasco, SP",
    distance: "31 km de você",
    daily: 1_150,
    image: "/machines/escavadeira-volvo.webp",
    owner: "Construmax Rental",
    rating: 4.8,
    reviews: 19,
    tag: "Entrega rápida",
    specs: ["21,0 t", "148 hp", "1,0 m³"],
    available: "Disponível em 14/10",
  },
  {
    id: "esc-case",
    title: "Escavadeira CASE CX380E",
    shortTitle: "CASE CX380E",
    category: "Escavadeiras",
    location: "Jundiaí, SP",
    distance: "52 km de você",
    daily: 1_480,
    image: "/machines/escavadeira-case.webp",
    owner: "Lopes Equipamentos",
    rating: 4.7,
    reviews: 14,
    tag: "Alta capacidade",
    specs: ["37,8 t", "270 hp", "2,2 m³"],
    available: "Disponível em 18/10",
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
    rating: 4.6,
    reviews: 11,
    tag: "Ótimo custo-benefício",
    specs: ["15,4 t", "188 hp", "2,7 m³"],
    available: "Disponível agora",
  },
];

const categories = ["Todas", "Escavadeiras", "Pás carregadeiras", "Retroescavadeiras"];

const statusStyles: Record<string, string> = {
  "Em negociação": "status-negotiation",
  Aceita: "status-success",
  "Aguardando pagamento": "status-warning",
};

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

function BrandMark() {
  return (
    <div className="brand-lockup" aria-label="LOQ">
      <span className="brand-mark"><span /></span>
      <span className="brand-name">LOQ</span>
    </div>
  );
}

function IconButton({ label, children, onClick }: { label: string; children: React.ReactNode; onClick?: () => void }) {
  return <button className="icon-button" aria-label={label} onClick={onClick}>{children}</button>;
}

function MachineCard({ machine, onDetails, onProposal }: { machine: typeof machines[number]; onDetails: () => void; onProposal: () => void }) {
  return (
    <article className="machine-card">
      <div className="machine-image-wrap">
        <img src={machine.image} alt={machine.title} className="machine-image" />
        <span className="machine-tag"><Sparkles size={12} /> {machine.tag}</span>
        <button className="save-machine" aria-label={`Salvar ${machine.title}`}><Heart size={17} /></button>
      </div>
      <div className="machine-card-body">
        <div className="machine-card-heading">
          <div>
            <span className="eyebrow">{machine.category}</span>
            <h3>{machine.title}</h3>
          </div>
          <div className="rating"><span>★</span> {machine.rating} <small>({machine.reviews})</small></div>
        </div>
        <div className="machine-meta"><MapPin size={14} /> {machine.location} <span className="dot-separator" /> {machine.distance}</div>
        <div className="spec-row">{machine.specs.map((spec) => <span key={spec}>{spec}</span>)}</div>
        <div className="machine-card-footer">
          <div><span className="price-label">a partir de</span><strong>{formatCurrency(machine.daily)}</strong><span className="price-unit">/ dia</span></div>
          <button className="text-action" onClick={onDetails}>Ver detalhes <ArrowRight size={15} /></button>
        </div>
        <button className="primary-button full-button" onClick={onProposal}>Enviar proposta <ArrowRight size={16} /></button>
      </div>
    </article>
  );
}

function SideNav({ active, onNavigate }: { active: string; onNavigate: (target: string) => void }) {
  const items = [
    { id: "explorar", label: "Explorar máquinas", icon: LayoutGrid },
    { id: "propostas", label: "Minhas propostas", icon: FileCheck2, count: 3 },
    { id: "locacoes", label: "Minhas locações", icon: PackageCheck },
  ];
  return (
    <aside className="side-nav">
      <BrandMark />
      <div className="profile-switcher">
        <div className="avatar avatar-green">MC</div>
        <div><strong>Mariana Costa</strong><span>Locatária</span></div>
        <ChevronDown size={15} />
      </div>
      <div className="nav-section-label">Área do cliente</div>
      <nav>
        {items.map(({ id, label, icon: Icon, count }) => <button key={id} className={`nav-item ${active === id ? "active" : ""}`} onClick={() => onNavigate(id)}><Icon size={18} /><span>{label}</span>{count && <b>{count}</b>}</button>)}
      </nav>
      <div className="nav-section-label nav-spacer">Recursos</div>
      <nav>
        <button className="nav-item" onClick={() => toast.info("Central de ajuda em breve") }><CircleHelp size={18} /><span>Central de ajuda</span></button>
        <button className="nav-item" onClick={() => toast.info("Mensagens sincronizadas") }><MessageSquareText size={18} /><span>Mensagens</span><i className="notification-dot" /></button>
      </nav>
      <div className="side-nav-bottom">
        <div className="security-note"><ShieldCheck size={17} /><span>Transações protegidas<br /><b>pela LOQ</b></span></div>
        <button className="owner-link" onClick={() => onNavigate("owner")}><span>Você é proprietário?</span><ArrowRight size={15} /></button>
      </div>
    </aside>
  );
}

function DetailModal({ machine, onClose, onProposal }: { machine: typeof machines[number]; onClose: () => void; onProposal: () => void }) {
  return <div className="modal-backdrop" onMouseDown={onClose}>
    <div className="detail-modal" onMouseDown={(event) => event.stopPropagation()}>
      <button className="modal-close" onClick={onClose} aria-label="Fechar"><X size={19} /></button>
      <div className="detail-visual"><img src={machine.image} alt={machine.title} /><span className="available-pill"><span className="live-dot" /> {machine.available}</span></div>
      <div className="detail-copy">
        <span className="eyebrow">{machine.category} · {machine.location}</span>
        <h2>{machine.title}</h2>
        <div className="detail-rating"><span>★</span> {machine.rating} <small>({machine.reviews} avaliações)</small></div>
        <p className="detail-description">Equipamento revisado e pronto para entrar em operação. Ideal para escavação, movimentação de solo e abertura de valas em obras de médio e grande porte.</p>
        <div className="detail-specs">{machine.specs.map((spec, index) => <div key={spec}><strong>{["Peso operacional", "Potência", "Caçamba"][index]}</strong><span>{spec}</span></div>)}</div>
        <div className="owner-line"><div className="avatar avatar-navy">TF</div><div><span>Disponibilizado por</span><strong>{machine.owner}</strong></div><ChevronRight size={16} /></div>
        <div className="detail-bottom"><div><span className="price-label">diária estimada</span><strong>{formatCurrency(machine.daily)}</strong></div><button className="primary-button" onClick={onProposal}>Montar proposta <ArrowRight size={16} /></button></div>
      </div>
    </div>
  </div>;
}

function ProposalModal({ machine, onClose, onSent }: { machine: typeof machines[number]; onClose: () => void; onSent: () => void }) {
  const [withInsurance, setWithInsurance] = useState(true);
  const [withOperator, setWithOperator] = useState(false);
  const [days, setDays] = useState(5);
  const insurance = withInsurance ? 110 * days : 0;
  const operator = withOperator ? 280 * days : 0;
  const total = machine.daily * days + insurance + operator;
  const submit = () => { onClose(); onSent(); toast.success("Proposta enviada para análise", { description: `${machine.shortTitle} · ${days} diárias` }); };
  return <div className="modal-backdrop" onMouseDown={onClose}>
    <div className="proposal-modal" onMouseDown={(event) => event.stopPropagation()}>
      <div className="proposal-header"><div><span className="eyebrow">Nova proposta</span><h2>{machine.shortTitle}</h2></div><button className="modal-close inline" onClick={onClose} aria-label="Fechar"><X size={19} /></button></div>
      <div className="proposal-content">
        <div className="form-column">
          <label>Período de utilização</label>
          <div className="date-grid"><div className="field-with-icon"><CalendarDays size={16} /><input type="text" defaultValue="14/10/2026" aria-label="Data de início" /></div><span>até</span><div className="field-with-icon"><CalendarDays size={16} /><input type="text" defaultValue="18/10/2026" aria-label="Data de fim" /></div></div>
          <label>Quantidade de diárias</label>
          <div className="stepper"><button onClick={() => setDays(Math.max(1, days - 1))}>−</button><strong>{days} {days === 1 ? "dia" : "dias"}</strong><button onClick={() => setDays(days + 1)}>+</button></div>
          <label>Local de entrega</label>
          <div className="field-with-icon"><MapPin size={16} /><input type="text" defaultValue="Rod. Anhanguera, km 24 — São Paulo, SP" aria-label="Local de entrega" /></div>
          <label>Adicionais</label>
          <button className={`toggle-option ${withInsurance ? "selected" : ""}`} onClick={() => setWithInsurance(!withInsurance)}><span className="check-box">{withInsurance && <Check size={13} />}</span><span><strong>Seguro contra danos</strong><small>Proteção durante toda a locação</small></span><b>+ {formatCurrency(110)}/dia</b></button>
          <button className={`toggle-option ${withOperator ? "selected" : ""}`} onClick={() => setWithOperator(!withOperator)}><span className="check-box">{withOperator && <Check size={13} />}</span><span><strong>Adicionar operador especializado</strong><small>Profissional habilitado pela LOQ</small></span><b>+ {formatCurrency(280)}/dia</b></button>
        </div>
        <aside className="proposal-summary"><div className="summary-machine"><img src={machine.image} alt="" /><div><strong>{machine.shortTitle}</strong><span>{machine.location}</span></div></div><div className="summary-line"><span>{formatCurrency(machine.daily)} × {days} diárias</span><strong>{formatCurrency(machine.daily * days)}</strong></div>{withInsurance && <div className="summary-line"><span>Seguro LOQ</span><strong>{formatCurrency(insurance)}</strong></div>}{withOperator && <div className="summary-line"><span>Operador</span><strong>{formatCurrency(operator)}</strong></div>}<div className="summary-total"><span>Estimativa total</span><strong>{formatCurrency(total)}</strong></div><p><ShieldCheck size={15} /> O pagamento só é solicitado após o proprietário aceitar.</p><button className="primary-button full-button" onClick={submit}>Enviar proposta <ArrowRight size={16} /></button></aside>
      </div>
    </div>
  </div>;
}

function ProposalsView() {
  const proposals = [
    { machine: "Escavadeira 320", owner: "Terra Forte Máquinas", date: "14 — 18 out, 2026", value: "R$ 5.450", status: "Em negociação", color: "green" },
    { machine: "Pá carregadeira 938", owner: "Base Locadora", date: "21 — 23 out, 2026", value: "R$ 2.580", status: "Aceita", color: "blue" },
    { machine: "Volvo EC210", owner: "Construmax Rental", date: "02 — 06 nov, 2026", value: "R$ 6.900", status: "Aguardando pagamento", color: "yellow" },
  ];
  return <section className="content-section proposals-view"><div className="section-heading"><div><span className="eyebrow">Acompanhe em um só lugar</span><h2>Minhas propostas</h2></div><button className="outline-button">Filtrar status <ListFilter size={15} /></button></div><div className="proposals-list">{proposals.map((proposal) => <div className="proposal-row" key={proposal.machine}><div className={`proposal-thumb ${proposal.color}`}><Truck size={21} /></div><div className="proposal-main"><strong>{proposal.machine}</strong><span>{proposal.owner} · {proposal.date}</span></div><div className="proposal-value"><span>Valor estimado</span><strong>{proposal.value}</strong></div><span className={`status-pill ${statusStyles[proposal.status]}`}><span className="status-pip" />{proposal.status}</span><button className="icon-button small" aria-label={`Abrir proposta ${proposal.machine}`}><ChevronRight size={17} /></button></div>)}</div></section>;
}

function Home() {
  const [, setLocation] = useLocation();
  const [activeView, setActiveView] = useState("explorar");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [selectedMachine, setSelectedMachine] = useState<typeof machines[number] | null>(null);
  const [proposalMachine, setProposalMachine] = useState<typeof machines[number] | null>(null);
  const filteredMachines = useMemo(() => machines.filter((machine) => {
    const matchesCategory = category === "Todas" || machine.category === category;
    const matchesQuery = !query || `${machine.title} ${machine.category} ${machine.location}`.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  }), [category, query]);
  const navigate = (target: string) => {
    if (target === "owner") { setLocation("/proprietario"); return; }
    setActiveView(target);
  };
  return <div className="app-shell">
    <SideNav active={activeView} onNavigate={navigate} />
    <main className="main-content">
      <header className="topbar"><div className="mobile-brand"><Menu size={20} /><BrandMark /></div><div className="breadcrumb"><span>Área do cliente</span><ChevronRight size={14} /><strong>{activeView === "explorar" ? "Explorar máquinas" : activeView === "propostas" ? "Minhas propostas" : "Minhas locações"}</strong></div><div className="topbar-actions"><span className="location-chip"><MapPin size={15} /> São Paulo, SP <ChevronDown size={14} /></span><IconButton label="Notificações" onClick={() => toast.info("Você está em dia", { description: "Nenhuma notificação nova." })}><Bell size={18} /></IconButton><button className="top-avatar top-avatar-button" onClick={() => setLocation("/login")} aria-label="Trocar perfil">MC</button></div></header>
      {activeView === "explorar" ? <>
        <section className="hero-panel"><div className="hero-content"><div className="hero-kicker"><span className="live-dot" /> 1.248 máquinas disponíveis hoje</div><h1>Encontre a máquina certa<br /><em>para o próximo avanço.</em></h1><p>Compare equipamentos verificados, negocie direto com o proprietário e mantenha sua obra no ritmo.</p><div className="hero-trust"><span><ShieldCheck size={15} /> Proprietários verificados</span><span><Zap size={15} /> Resposta em até 2h</span></div></div><div className="hero-orbit"><div className="orbit-ring ring-1" /><div className="orbit-ring ring-2" /><div className="orbit-core"><span>LOQ</span><small>CONEXÃO<br />QUE MOVE</small></div><div className="orbit-float float-1"><Truck size={16} /> 24h</div><div className="orbit-float float-2"><Check size={16} /> Verificado</div></div></section>
        <section className="search-panel"><div className="search-field"><Search size={19} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busque por máquina, modelo ou categoria" /><kbd>⌘ K</kbd></div><div className="search-divider" /><button className="search-filter"><MapPin size={17} /><span><small>Onde?</small> São Paulo, SP</span><ChevronDown size={15} /></button><div className="search-divider" /><button className="search-filter"><CalendarDays size={17} /><span><small>Quando?</small> Selecione o período</span><ChevronDown size={15} /></button><button className="search-button" onClick={() => toast.success(`${filteredMachines.length} máquinas encontradas`)}>Buscar <ArrowRight size={17} /></button></section>
        <section className="content-section"><div className="section-heading"><div><span className="eyebrow">Equipamentos perto de você</span><h2>Explore máquinas disponíveis</h2></div><button className="outline-button" onClick={() => toast.info("Filtros avançados", { description: "Em breve você poderá filtrar também por capacidade e preço." })}><SlidersHorizontal size={16} /> Todos os filtros</button></div><div className="category-tabs">{categories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}{item === "Todas" && <span>{machines.length}</span>}</button>)}</div><div className="machine-grid">{filteredMachines.map((machine) => <MachineCard key={machine.id} machine={machine} onDetails={() => setSelectedMachine(machine)} onProposal={() => setProposalMachine(machine)} />)}</div>{filteredMachines.length === 0 && <div className="empty-state"><Search size={27} /><h3>Nenhuma máquina encontrada</h3><p>Tente buscar por outra categoria ou localização.</p></div>}<button className="load-more" onClick={() => toast.info("Você já está vendo as melhores opções para este período.")}>Ver todas as máquinas <ArrowRight size={16} /></button></section>
      </> : activeView === "propostas" ? <ProposalsView /> : <section className="content-section"><div className="section-heading"><div><span className="eyebrow">Operações em andamento</span><h2>Minhas locações</h2></div><button className="outline-button">Ver histórico <ArrowRight size={15} /></button></div><div className="rental-highlight"><div className="rental-status"><span className="live-dot" /> Em transporte</div><div className="rental-title"><div className="rental-icon"><Truck size={24} /></div><div><span>LOQ-10428 · Escavadeira 320</span><h3>Chegada prevista hoje, até 16:30</h3><p>Saindo de Cajamar, SP → Rod. Anhanguera, km 24</p></div></div><div className="progress-track"><span className="done" /><span className="done" /><span className="current" /><span /><div className="progress-labels"><span>Proposta aceita</span><span>Em preparação</span><span>Em transporte</span><span>Entregue</span></div></div><button className="primary-button" onClick={() => toast.info("Rastreamento GPS", { description: "O motorista está a 18 km do local de entrega." })}>Acompanhar entrega <ArrowRight size={16} /></button></div></section>}
      <footer className="main-footer"><span>LOQ · Locação inteligente de máquinas</span><span>Operação segura do início ao fim <ShieldCheck size={14} /></span></footer>
    </main>
    {selectedMachine && <DetailModal machine={selectedMachine} onClose={() => setSelectedMachine(null)} onProposal={() => { setProposalMachine(selectedMachine); setSelectedMachine(null); }} />}
    {proposalMachine && <ProposalModal machine={proposalMachine} onClose={() => setProposalMachine(null)} onSent={() => { setProposalMachine(null); setActiveView("propostas"); }} />}
  </div>;
}

export default Home;
