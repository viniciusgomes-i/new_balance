import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { initialProposals, type Proposal, type ProposalStatus } from "./data";

type ProposalsContextValue = {
  proposals: Proposal[];
  addProposal: (proposal: Omit<Proposal, "id" | "status" | "tone">) => Proposal;
  setStatus: (id: string, status: ProposalStatus) => void;
};

const ProposalsContext = createContext<ProposalsContextValue | null>(null);

export function ProposalsProvider({ children }: { children: ReactNode }) {
  const [proposals, setProposals] = useState<Proposal[]>(initialProposals);

  const addProposal = useCallback<ProposalsContextValue["addProposal"]>((data) => {
    const proposal: Proposal = { ...data, id: `PRP-${Date.now().toString().slice(-4)}`, status: "Enviada", tone: "green" };
    setProposals((current) => [proposal, ...current]);
    return proposal;
  }, []);

  const setStatus = useCallback((id: string, status: ProposalStatus) => {
    setProposals((current) => current.map((proposal) => (proposal.id === id ? { ...proposal, status } : proposal)));
  }, []);

  const value = useMemo(() => ({ proposals, addProposal, setStatus }), [proposals, addProposal, setStatus]);
  return <ProposalsContext.Provider value={value}>{children}</ProposalsContext.Provider>;
}

export function useProposals() {
  const context = useContext(ProposalsContext);
  if (!context) throw new Error("useProposals deve ser usado dentro de ProposalsProvider");
  return context;
}
