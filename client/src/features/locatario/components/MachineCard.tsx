import { memo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Heart, MapPin, Sparkles } from "lucide-react";
import { formatCurrency } from "../utils";
import type { Machine } from "../data";

export const MachineCard = memo(function MachineCard({ machine }: { machine: Machine }) {
  const [saved, setSaved] = useState(false);
  return (
    <article className="machine-card">
      <div className="machine-image-wrap">
        <img src={machine.image} alt={machine.title} className="machine-image" loading="lazy" decoding="async" />
        <span className="machine-tag"><Sparkles size={12} /> {machine.tag}</span>
        <button
          type="button"
          className={`save-machine ${saved ? "saved" : ""}`}
          aria-label={`${saved ? "Remover dos salvos:" : "Salvar"} ${machine.title}`}
          aria-pressed={saved}
          onClick={() => setSaved((value) => !value)}
        >
          <Heart size={17} />
        </button>
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
          <div>
            <span className="price-label">a partir de</span>
            <strong>{formatCurrency(machine.daily)}</strong>
            <span className="price-unit">/ dia</span>
          </div>
          <Link href={`/maquinas/${machine.id}`} className="text-action">Ver detalhes <ArrowRight size={15} /></Link>
        </div>
        <Link href={`/maquinas/${machine.id}/proposta`} className="primary-button full-button">Enviar proposta <ArrowRight size={16} /></Link>
      </div>
    </article>
  );
});
