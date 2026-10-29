import { Link } from "wouter";
import { ArrowRight, Truck } from "lucide-react";
import { ClientShell } from "../components/ClientShell";
import { RentalProgress } from "../components/RentalProgress";
import { activeRental } from "../data";

export default function RentalsPage() {
  return (
    <ClientShell title="Minhas locações">
      <section className="content-section">
        <div className="section-heading">
          <div><span className="eyebrow">Operações em andamento</span><h1 className="page-title">Minhas locações</h1></div>
          <button type="button" className="outline-button" disabled title="Histórico disponível na Release 2">Ver histórico <ArrowRight size={15} /></button>
        </div>
        <div className="rental-highlight">
          <div className="rental-status"><span className="live-dot" /> Em transporte</div>
          <div className="rental-title">
            <div className="rental-icon"><Truck size={24} /></div>
            <div>
              <span>{activeRental.id} · {activeRental.machine}</span>
              <h2>{activeRental.headline}</h2>
              <p>{activeRental.route}</p>
            </div>
          </div>
          <RentalProgress current={activeRental.currentStep} />
          <Link href={`/locacoes/${activeRental.id}`} className="primary-button">Acompanhar entrega <ArrowRight size={16} /></Link>
        </div>
      </section>
    </ClientShell>
  );
}
