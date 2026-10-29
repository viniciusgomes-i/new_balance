import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ProposalsProvider } from "./features/locatario/ProposalsContext";

// Cada tela é carregada sob demanda (code splitting por rota).
const NotFound = lazy(() => import("@/pages/NotFound"));
const Login = lazy(() => import("./pages/Login"));
const Owner = lazy(() => import("./pages/Owner"));
const Transporter = lazy(() => import("./pages/Transporter"));
const Operator = lazy(() => import("./pages/Operator"));

// Jornada do Locatário / Cliente
const ExplorePage = lazy(() => import("./features/locatario/pages/ExplorePage"));
const MachineDetailPage = lazy(() => import("./features/locatario/pages/MachineDetailPage"));
const ProposalPage = lazy(() => import("./features/locatario/pages/ProposalPage"));
const ProposalsPage = lazy(() => import("./features/locatario/pages/ProposalsPage"));
const ProposalDetailPage = lazy(() => import("./features/locatario/pages/ProposalDetailPage"));
const RentalsPage = lazy(() => import("./features/locatario/pages/RentalsPage"));
const RentalTrackingPage = lazy(() => import("./features/locatario/pages/RentalTrackingPage"));
const HelpPage = lazy(() => import("./features/locatario/pages/HelpPage"));
const MessagesPage = lazy(() => import("./features/locatario/pages/MessagesPage"));

function PageLoader() {
  return <div className="page-loader" role="status" aria-label="Carregando"><span className="live-dot" /></div>;
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={ExplorePage} />
        <Route path="/maquinas/:id/proposta" component={ProposalPage} />
        <Route path="/maquinas/:id" component={MachineDetailPage} />
        <Route path="/propostas" component={ProposalsPage} />
        <Route path="/propostas/:id" component={ProposalDetailPage} />
        <Route path="/locacoes" component={RentalsPage} />
        <Route path="/locacoes/:id" component={RentalTrackingPage} />
        <Route path="/ajuda" component={HelpPage} />
        <Route path="/mensagens" component={MessagesPage} />
        <Route path="/proprietario" component={Owner} />
        <Route path="/transportadora" component={Transporter} />
        <Route path="/operador" component={Operator} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster position="top-right" />
          <ProposalsProvider>
            <Router />
          </ProposalsProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
