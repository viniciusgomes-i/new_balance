import { ClientShell } from "../components/ClientShell";

const faqs = [
  { q: "Como funciona o envio de uma proposta?", a: "Escolha a máquina, informe período e local de entrega e envie. O pagamento só é solicitado depois que o proprietário aceitar." },
  { q: "Posso cancelar uma proposta?", a: "Sim. Abra a proposta em Minhas propostas e use a opção de cancelamento. Propostas canceladas antes do pagamento não geram cobrança." },
  { q: "O seguro e o operador são obrigatórios?", a: "Não. Ambos são opcionais e o valor total da proposta é atualizado automaticamente quando você os inclui." },
  { q: "Como acompanho a entrega?", a: "Em Minhas locações, use Acompanhar entrega para ver as etapas e a previsão de chegada." },
];

export default function HelpPage() {
  return (
    <ClientShell title="Central de ajuda">
      <section className="content-section">
        <div className="section-heading"><div><span className="eyebrow">Suporte</span><h1 className="page-title">Central de ajuda</h1></div></div>
        <div className="faq-list">
          {faqs.map((item) => (
            <details key={item.q} className="faq-item"><summary>{item.q}</summary><p>{item.a}</p></details>
          ))}
        </div>
      </section>
    </ClientShell>
  );
}
