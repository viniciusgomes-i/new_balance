import { useState } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, CalendarDays, Check, MapPin, ShieldCheck } from "lucide-react";
import { ClientShell } from "../components/ClientShell";
import { useProposals } from "../ProposalsContext";
import { getMachine } from "../data";
import { formatCurrency } from "../utils";

const INSURANCE_DAILY = 110;
const OPERATOR_DAILY = 280;

export default function ProposalPage({ params }: { params: { id: string } }) {
  const machine = getMachine(params.id);
  const [, setLocation] = useLocation();
  const { addProposal } = useProposals();
  const [withInsurance, setWithInsurance] = useState(true);
  const [withOperator, setWithOperator] = useState(false);
  const [days, setDays] = useState(5);
  const [start, setStart] = useState("14/10/2026");
  const [end, setEnd] = useState("18/10/2026");
  const [address, setAddress] = useState("Rod. Anhanguera, km 24 — São Paulo, SP");

  if (!machine) {
    return (
      <ClientShell title="Nova proposta">
        <section className="content-section">
          <div className="empty-state"><h3>Máquina não encontrada</h3><Link href="/" className="text-action">Voltar para a busca</Link></div>
        </section>
      </ClientShell>
    );
  }

  const base = machine.daily * days;
  const insurance = withInsurance ? INSURANCE_DAILY * days : 0;
  const operator = withOperator ? OPERATOR_DAILY * days : 0;
  const total = base + insurance + operator;

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!start.trim() || !end.trim() || !address.trim()) {
      toast.error("Preencha o período e o local de entrega");
      return;
    }
    addProposal({ machineId: machine.id, machine: machine.shortTitle, owner: machine.owner, period: `${start} — ${end}`, total });
    toast.success("Proposta enviada para análise", { description: `${machine.shortTitle} · ${days} diárias` });
    setLocation("/propostas");
  };

  return (
    <ClientShell title="Nova proposta">
      <div className="page-back"><Link href={`/maquinas/${machine.id}`} className="text-action"><ArrowLeft size={15} /> Voltar para os detalhes</Link></div>
      <form className="proposal-page" onSubmit={submit}>
        <div className="proposal-header"><div><span className="eyebrow">Nova proposta</span><h1>{machine.shortTitle}</h1></div></div>
        <div className="proposal-content">
          <div className="form-column">
            <label htmlFor="start">Período de utilização</label>
            <div className="date-grid">
              <div className="field-with-icon"><CalendarDays size={16} /><input id="start" value={start} onChange={(e) => setStart(e.target.value)} aria-label="Data de início" /></div>
              <span>até</span>
              <div className="field-with-icon"><CalendarDays size={16} /><input value={end} onChange={(e) => setEnd(e.target.value)} aria-label="Data de fim" /></div>
            </div>
            <label>Quantidade de diárias</label>
            <div className="stepper">
              <button type="button" onClick={() => setDays((value) => Math.max(1, value - 1))} aria-label="Diminuir diárias">−</button>
              <strong>{days} {days === 1 ? "dia" : "dias"}</strong>
              <button type="button" onClick={() => setDays((value) => value + 1)} aria-label="Aumentar diárias">+</button>
            </div>
            <label htmlFor="address">Local de entrega</label>
            <div className="field-with-icon"><MapPin size={16} /><input id="address" value={address} onChange={(e) => setAddress(e.target.value)} /></div>
            <label>Adicionais</label>
            <button type="button" className={`toggle-option ${withInsurance ? "selected" : ""}`} aria-pressed={withInsurance} onClick={() => setWithInsurance((v) => !v)}>
              <span className="check-box">{withInsurance && <Check size={13} />}</span>
              <span><strong>Seguro contra danos</strong><small>Proteção durante toda a locação</small></span>
              <b>+ {formatCurrency(INSURANCE_DAILY)}/dia</b>
            </button>
            <button type="button" className={`toggle-option ${withOperator ? "selected" : ""}`} aria-pressed={withOperator} onClick={() => setWithOperator((v) => !v)}>
              <span className="check-box">{withOperator && <Check size={13} />}</span>
              <span><strong>Adicionar operador especializado</strong><small>Profissional habilitado pela LOQ</small></span>
              <b>+ {formatCurrency(OPERATOR_DAILY)}/dia</b>
            </button>
          </div>
          <aside className="proposal-summary">
            <div className="summary-machine"><img src={machine.image} alt="" /><div><strong>{machine.shortTitle}</strong><span>{machine.location}</span></div></div>
            <div className="summary-line"><span>{formatCurrency(machine.daily)} × {days} diárias</span><strong>{formatCurrency(base)}</strong></div>
            {withInsurance && <div className="summary-line"><span>Seguro LOQ</span><strong>{formatCurrency(insurance)}</strong></div>}
            {withOperator && <div className="summary-line"><span>Operador</span><strong>{formatCurrency(operator)}</strong></div>}
            <div className="summary-total"><span>Estimativa total</span><strong>{formatCurrency(total)}</strong></div>
            <p><ShieldCheck size={15} /> O pagamento só é solicitado após o proprietário aceitar.</p>
            <button type="submit" className="primary-button full-button">Enviar proposta <ArrowRight size={16} /></button>
          </aside>
        </div>
      </form>
    </ClientShell>
  );
}
