import type { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import {
  ArrowRight,
  Bell,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  FileCheck2,
  LayoutGrid,
  MapPin,
  Menu,
  MessageSquareText,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";
import { BrandMark } from "./BrandMark";
import { useProposals } from "../ProposalsContext";

const navItems = [
  { href: "/", match: (path: string) => path === "/" || path.startsWith("/maquinas"), label: "Explorar máquinas", icon: LayoutGrid },
  { href: "/propostas", match: (path: string) => path.startsWith("/propostas"), label: "Minhas propostas", icon: FileCheck2 },
  { href: "/locacoes", match: (path: string) => path.startsWith("/locacoes"), label: "Minhas locações", icon: PackageCheck },
];

const resourceItems = [
  { href: "/ajuda", label: "Central de ajuda", icon: CircleHelp },
  { href: "/mensagens", label: "Mensagens", icon: MessageSquareText, dot: true },
];

type Props = {
  /** Último item do breadcrumb (título da tela atual). */
  title: string;
  children: ReactNode;
};

export function ClientShell({ title, children }: Props) {
  const [path, setLocation] = useLocation();
  const { proposals } = useProposals();

  return (
    <div className="app-shell">
      <aside className="side-nav">
        <BrandMark />
        <div className="profile-switcher">
          <div className="avatar avatar-green">MC</div>
          <div><strong>Mariana Costa</strong><span>Locatária</span></div>
          <ChevronDown size={15} />
        </div>
        <div className="nav-section-label">Área do cliente</div>
        <nav aria-label="Área do cliente">
          {navItems.map(({ href, match, label, icon: Icon }) => {
            const active = match(path);
            return (
              <Link key={href} href={href} className={`nav-item ${active ? "active" : ""}`} aria-current={active ? "page" : undefined}>
                <Icon size={18} /><span>{label}</span>
                {href === "/propostas" && proposals.length > 0 && <b>{proposals.length}</b>}
              </Link>
            );
          })}
        </nav>
        <div className="nav-section-label nav-spacer">Recursos</div>
        <nav aria-label="Recursos">
          {resourceItems.map(({ href, label, icon: Icon, dot }) => {
            const active = path.startsWith(href);
            return (
              <Link key={href} href={href} className={`nav-item ${active ? "active" : ""}`} aria-current={active ? "page" : undefined}>
                <Icon size={18} /><span>{label}</span>{dot && !active && <i className="notification-dot" />}
              </Link>
            );
          })}
        </nav>
        <div className="side-nav-bottom">
          <div className="security-note"><ShieldCheck size={17} /><span>Transações protegidas<br /><b>pela LOQ</b></span></div>
          <Link href="/proprietario" className="owner-link"><span>Você é proprietário?</span><ArrowRight size={15} /></Link>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="mobile-brand"><Menu size={20} /><BrandMark /></div>
          <div className="breadcrumb"><span>Área do cliente</span><ChevronRight size={14} /><strong>{title}</strong></div>
          <div className="topbar-actions">
            <span className="location-chip"><MapPin size={15} /> São Paulo, SP <ChevronDown size={14} /></span>
            <button type="button" className="icon-button" aria-label="Notificações" onClick={() => toast.info("Você está em dia", { description: "Nenhuma notificação nova." })}><Bell size={18} /></button>
            <button type="button" className="top-avatar top-avatar-button" onClick={() => setLocation("/login")} aria-label="Trocar perfil">MC</button>
          </div>
        </header>
        {children}
        <footer className="main-footer">
          <span>LOQ · Locação inteligente de máquinas</span>
          <span>Operação segura do início ao fim <ShieldCheck size={14} /></span>
        </footer>
      </main>
    </div>
  );
}
