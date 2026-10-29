import { Link } from "wouter";
import { toast } from "sonner";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { ClientShell } from "../components/ClientShell";
import { StatusPill } from "../components/StatusPill";
import { useProposals } from "../ProposalsContext";
import type { ProposalStatus } from "../data";
import { formatCurrency } from "../utils";

const nextStep: Record<ProposalStatus, string> = {
  Enviada: "Aguarde: o proprietário costuma responder em até 2h.",
  "Em negociação": "O proprietário apresentou novas condições. Revise e responda para avançar.",
  Aceita: "Proposta aceita. O próximo passo é assinar o contrato digital.",
  "Aguardando pagamento": "Contrato assinado. Falta concluir o pagamento seguro para liberar a entrega.",
  Cancelada: "Esta proposta foi cancelada e não gera cobrança.",
};

export default function ProposalDetailPage({ params }: { params: { id: string } }) {
  const { proposals, setStatus } = useProposals();
  const proposal = proposals.find((item) => item.id === params.id);

  if (!proposal) {
    return (
      <ClientShell title="Proposta não encontrada">
        <section className="content-section">
          <div className="empty-state"><h3>Proposta não encontrada</h3><Link href="/propostas" className="text-action">Voltar para Minhas propostas</Link></div>
        </section>
      </ClientShell>
    );
  }

  const canCancel = proposal.status !== "Cancelada";
  const cancel = () => {
    setStatus(proposal.id, "Cancelada");
    toast.success("Proposta cancelada", { description: "Nenhuma cobrança foi gerada." });
  };

  return (
    <ClientShell title={proposal.id}>
      <div className="page-back"><Link href="/propostas" className="text-action"><ArrowLeft size={15} /> Voltar para Minhas propostas</Link></div>
      <section className="content-section info-card">
        <div className="info-card-head">
          <div><span className="eyebrow">Proposta {proposal.id}</span><h1 className="page-title">{proposal.machine}</h1></div>
          <StatusPill status={proposal.status} />
        </div>
        <dl className="info-grid">
          <div><dt>Proprietário</dt><dd>{proposal.owner}</dd></div>
          <div><dt>Período</dt><dd>{proposal.period}</dd></div>
          <div><dt>Valor estimado</dt><dd>{formatCurrency(proposal.total)}</dd></div>
        </dl>
        <p className="info-note"><ShieldCheck size={15} /> {nextStep[proposal.status]}</p>
        <div className="info-actions">
          <Link href={`/maquinas/${proposal.machineId}`} className="outline-button">Ver máquina</Link>
          {canCancel && <button type="button" className="outline-button danger" onClick={cancel}>Cancelar proposta</button>}
        </div>
      </section>
    </ClientShell>
  );
}
