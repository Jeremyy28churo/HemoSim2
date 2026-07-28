import React, { useState, useRef, useEffect } from 'react';
import { Species } from '../data/species';
import { ChevronDown } from 'lucide-react';

interface SpeciesSelectProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  species: Species[];
}

const SpeciesSelect: React.FC<SpeciesSelectProps> = ({ value, onChange, label, species }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  
  const selectedSpecies = species.find(s => s.id === value) || species[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={selectRef}>
      {label && <label className="block text-sm font-semibold mb-2">{label}</label>}
      <div 
        className="w-full p-2 border rounded bg-white flex items-center justify-between cursor-pointer hover:border-blue-400 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
           <img src={selectedSpecies.image} alt={selectedSpecies.name} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
           <span className="font-medium text-slate-800">{selectedSpecies.name}</span>
        </div>
        <ChevronDown size={18} className={`text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border rounded shadow-xl z-20 max-h-60 overflow-y-auto">
          {species.map(s => (
            <div 
              key={s.id} 
              className={`p-2 flex items-center gap-3 cursor-pointer transition-colors ${s.id === value ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-slate-50 border-l-4 border-transparent'}`}
              onClick={() => {
                onChange(s.id);
                setIsOpen(false);
              }}
            >
              <img src={s.image} alt={s.name} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
              <span className={`font-medium ${s.id === value ? 'text-blue-700' : 'text-slate-700'}`}>{s.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpeciesSelect;
