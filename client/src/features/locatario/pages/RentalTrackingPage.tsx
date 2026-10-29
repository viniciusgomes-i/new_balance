import { Link } from "wouter";
import { ArrowLeft, MapPin, Truck } from "lucide-react";
import { ClientShell } from "../components/ClientShell";
import { RentalProgress } from "../components/RentalProgress";
import { activeRental } from "../data";

export default function RentalTrackingPage({ params }: { params: { id: string } }) {
  if (params.id !== activeRental.id) {
    return (
      <ClientShell title="Locação não encontrada">
        <section className="content-section">
          <div className="empty-state"><h3>Locação não encontrada</h3><Link href="/locacoes" className="text-action">Voltar para Minhas locações</Link></div>
        </section>
      </ClientShell>
    );
  }

  return (
    <ClientShell title={`Entrega ${activeRental.id}`}>
      <div className="page-back"><Link href="/locacoes" className="text-action"><ArrowLeft size={15} /> Voltar para Minhas locações</Link></div>
      <section className="content-section info-card">
        <div className="info-card-head">
          <div><span className="eyebrow">{activeRental.id} · {activeRental.machine}</span><h1 className="page-title">{activeRental.headline}</h1></div>
        </div>
        <RentalProgress current={activeRental.currentStep} />
        <dl className="info-grid">
          <div><dt>Trajeto</dt><dd>{activeRental.route}</dd></div>
          <div><dt>Distância restante</dt><dd>{activeRental.distanceLeft}</dd></div>
          <div><dt>Situação</dt><dd>Em transporte</dd></div>
        </dl>
        <p className="info-note"><Truck size={15} /> O motorista está a {activeRental.distanceLeft} do local de entrega.</p>
        <p className="info-note"><MapPin size={15} /> O mapa de rastreamento em tempo real chega na Release 2 (acompanhamento da entrega).</p>
      </section>
    </ClientShell>
  );
}
