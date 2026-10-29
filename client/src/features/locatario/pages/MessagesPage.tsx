import { ClientShell } from "../components/ClientShell";

const threads = [
  { owner: "Terra Forte Máquinas", initials: "TF", preview: "Podemos fechar a diária em R$ 950 para 5 dias.", time: "10:42", unread: true },
  { owner: "Base Locadora", initials: "BL", preview: "Contrato disponível para assinatura.", time: "Ontem", unread: false },
  { owner: "Construmax Rental", initials: "CR", preview: "Aguardamos a confirmação do pagamento.", time: "Seg", unread: false },
];

export default function MessagesPage() {
  return (
    <ClientShell title="Mensagens">
      <section className="content-section">
        <div className="section-heading"><div><span className="eyebrow">Conversas com proprietários</span><h1 className="page-title">Mensagens</h1></div></div>
        <ul className="thread-list">
          {threads.map((thread) => (
            <li key={thread.owner} className="thread-row">
              <div className="avatar avatar-navy">{thread.initials}</div>
              <div className="thread-main"><strong>{thread.owner}</strong><span>{thread.preview}</span></div>
              <div className="thread-meta"><span>{thread.time}</span>{thread.unread && <i className="notification-dot" aria-label="Não lida" />}</div>
            </li>
          ))}
        </ul>
      </section>
    </ClientShell>
  );
}
