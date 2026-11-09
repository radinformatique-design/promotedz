import React from 'react';
import { Vehicule, Entretien as Maintenance, PieceRemplacable } from '../types/database.ts';
import { Truck, Wrench, Clock, User, Settings } from 'lucide-react';

interface FicheTechniqueMaterielProps {
  vehicule: Vehicule;
  entretiens: Maintenance[];
  pieces: PieceRemplacable[];
}

export const FicheTechniqueMateriel: React.FC<FicheTechniqueMaterielProps> = ({ vehicule, entretiens, pieces }) => {
  return (
    <div className="space-y-6">
      {/* En-tête avec résumé */}
      <div className="bg-slate-900 text-white p-6 rounded-xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{vehicule.marque} {vehicule.modele}</h2>
          <p className="text-slate-400">Code: {vehicule.num_interne} | Immat: {vehicule.immatriculation}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold">{vehicule.statut}</p>
          <p className="text-sm text-slate-400">État actuel</p>
        </div>
      </div>

      {/* Grid pour les données */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Historique des affectations */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold flex items-center gap-2 mb-4 text-slate-800">
            <Truck className="w-5 h-5 text-indigo-600" /> Historique Affectations & Conducteurs
          </h3>
          <div className="space-y-3">
            {vehicule.historique_affectations?.length ? (
              vehicule.historique_affectations.map((aff, i) => (
                <div key={i} className="text-sm border-b border-slate-100 pb-3 last:border-0">
                  <div className="flex justify-between items-start">
                    <p className="font-bold text-slate-900">{aff.chantier_nom}</p>
                    <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-mono">
                      {aff.date_debut} → {aff.date_fin || 'Aujourd’hui'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 flex items-center gap-1 mt-1">
                    <User className="w-3 h-3" /> Conducteur : <span className="font-medium text-slate-800">{aff.conducteur_nom}</span>
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic">Aucun historique d'affectation disponible.</p>
            )}
          </div>
        </div>

        {/* Maintenance */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold flex items-center gap-2 mb-4 text-slate-800">
            <Wrench className="w-5 h-5 text-indigo-600" /> Journal des Maintenances
          </h3>
          <div className="space-y-3">
            {entretiens.length ? (
              entretiens.map(e => (
                <div key={e.id} className="text-sm border-b border-slate-100 pb-3 last:border-0">
                  <div className="flex justify-between items-start">
                    <p className="font-bold text-slate-900">{e.type}</p>
                    <span className="font-mono text-indigo-600 font-bold">{e.cout.toLocaleString()} DZD</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{e.description}</p>
                  <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {e.date}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic">Aucune opération de maintenance enregistrée.</p>
            )}
          </div>
        </div>

        {/* État des composants */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm md:col-span-2">
          <h3 className="font-bold flex items-center gap-2 mb-4 text-slate-800">
            <Settings className="w-5 h-5 text-indigo-600" /> État des Composants (Pneus & Batteries)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pieces.length ? (
              pieces.map(p => (
                <div key={p.id} className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-bold text-slate-900 text-xs uppercase tracking-wider">{p.type}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      p.etat === 'ACTIF' || p.etat === 'NEUF' ? 'bg-emerald-100 text-emerald-800' :
                      p.etat === 'A_REMPLACER' ? 'bg-rose-100 text-rose-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {p.etat}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-800">{p.designation}</p>
                  <p className="text-xs text-slate-500 mt-1">S/N: {p.numero_serie}</p>
                  <div className="mt-3 pt-3 border-t border-slate-200">
                    <p className="text-[10px] text-slate-500 uppercase font-semibold">Dernière Installation</p>
                    <p className="text-xs font-medium text-slate-700">{p.date_installation} à {p.kilometrage_installation.toLocaleString()} km</p>
                    {p.position && <p className="text-xs text-slate-600 mt-1 italic">Position: {p.position}</p>}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic col-span-3">Aucun composant suivi pour ce véhicule.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
