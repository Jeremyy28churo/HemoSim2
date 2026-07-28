import { useState } from 'react';
import { speciesList } from '../data/species';
import { calculateO2Capacity, calculateO2Saturation } from '../utils/calculations';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Info } from 'lucide-react';
import SpeciesSelect from './SpeciesSelect';

const ComparisonTab = () => {
  const [species1Id, setSpecies1Id] = useState(speciesList[0].id);
  const [species2Id, setSpecies2Id] = useState(speciesList[1].id);
  const [altitude, setAltitude] = useState(0);

  const sp1 = speciesList.find(s => s.id === species1Id) || speciesList[0];
  const sp2 = speciesList.find(s => s.id === species2Id) || speciesList[1];

  const sp1Capacity = calculateO2Capacity(sp1.ranges.hb.typical);
  const sp2Capacity = calculateO2Capacity(sp2.ranges.hb.typical);

  const o1Sat = calculateO2Saturation(altitude, sp1.location === 'Sierra' || sp1.location === 'Ambas');
  const o2Sat = calculateO2Saturation(altitude, sp2.location === 'Sierra' || sp2.location === 'Ambas');

  const sp1Content = sp1Capacity * (o1Sat / 100);
  const sp2Content = sp2Capacity * (o2Sat / 100);

  const data = [
    {
      name: 'Capacidad O2 (mL/dL)',
      [sp1.name]: parseFloat(sp1Capacity.toFixed(2)),
      [sp2.name]: parseFloat(sp2Capacity.toFixed(2)),
    },
    {
      name: `Contenido O2 a ${altitude}m`,
      [sp1.name]: parseFloat(sp1Content.toFixed(2)),
      [sp2.name]: parseFloat(sp2Content.toFixed(2)),
    }
  ];

  const getAltitudeConcept = (alt: number) => {
    if (alt < 1000) {
      return {
        title: "Nivel del Mar / Costa",
        desc: "Presión barométrica normal. La saturación de oxígeno en sangre es óptima (cercana al 100%). Los animales de costa (no adaptados) funcionan a su máxima capacidad sin estrés hipóxico.",
        color: "bg-blue-50 border-blue-200 text-blue-800",
        iconColor: "text-blue-500"
      };
    } else if (alt < 2500) {
      return {
        title: "Altitud Media / Valles Interandinos",
        desc: "La presión de oxígeno comienza a disminuir (hipoxia leve). Los animales no adaptados inician ligeras compensaciones, como un aumento en la frecuencia respiratoria (hiperventilación).",
        color: "bg-yellow-50 border-yellow-200 text-yellow-800",
        iconColor: "text-yellow-600"
      };
    } else if (alt < 4000) {
      return {
        title: "Alta Montaña / Sierra",
        desc: "Hipoxia marcada. Especies de bajura sufren una caída importante en la saturación de oxígeno, lo que reduce su contenido de O2 en sangre. Especies adaptadas (como la Vaca de Altura) compensan gracias a su mayor hematocrito.",
        color: "bg-orange-50 border-orange-200 text-orange-900",
        iconColor: "text-orange-500"
      };
    } else {
      return {
        title: "Altitud Extrema / Páramo",
        desc: "Hipoxia severa. Gran riesgo de hipertensión pulmonar (Enfermedad de las Alturas o Mal de Brisket) en animales no adaptados, debido a la constricción de los vasos pulmonares. Solo especies especializadas prosperan.",
        color: "bg-red-50 border-red-200 text-red-900",
        iconColor: "text-red-500"
      };
    }
  };

  const concept = getAltitudeConcept(altitude);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2">Comparación de Especies</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-50 p-4 rounded-lg border">
          <SpeciesSelect 
            label="Especie 1"
            value={species1Id}
            onChange={setSpecies1Id}
            species={speciesList}
          />
        </div>

        <div className="bg-slate-50 p-4 rounded-lg border">
          <SpeciesSelect 
            label="Especie 2"
            value={species2Id}
            onChange={setSpecies2Id}
            species={speciesList}
          />
        </div>

        <div className="bg-slate-50 p-4 rounded-lg border">
          <label className="block text-sm font-semibold mb-2 flex justify-between">
            <span>Altitud (msnm)</span>
            <span className="text-emerald-600 font-bold">{altitude}</span>
          </label>
          <input 
            type="range" min="0" max="5000" step="100"
            value={altitude} onChange={(e) => setAltitude(parseFloat(e.target.value))}
            className="w-full mt-2"
          />
        </div>
      </div>

      <div className={`mb-8 p-4 rounded-lg border ${concept.color} flex items-start gap-3 transition-colors duration-300 shadow-sm`}>
        <Info className={`${concept.iconColor} shrink-0 mt-0.5`} />
        <div>
          <h4 className="font-bold text-sm mb-1">{concept.title}</h4>
          <p className="text-sm">{concept.desc}</p>
        </div>
      </div>

      <div className="h-80 w-full mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={sp1.name} fill="#ef4444" radius={[4, 4, 0, 0]} />
            <Bar dataKey={sp2.name} fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100">
              <th className="p-3 border">Parámetro</th>
              <th className="p-3 border text-red-600">{sp1.name}</th>
              <th className="p-3 border text-blue-600">{sp2.name}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border font-semibold">Hematocrito típico</td>
              <td className="p-3 border">{sp1.ranges.hct.typical}%</td>
              <td className="p-3 border">{sp2.ranges.hct.typical}%</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="p-3 border font-semibold">Hemoglobina típica</td>
              <td className="p-3 border">{sp1.ranges.hb.typical} g/dL</td>
              <td className="p-3 border">{sp2.ranges.hb.typical} g/dL</td>
            </tr>
            <tr>
              <td className="p-3 border font-semibold">Capacidad O2</td>
              <td className="p-3 border font-bold">{sp1Capacity.toFixed(2)} mL/dL</td>
              <td className="p-3 border font-bold">{sp2Capacity.toFixed(2)} mL/dL</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="p-3 border font-semibold">Saturación a {altitude}m</td>
              <td className="p-3 border">{o1Sat.toFixed(1)}%</td>
              <td className="p-3 border">{o2Sat.toFixed(1)}%</td>
            </tr>
            <tr>
              <td className="p-3 border font-semibold">Contenido O2 a {altitude}m</td>
              <td className="p-3 border text-red-700 font-bold">{sp1Content.toFixed(2)} mL/dL</td>
              <td className="p-3 border text-blue-700 font-bold">{sp2Content.toFixed(2)} mL/dL</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTab;
