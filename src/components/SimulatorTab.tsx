import { useState, useEffect } from 'react';
import { speciesList } from '../data/species';
import { cantones } from '../data/eloro-cantones';
import { calculateO2Capacity, calculateO2Saturation, calculateAdaptationIndex } from '../utils/calculations';
import { Beaker, Droplets, ArrowUpCircle, MapPin, Sun, Mountain, Info } from 'lucide-react';
import SpeciesSelect from './SpeciesSelect';

const SimulatorTab = () => {
  const [selectedCantonId, setSelectedCantonId] = useState(cantones[0].id);
  const canton = cantones.find(c => c.id === selectedCantonId) || cantones[0];
  
  const compatibleSpecies = speciesList.filter(s => s.location === canton.region || s.location === 'Ambas');
  
  const [selectedSpecies, setSelectedSpecies] = useState(compatibleSpecies[0]);
  const [hct, setHct] = useState(compatibleSpecies[0].ranges.hct.typical);
  const [hb, setHb] = useState(compatibleSpecies[0].ranges.hb.typical);
  const [altitude, setAltitude] = useState(canton.altitud_promedio);

  // When canton changes, update altitude and ensure species is compatible
  useEffect(() => {
    setAltitude(canton.altitud_promedio);
    const newCompatible = speciesList.filter(s => s.location === canton.region || s.location === 'Ambas');
    if (!newCompatible.find(s => s.id === selectedSpecies.id)) {
      setSelectedSpecies(newCompatible[0]);
      setHct(newCompatible[0].ranges.hct.typical);
      setHb(newCompatible[0].ranges.hb.typical);
    }
  }, [selectedCantonId, canton.altitud_promedio, canton.region, selectedSpecies.id]);

  const handleSpeciesChange = (id: string) => {
    const sp = compatibleSpecies.find(s => s.id === id);
    if (sp) {
      setSelectedSpecies(sp);
      setHct(sp.ranges.hct.typical);
      setHb(sp.ranges.hb.typical);
    }
  };

  const o2Capacity = calculateO2Capacity(hb);
  const isAdapted = selectedSpecies.location === 'Sierra' || selectedSpecies.location === 'Ambas';
  const o2Sat = calculateO2Saturation(altitude, isAdapted);
  const adaptIndex = calculateAdaptationIndex(hct, altitude, selectedSpecies.ranges.hct.typical);

  return (
    <div className="space-y-6">
      
      {/* SECCIÓN 1: SELECCIÓN DE CANTÓN */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-b pb-2">
          <MapPin className="text-red-600" />
          1. Selecciona el Cantón (Escenario)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-slate-700 mb-2 bg-blue-50 px-2 py-1 rounded">Región Costa</h3>
            <div className="flex flex-wrap gap-2">
              {cantones.filter(c => c.region === 'Costa').map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCantonId(c.id)}
                  className={`px-3 py-1.5 rounded text-sm transition-colors border ${
                    selectedCantonId === c.id 
                      ? 'bg-blue-600 text-white border-blue-600 font-bold' 
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-blue-50'
                  }`}
                >
                  {c.nombre}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-slate-700 mb-2 bg-emerald-50 px-2 py-1 rounded">Región Sierra</h3>
            <div className="flex flex-wrap gap-2">
              {cantones.filter(c => c.region === 'Sierra').map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCantonId(c.id)}
                  className={`px-3 py-1.5 rounded text-sm transition-colors border ${
                    selectedCantonId === c.id 
                      ? 'bg-emerald-600 text-white border-emerald-600 font-bold' 
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-emerald-50'
                  }`}
                >
                  {c.nombre}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* SECCIÓN 2: INFORMACIÓN Y CONTROLES */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          
          {/* Tarjeta del Cantón */}
          <div className="bg-slate-50 p-5 rounded-lg border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-800">{canton.nombre}</h3>
                <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-bold ${
                  canton.region === 'Costa' ? 'bg-blue-200 text-blue-800' : 'bg-emerald-200 text-emerald-800'
                }`}>
                  Región {canton.region}
                </span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-slate-700">{canton.altitud_promedio}m</div>
                <div className="text-xs text-slate-500">altitud prom.</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex items-start gap-2 bg-white p-2 rounded border border-slate-100">
                <Sun className="text-orange-500 shrink-0" size={16} />
                <p className="text-xs text-slate-600 leading-tight">{canton.clima}</p>
              </div>
              <div className="flex items-start gap-2 bg-white p-2 rounded border border-slate-100">
                <Mountain className="text-stone-500 shrink-0" size={16} />
                <p className="text-xs text-slate-600 leading-tight">{canton.terreno}</p>
              </div>
            </div>
            
            <div className="bg-blue-100/50 border-l-2 border-blue-400 p-2 mb-4">
              <p className="text-xs text-slate-700 flex gap-1"><Info size={14} className="text-blue-600 shrink-0"/> {canton.dato_curioso}</p>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-700 mb-1">Producción Principal:</p>
              <div className="flex flex-wrap gap-1">
                {canton.produccion_animal_principal.map((p, i) => (
                  <span key={i} className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">{p}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Controles del Simulador */}
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 border-b pb-2">2. Parámetros del Animal</h3>
            <div className="mb-4">
              <SpeciesSelect 
                label="Especie (Compatibles con la región)"
                value={selectedSpecies.id}
                onChange={handleSpeciesChange}
                species={compatibleSpecies}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1 flex justify-between">
                <span>Hematocrito (%)</span>
                <span className="text-blue-600 font-bold">{hct.toFixed(1)}</span>
              </label>
              <input 
                type="range" min="10" max="70" step="0.5"
                value={hct} onChange={(e) => setHct(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="text-[10px] text-gray-500 flex justify-between mt-1">
                <span>Min: {selectedSpecies.ranges.hct.min}</span>
                <span>Normal: {selectedSpecies.ranges.hct.typical}</span>
                <span>Max: {selectedSpecies.ranges.hct.max}</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1 flex justify-between">
                <span>Hemoglobina (g/dL)</span>
                <span className="text-red-600 font-bold">{hb.toFixed(1)}</span>
              </label>
              <input 
                type="range" min="5" max="25" step="0.1"
                value={hb} onChange={(e) => setHb(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div className="mb-2">
              <label className="block text-sm font-semibold mb-1 flex justify-between">
                <span>Altitud (msnm)</span>
                <span className="text-emerald-600 font-bold">{altitude.toFixed(0)}</span>
              </label>
              <input 
                type="range" min="0" max="5000" step="50"
                value={altitude} onChange={(e) => setAltitude(parseFloat(e.target.value))}
                className="w-full"
              />
              <p className="text-[10px] text-slate-500 mt-1 italic">
                * La altitud se ajustó automáticamente a {canton.nombre}, pero puedes modificarla para simular variaciones dentro del cantón.
              </p>
            </div>
          </div>
        </div>

        {/* SECCIÓN 3: RESULTADOS */}
        <div className="w-full lg:w-2/3 flex flex-col">
          <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200 flex-grow">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">3. Resultados de Simulación</h2>
            
            <div className="flex flex-col md:flex-row gap-4 mb-8 bg-slate-50 p-4 rounded-lg border border-slate-100">
              <img 
                src={selectedSpecies.image} 
                alt={selectedSpecies.name} 
                className="w-32 h-32 object-cover rounded-lg shadow-sm border border-slate-200"
              />
              <div>
                <h3 className="font-bold text-lg text-slate-800">{selectedSpecies.name}</h3>
                <p className="text-sm italic text-slate-500 mb-2">{selectedSpecies.scientificName}</p>
                <p className="text-sm text-slate-700 mb-1"><strong>Hábitat:</strong> {selectedSpecies.location}</p>
                <p className="text-sm text-slate-700 bg-blue-100 px-2 py-1 inline-block rounded border border-blue-200">
                  💡 {selectedSpecies.fact}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-red-50 p-4 rounded-lg text-center border border-red-100 shadow-sm">
                <Beaker className="mx-auto text-red-500 mb-2" size={32} />
                <h3 className="text-sm text-red-700 font-semibold">Capacidad de O2</h3>
                <p className="text-3xl font-bold text-red-900">{o2Capacity.toFixed(2)}</p>
                <p className="text-xs text-red-600 font-medium mt-1">mL O2 / dL sangre</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-100 shadow-sm">
                <Droplets className="mx-auto text-blue-500 mb-2" size={32} />
                <h3 className="text-sm text-blue-700 font-semibold">Saturación de O2</h3>
                <p className="text-3xl font-bold text-blue-900">{o2Sat.toFixed(1)}%</p>
                <p className="text-xs text-blue-600 font-medium mt-1">en sangre arterial</p>
              </div>

              <div className="bg-emerald-50 p-4 rounded-lg text-center border border-emerald-100 shadow-sm">
                <ArrowUpCircle className="mx-auto text-emerald-500 mb-2" size={32} />
                <h3 className="text-sm text-emerald-700 font-semibold">Índice Adaptación</h3>
                <p className="text-3xl font-bold text-emerald-900">{adaptIndex.toFixed(0)}%</p>
                <p className="text-xs text-emerald-600 font-medium mt-1">Eficiencia a la altura</p>
              </div>
            </div>

            <div className="flex justify-center bg-slate-50 p-6 rounded-lg border border-slate-100">
              <div className="flex flex-col items-center">
                <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><Beaker size={18}/> Simulación de Tubo Capilar</h3>
                <div className="w-16 h-64 border-2 border-slate-400 rounded-b-full bg-yellow-100/80 relative overflow-hidden flex flex-col justify-end shadow-inner">
                   <div 
                      className="w-full bg-red-600/90 transition-all duration-500 ease-in-out border-t-2 border-red-800/50" 
                      style={{ height: `${hct}%` }}
                   >
                     <div className="text-center text-xs text-white font-bold mt-2 drop-shadow-md">
                       {hct.toFixed(1)}%
                     </div>
                   </div>
                </div>
                <div className="flex justify-between w-48 mt-4 text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1"><div className="w-3 h-3 bg-yellow-100 border border-slate-300 rounded-full"></div> Plasma</span>
                  <span className="flex items-center gap-1"><div className="w-3 h-3 bg-red-600 rounded-full"></div> Glob. Rojos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulatorTab;
