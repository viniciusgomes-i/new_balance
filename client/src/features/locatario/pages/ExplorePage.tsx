import { useMemo, useRef, useState } from "react";
import { ArrowRight, CalendarDays, Check, ChevronDown, MapPin, Search, ShieldCheck, SlidersHorizontal, Sparkles, Truck, Zap } from "lucide-react";
import { ClientShell } from "../components/ClientShell";
import { MachineCard } from "../components/MachineCard";
import { categories, machines } from "../data";

type Sort = "relevancia" | "menor" | "maior";

export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("Todas");
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState<Sort>("relevancia");
  const [onlyNow, setOnlyNow] = useState(false);
  const resultsRef = useRef<HTMLElement>(null);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    const list = machines.filter((machine) => {
      const matchesCategory = category === "Todas" || machine.category === category;
      const matchesQuery = !term || `${machine.title} ${machine.category} ${machine.location}`.toLowerCase().includes(term);
      return matchesCategory && matchesQuery && (!onlyNow || machine.availableNow);
    });
    if (sort === "menor") return [...list].sort((a, b) => a.daily - b.daily);
    if (sort === "maior") return [...list].sort((a, b) => b.daily - a.daily);
    return list;
  }, [query, category, onlyNow, sort]);

  return (
    <ClientShell title="Explorar máquinas">
      <section className="hero-panel">
        <div className="hero-content">
          <div className="hero-kicker"><span className="live-dot" /> 1.248 máquinas disponíveis hoje</div>
          <h1>Encontre a máquina certa<br /><em>para o próximo avanço.</em></h1>
          <p>Compare equipamentos verificados, negocie direto com o proprietário e mantenha sua obra no ritmo.</p>
          <div className="hero-trust"><span><ShieldCheck size={15} /> Proprietários verificados</span><span><Zap size={15} /> Resposta em até 2h</span></div>
        </div>
        <div className="hero-orbit" aria-hidden="true">
          <div className="orbit-ring ring-1" /><div className="orbit-ring ring-2" />
          <div className="orbit-core"><span>LOQ</span><small>CONEXÃO<br />QUE MOVE</small></div>
          <div className="orbit-float float-1"><Truck size={16} /> 24h</div>
          <div className="orbit-float float-2"><Check size={16} /> Verificado</div>
        </div>
      </section>

      <section className="search-panel" role="search">
        <div className="search-field">
          <Search size={19} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busque por máquina, modelo ou categoria" aria-label="Buscar máquinas" />
        </div>
        <div className="search-divider" />
        <button type="button" className="search-filter"><MapPin size={17} /><span><small>Onde?</small> São Paulo, SP</span><ChevronDown size={15} /></button>
        <div className="search-divider" />
        <button type="button" className="search-filter"><CalendarDays size={17} /><span><small>Quando?</small> Selecione o período</span><ChevronDown size={15} /></button>
        <button type="button" className="search-button" onClick={() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}>
          Buscar <ArrowRight size={17} />
        </button>
      </section>

      <section className="content-section" ref={resultsRef}>
        <div className="section-heading">
          <div><span className="eyebrow">Equipamentos perto de você</span><h2>Explore máquinas disponíveis</h2></div>
          <button type="button" className="outline-button" aria-expanded={showFilters} onClick={() => setShowFilters((value) => !value)}>
            <SlidersHorizontal size={16} /> Todos os filtros
          </button>
        </div>

        {showFilters && (
          <div className="filters-panel">
            <label className="filter-field">
              <span>Ordenar por</span>
              <select value={sort} onChange={(event) => setSort(event.target.value as Sort)}>
                <option value="relevancia">Relevância</option>
                <option value="menor">Menor preço</option>
                <option value="maior">Maior preço</option>
              </select>
            </label>
            <label className="filter-check">
              <input type="checkbox" checked={onlyNow} onChange={(event) => setOnlyNow(event.target.checked)} />
              <span>Somente disponíveis agora</span>
            </label>
          </div>
        )}

        <div className="category-tabs">
          {categories.map((item) => (
            <button type="button" key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>
              {item}{item === "Todas" && <span>{machines.length}</span>}
            </button>
          ))}
        </div>

        <div className="machine-grid">{filtered.map((machine) => <MachineCard key={machine.id} machine={machine} />)}</div>
        {filtered.length === 0 && (
          <div className="empty-state"><Search size={27} /><h3>Nenhuma máquina encontrada</h3><p>Tente buscar por outra categoria ou localização.</p></div>
        )}
        <p className="results-count" aria-live="polite"><Sparkles size={13} /> {filtered.length} {filtered.length === 1 ? "máquina encontrada" : "máquinas encontradas"}</p>
      </section>
    </ClientShell>
  );
}
