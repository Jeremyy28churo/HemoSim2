import { useState } from 'react';
import { Activity, BookOpen, GraduationCap } from 'lucide-react';
import SimulatorTab from './components/SimulatorTab';
import PracticeTab from './components/PracticeTab';
import EvaluationTab from './components/EvaluationTab';
import ComparisonTab from './components/ComparisonTab';

function App() {
  const [activeTab, setActiveTab] = useState<'sim'|'comp'|'prac'|'eval'>('sim');
  const [isEvaluating, setIsEvaluating] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="bg-red-700 text-white shadow-md p-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-2 justify-center md:justify-start">
            <Activity size={32} />
            <h1 className="text-2xl font-bold">HemoSim</h1>
          </div>
          {!isEvaluating && (
            <nav className="flex flex-wrap justify-center gap-2">
              <button 
                onClick={() => setActiveTab('sim')}
              className={`px-3 py-2 text-sm md:text-base rounded flex items-center gap-2 ${activeTab === 'sim' ? 'bg-red-800 font-bold' : 'hover:bg-red-600'}`}
            >
              <Activity size={18} /> Simulación
            </button>
            <button 
              onClick={() => setActiveTab('comp')}
              className={`px-3 py-2 text-sm md:text-base rounded flex items-center gap-2 ${activeTab === 'comp' ? 'bg-red-800 font-bold' : 'hover:bg-red-600'}`}
            >
              <Activity size={18} /> Comparación
            </button>

            <button 
              onClick={() => setActiveTab('prac')}
              className={`px-3 py-2 text-sm md:text-base rounded flex items-center gap-2 ${activeTab === 'prac' ? 'bg-red-800 font-bold' : 'hover:bg-red-600'}`}
            >
              <BookOpen size={18} /> Práctica
            </button>
            <button 
              onClick={() => setActiveTab('eval')}
              className={`px-3 py-2 text-sm md:text-base rounded flex items-center gap-2 ${activeTab === 'eval' ? 'bg-red-800 font-bold' : 'hover:bg-red-600'}`}
            >
                <GraduationCap size={18} /> Evaluación
              </button>
            </nav>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 py-8">
        {activeTab === 'sim' && <SimulatorTab />}
        {activeTab === 'comp' && <ComparisonTab />}
        {activeTab === 'prac' && <PracticeTab />}
        {activeTab === 'eval' && (
          <EvaluationTab 
            onEvaluationStart={() => setIsEvaluating(true)} 
            onEvaluationEnd={() => setIsEvaluating(false)} 
          />
        )}
      </main>

      <footer className="text-center p-6 text-slate-500 text-sm mt-auto">
        <p>HemoSim - Fisiología Animal Agropecuaria - Grupo 6</p>
      </footer>
    </div>
  );
}

export default App;
