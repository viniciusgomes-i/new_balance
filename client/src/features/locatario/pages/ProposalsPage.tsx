import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ChevronRight, FileCheck2, Truck } from "lucide-react";
import { ClientShell } from "../components/ClientShell";
import { StatusPill } from "../components/StatusPill";
import { useProposals } from "../ProposalsContext";
import { proposalStatuses, type ProposalStatus } from "../data";
import { formatCurrency } from "../utils";

export default function ProposalsPage() {
  const { proposals } = useProposals();
  const [filter, setFilter] = useState<ProposalStatus | "Todas">("Todas");
  const visible = useMemo(() => (filter === "Todas" ? proposals : proposals.filter((p) => p.status === filter)), [proposals, filter]);

  return (
    <ClientShell title="Minhas propostas">
      <section className="content-section proposals-view">
        <div className="section-heading">
          <div><span className="eyebrow">Acompanhe em um só lugar</span><h1 className="page-title">Minhas propostas</h1></div>
        </div>
        <div className="category-tabs" role="group" aria-label="Filtrar por status">
          {(["Todas", ...proposalStatuses] as const).map((item) => (
            <button type="button" key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>
              {item}{item === "Todas" && <span>{proposals.length}</span>}
            </button>
          ))}
        </div>
        <div className="proposals-list">
          {visible.map((proposal) => (
            <Link key={proposal.id} href={`/propostas/${proposal.id}`} className="proposal-row">
              <div className={`proposal-thumb ${proposal.tone}`}><Truck size={21} /></div>
              <div className="proposal-main"><strong>{proposal.machine}</strong><span>{proposal.owner} · {proposal.period}</span></div>
              <div className="proposal-value"><span>Valor estimado</span><strong>{formatCurrency(proposal.total)}</strong></div>
              <StatusPill status={proposal.status} />
              <span className="icon-button small" aria-hidden="true"><ChevronRight size={17} /></span>
            </Link>
          ))}
          {visible.length === 0 && (
            <div className="empty-state"><FileCheck2 size={27} /><h3>Nenhuma proposta neste status</h3><p>Escolha outro filtro ou envie uma nova proposta.</p></div>
          )}
        </div>
      </section>
    </ClientShell>
  );
}
