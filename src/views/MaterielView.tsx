import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { Plus, Search, AlertTriangle } from 'lucide-react';
import { FicheTechniqueMateriel } from '../components/FicheTechniqueMateriel.tsx';
import { Vehicule } from '../types/database.ts';

export const MaterielView: React.FC = () => {
  const { vehicules, entretiens, piecesRemplacables, currentUser } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVehiculeId, setSelectedVehiculeId] = useState<string | null>(null);

  const filteredVehicules = useMemo(() => {
    const accessibleVehicules = currentUser?.type === 'CHANTIER'
      ? vehicules.filter(v => currentUser.chantiers_assignes.includes(v.chantier_id || ''))
      : vehicules;

    return accessibleVehicules.filter(v => {
      if (!v) return false;
      const search = searchTerm.toLowerCase();
      return (
        (v.num_interne?.toLowerCase() || '').includes(search) ||
        (v.marque?.toLowerCase() || '').includes(search) ||
        (v.modele?.toLowerCase() || '').includes(search) ||
        (v.immatriculation?.toLowerCase() || '').includes(search)
      );
    });
  }, [vehicules, searchTerm, currentUser]);

  const selectedVehicule = useMemo(() => 
    vehicules.find(v => v.id === selectedVehiculeId), 
  [vehicules, selectedVehiculeId]);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-slate-900 to-indigo-900 text-white rounded-2xl p-6 shadow-xl border border-indigo-800/40">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">Gestion du Parc Matériel & Automobile</h1>
        <p className="text-slate-300 text-sm mt-2">Gestion centralisée des véhicules, engins, entretiens, assurances et suivi des composants.</p>
        
        <div className="mt-6 flex gap-3">
          <button
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Ajouter Véhicule/Engin
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
          <div className="flex items-center gap-2 text-amber-800 font-bold mb-1">
            <AlertTriangle className="w-5 h-5" /> Alertes Maintenance
          </div>
          <p className="text-sm text-amber-900">Entretien requis pour {entretiens.filter(e => new Date(e.date) < new Date()).length} véhicules.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <h2 className="text-sm font-bold text-slate-900">Inventaire du parc ({filteredVehicules.length})</h2>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 w-56"
            />
          </div>
        </div>
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Code</th>
              <th className="py-3 px-4">Immat.</th>
              <th className="py-3 px-4">Marque/Modèle</th>
              <th className="py-3 px-4">État</th>
              <th className="py-3 px-4">Kilométrage/Heures</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredVehicules.map(v => (
              <tr key={v.id} className="hover:bg-slate-50">
                <td className="py-3 px-4 font-mono font-bold text-slate-900">{v.num_interne}</td>
                <td className="py-3 px-4 font-mono">{v.immatriculation}</td>
                <td className="py-3 px-4 font-semibold">{v.marque} {v.modele}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    v.statut === 'ACTIF' ? 'bg-emerald-100 text-emerald-800' :
                    v.statut === 'EN_PANNE' ? 'bg-rose-100 text-rose-800' :
                    'bg-slate-100 text-slate-800'
                  }`}>
                    {v.statut}
                  </span>
                </td>
                <td className="py-3 px-4 font-mono text-slate-700">
                  {v.heures_fonctionnement > 0 ? `${v.heures_fonctionnement}h` : `${v.kilometrage} km`}
                </td>
                <td className="py-3 px-4 text-right">
                  <button 
                    onClick={() => setSelectedVehiculeId(v.id)}
                    className="text-indigo-600 hover:text-indigo-800 font-semibold text-xs"
                  >
                    Détails
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedVehicule && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button onClick={() => setSelectedVehiculeId(null)} className="absolute top-4 right-4 text-slate-500 hover:text-slate-900">Fermer</button>
            <FicheTechniqueMateriel 
              vehicule={selectedVehicule}
              entretiens={entretiens.filter(e => e.vehicule_id === selectedVehicule.id)}
              pieces={piecesRemplacables.filter(p => p.vehicule_id === selectedVehicule.id)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
