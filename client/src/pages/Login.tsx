import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { ArrowRight, Check, ChevronDown, LockKeyhole, Mail, ShieldCheck, UserRound, Truck, HardHat } from "lucide-react";

const profiles = [
  { id: "cliente", label: "Locatário / Cliente", description: "Buscar e contratar máquinas", path: "/", icon: UserRound, tone: "green" },
  { id: "proprietario", label: "Proprietário / Locador", description: "Gerenciar sua frota", path: "/proprietario", icon: HardHat, tone: "navy" },
  { id: "transportadora", label: "Transportadora", description: "Encontrar fretes compatíveis", path: "/transportadora", icon: Truck, tone: "orange" },
  { id: "operador", label: "Operador", description: "Receber oportunidades de serviço", path: "/operador", icon: ShieldCheck, tone: "lime" },
];

export default function Login() {
  const [, setLocation] = useLocation();
  const [selected, setSelected] = useState(profiles[0]);
  const [showProfiles, setShowProfiles] = useState(false);
  const [email, setEmail] = useState("demo@loq.com.br");
  const [password, setPassword] = useState("123456");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !password) {
      toast.error("Preencha e-mail e senha para continuar");
      return;
    }
    toast.success(`Login demo como ${selected.label}`, { description: "Sessão fictícia iniciada para validação do MVP." });
    setLocation(selected.path);
  };

  return <main className="login-page">
    <section className="login-brand-panel">
      <div className="login-brand-top"><div className="brand-lockup"><span className="brand-mark"><span /></span><span className="brand-name">LOQ</span></div><span className="demo-badge">MVP · DEMO</span></div>
      <div className="login-brand-copy"><span className="hero-kicker"><span className="live-dot" /> Plataforma de locação</span><h1>Uma operação.<br /><em>Todos os caminhos.</em></h1><p>Conecte obra, máquina, transporte e experiência profissional em um só lugar.</p></div>
      <div className="login-quote"><span>“</span><p>A LOQ dá ritmo para quem faz a infraestrutura acontecer.</p></div>
      <div className="login-brand-footer"><span>Transações protegidas pela LOQ</span><ShieldCheck size={16} /></div>
    </section>
    <section className="login-form-panel"><button className="login-back" onClick={() => setLocation("/")}>← Voltar ao site</button><div className="login-form-wrap"><div className="login-heading"><span className="eyebrow">Acesso de demonstração</span><h2>Entre na sua operação</h2><p>Use qualquer e-mail e senha para explorar uma visão do MVP.</p></div><form onSubmit={submit}><label>Entrar como</label><div className="profile-select-wrap"><button type="button" className="profile-select" onClick={() => setShowProfiles(!showProfiles)}><span className={`login-profile-icon ${selected.tone}`}><selected.icon size={17} /></span><span><strong>{selected.label}</strong><small>{selected.description}</small></span><ChevronDown size={16} /></button>{showProfiles && <div className="profile-options">{profiles.map((profile) => <button type="button" key={profile.id} onClick={() => { setSelected(profile); setShowProfiles(false); }}><span className={`login-profile-icon ${profile.tone}`}><profile.icon size={15} /></span><span><strong>{profile.label}</strong><small>{profile.description}</small></span>{selected.id === profile.id && <Check size={15} />}</button>)}</div>}</div><label>E-mail</label><div className="login-input"><Mail size={16} /><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="voce@empresa.com.br" /></div><label>Senha</label><div className="login-input"><LockKeyhole size={16} /><input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="••••••••" /><button type="button" className="password-help" onClick={() => toast.info("Senha demo: 123456")}>?</button></div><div className="login-options"><label className="remember-check"><input type="checkbox" defaultChecked /> <span /> Lembrar acesso</label><button type="button" className="forgot-button" onClick={() => toast.info("Recuperação fictícia", { description: "No MVP demo, use a senha 123456." })}>Esqueci minha senha</button></div><button type="submit" className="primary-button login-submit">Acessar visão demo <ArrowRight size={17} /></button></form><div className="demo-tip"><ShieldCheck size={17} /><div><strong>Ambiente fictício de demonstração</strong><span>Nenhuma informação é salva ou enviada para um serviço externo.</span></div></div></div><footer className="login-footer">Ao continuar, você concorda com os termos de uso da LOQ.</footer></section>
  </main>;
}
