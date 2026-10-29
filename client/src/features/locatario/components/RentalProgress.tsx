import { rentalSteps } from "../data";

export function RentalProgress({ current }: { current: number }) {
  return (
    <div className="progress-track" role="list" aria-label="Etapas da locação">
      {rentalSteps.map((step, index) => (
        <div key={step} role="listitem" className={`progress-step ${index < current ? "done" : index === current ? "current" : ""}`} aria-current={index === current ? "step" : undefined}>
          <span className="progress-bar" />
          <span className="progress-label">{step}</span>
        </div>
      ))}
    </div>
  );
}
