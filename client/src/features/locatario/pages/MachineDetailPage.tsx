import { Link } from "wouter";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { ClientShell } from "../components/ClientShell";
import { SPEC_LABELS, getMachine } from "../data";
import { formatCurrency } from "../utils";

export default function MachineDetailPage({ params }: { params: { id: string } }) {
  const machine = getMachine(params.id);

  if (!machine) {
    return (
      <ClientShell title="Máquina não encontrada">
        <section className="content-section">
          <div className="empty-state"><h3>Máquina não encontrada</h3><p>Ela pode ter sido removida ou o link está incorreto.</p><Link href="/" className="text-action">Voltar para a busca</Link></div>
        </section>
      </ClientShell>
    );
  }

  return (
    <ClientShell title={machine.shortTitle}>
      <div className="page-back"><Link href="/" className="text-action"><ArrowLeft size={15} /> Voltar para a busca</Link></div>
      <article className="detail-page">
        <div className="detail-visual">
          <img src={machine.image} alt={machine.title} />
          <span className="available-pill"><span className="live-dot" /> {machine.available}</span>
        </div>
        <div className="detail-copy">
          <span className="eyebrow">{machine.category} · {machine.location}</span>
          <h1>{machine.title}</h1>
          <div className="detail-rating"><span>★</span> {machine.rating} <small>({machine.reviews} avaliações)</small></div>
          <p className="detail-description">Equipamento revisado e pronto para entrar em operação. Ideal para escavação, movimentação de solo e abertura de valas em obras de médio e grande porte.</p>
          <div className="detail-specs">
            {machine.specs.map((spec, index) => <div key={SPEC_LABELS[index]}><strong>{SPEC_LABELS[index]}</strong><span>{spec}</span></div>)}
          </div>
          <div className="owner-line">
            <div className="avatar avatar-navy">{machine.ownerInitials}</div>
            <div><span>Disponibilizado por</span><strong>{machine.owner}</strong></div>
            <ChevronRight size={16} />
          </div>
          <div className="detail-bottom">
            <div><span className="price-label">diária estimada</span><strong>{formatCurrency(machine.daily)}</strong></div>
            <Link href={`/maquinas/${machine.id}/proposta`} className="primary-button">Montar proposta <ArrowRight size={16} /></Link>
          </div>
        </div>
      </article>
    </ClientShell>
  );
}
