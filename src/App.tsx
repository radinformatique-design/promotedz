import React from 'react';
import { AppProvider, useApp } from './context/AppContext.tsx';
import { Sidebar } from './components/Sidebar.tsx';
import { Header } from './components/Header.tsx';
import { LoginView } from './views/LoginView.tsx';
import { AccessDeniedView } from './components/AccessDeniedView.tsx';
import { DashboardView } from './views/DashboardView.tsx';
import { ChantiersView } from './views/ChantiersView.tsx';
import { AdministrationView } from './views/AdministrationView.tsx';
import { NotificationsView } from './views/NotificationsView.tsx';
import { DocumentsView } from './views/DocumentsView.tsx';
import { SchemaViewer } from './components/SchemaViewer.tsx';
import { ModuleFoundationView } from './views/ModuleFoundationView.tsx';
import { ParametresView } from './views/ParametresView.tsx';
import { RHView } from './views/RHView.tsx';
import { ApprovisionnementsView } from './views/ApprovisionnementsView.tsx';
import { MagasinView } from './views/MagasinView.tsx';
import { MaterielView } from './views/MaterielView.tsx';
import { TechniqueView } from './views/TechniqueView.tsx';
import { ComptabiliteView } from './views/ComptabiliteView.tsx';
import { JuridiqueView } from './views/JuridiqueView.tsx';
import { CommercialView } from './views/CommercialView.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';

const AppContent: React.FC = () => {
  const { isAuthenticated, activeNav, securityViolation } = useApp();

  // Si l'utilisateur n'est pas connecté, afficher la page de connexion sécurisée
  if (!isAuthenticated) {
    return <LoginView />;
  }

  const renderActiveView = () => {
    // Si une violation de sécurité a été interceptée par le moteur RBAC
    if (securityViolation) {
      return <AccessDeniedView />;
    }

    switch (activeNav) {
      case 'dashboard':
        return <DashboardView />;
      case 'chantiers':
        return <ChantiersView />;
      case 'administration':
        return <AdministrationView />;
      case 'notifications':
        return <NotificationsView />;
      case 'documents':
        return <DocumentsView />;
      case 'schema':
        return <SchemaViewer />;
      case 'parametres':
        return <ParametresView />;
      case 'rh':
        return <RHView />;
      case 'approvisionnements':
        return <ApprovisionnementsView />;
      case 'magasin':
        return <MagasinView />;
      case 'materiel':
        return <MaterielView />;
      case 'technique':
        return <TechniqueView />;
      case 'comptabilite':
        return <ComptabiliteView />;
      case 'juridique':
        return <JuridiqueView />;
      case 'commercial':
        return <CommercialView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100 antialiased font-sans">
      {/* Sidebar Navigation avec état des droits */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Header avec sélecteur multi-chantiers et profils */}
        <Header />

        {/* Viewport */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            {renderActiveView()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
  );
}
