import { statusClass, type ProposalStatus } from "../data";

export function StatusPill({ status }: { status: ProposalStatus }) {
  return (
    <span className={`status-pill ${statusClass[status]}`}>
      <span className="status-pip" />
      {status}
    </span>
  );
}
