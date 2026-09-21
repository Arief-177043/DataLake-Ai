import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { api } from '@/services/api';
import type { Dataset } from '@/types';

import { Dashboard } from '@/pages/Dashboard';
import { DatasetManagement } from '@/pages/DatasetManagement';
import { DataIngestion } from '@/pages/DataIngestion';
import { DataProcessing } from '@/pages/DataProcessing';
import { DataQuality } from '@/pages/DataQuality';
import { DatasetVersioning } from '@/pages/DatasetVersioning';
import { DataLineage } from '@/pages/DataLineage';
import { StorageExplorer } from '@/pages/StorageExplorer';
import { ProcessingJobs } from '@/pages/ProcessingJobs';
import { Monitoring } from '@/pages/Monitoring';
import { AccessControl } from '@/pages/AccessControl';
import { SettingsPage } from '@/pages/Settings';

function App() {
  const { theme } = useTheme();
  const [activePage, setActivePage] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [datasets, setDatasets] = useState<Dataset[]>([]);

  useEffect(() => {
    api.getDatasets().then(setDatasets);
  }, []);

  const searchDatasets = datasets.map((d) => ({ id: d.id, name: d.name, description: d.description }));

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard onNavigate={setActivePage} />;
      case 'datasets': return <DatasetManagement />;
      case 'ingestion': return <DataIngestion />;
      case 'processing': return <DataProcessing />;
      case 'quality': return <DataQuality />;
      case 'versioning': return <DatasetVersioning />;
      case 'lineage': return <DataLineage />;
      case 'storage': return <StorageExplorer />;
      case 'jobs': return <ProcessingJobs />;
      case 'monitoring': return <Monitoring />;
      case 'access': return <AccessControl />;
      case 'settings': return <SettingsPage />;
      default: return <Dashboard onNavigate={setActivePage} />;
    }
  };

  return (
    <div className={cn('flex h-screen overflow-hidden', theme === 'dark' ? 'dark' : '')}>
      <Sidebar
        active={activePage}
        onNavigate={setActivePage}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
        searchQuery=""
        onSearchChange={() => {}}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onNavigate={setActivePage} searchDatasets={searchDatasets} />
        <main className="flex-1 overflow-y-auto scrollbar-thin p-4 lg:p-6">
          {renderPage()}
        </main>
      </div>
      <Toaster
        position="bottom-right"
        theme={theme === 'dark' ? 'dark' : 'light'}
        richColors
        closeButton
      />
    </div>
  );
}

export default App;
