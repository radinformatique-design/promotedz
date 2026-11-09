import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { 
  Layers, 
  Ruler, 
  ClipboardCheck, 
  TrendingUp, 
  Plus, 
  Search, 
  Calendar,
  Building,
  CheckCircle2,
  AlertCircle,
  FileText,
  BarChart3,
  Filter
} from 'lucide-react';
import { 
  LotTravaux, 
  PosteTravaux, 
  StructureChantier, 
  MetreVérification, 
  RapportChantier 
} from '../types/database.ts';

type TechTab = 'dashboard' | 'lots' | 'metres' | 'rapports';

export const TechniqueView: React.FC = () => {
  const { 
    selectedChantierId, 
    currentChantier,
    lotsTravaux, 
    structuresChantier, 
    postesTravaux, 
    metres, 
    rapportsChantier,
    currentUser,
    ajouterMetre,
    validerMetre,
    soumettreRapportChantier
  } = useApp();

  const [activeTab, setActiveTab] = useState<TechTab>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrage par chantier
  const chantierLots = useMemo(() => 
    lotsTravaux.filter(l => l.chantier_id === selectedChantierId || selectedChantierId === 'ALL'),
  [lotsTravaux, selectedChantierId]);

  const chantierStructures = useMemo(() => 
    structuresChantier.filter(s => s.chantier_id === selectedChantierId || selectedChantierId === 'ALL'),
  [structuresChantier, selectedChantierId]);

  const chantierMetres = useMemo(() => 
    metres.filter(m => {
      const poste = postesTravaux.find(p => p.id === m.poste_id);
      const lot = lotsTravaux.find(l => l.id === poste?.lot_id);
      return lot?.chantier_id === selectedChantierId || selectedChantierId === 'ALL';
    }),
  [metres, postesTravaux, lotsTravaux, selectedChantierId]);

  const chantierRapports = useMemo(() => 
    rapportsChantier.filter(r => r.chantier_id === selectedChantierId || selectedChantierId === 'ALL'),
  [rapportsChantier, selectedChantierId]);

  // Statistiques pour le Dashboard
  const stats = useMemo(() => {
    const totalLots = chantierLots.length;
    const totalMetres = chantierMetres.length;
    const pendingMetres = chantierMetres.filter(m => m.statut === 'TRANSMIS' || m.statut === 'BROUILLON').length;
    const avgProgress = currentChantier?.taux_avancement_physique || 0;

    return { totalLots, totalMetres, pendingMetres, avgProgress };
  }, [chantierLots, chantierMetres, currentChantier]);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-xl border border-indigo-500/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-1">
              <Layers className="w-4 h-4" />
              <span>Service Technique Central</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Suivi Technique & Avancement
            </h1>
            <p className="text-indigo-200/70 text-sm mt-1 max-w-2xl font-medium">
              Gestion des métrés, vérification des quantités exécutées et rapports journaliers de chantier.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-[10px] text-indigo-300 font-bold uppercase">Avancement Réel</div>
                <div className="text-xl font-black text-white">{stats.avgProgress}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 mt-8 bg-black/20 p-1 rounded-xl w-fit border border-white/5">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'dashboard' ? 'bg-indigo-600 text-white shadow-lg' : 'text-indigo-300 hover:bg-white/5'
            }`}
          >
            <BarChart3 className="w-4 h-4" /> Vue d'ensemble
          </button>
          <button
            onClick={() => setActiveTab('lots')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'lots' ? 'bg-indigo-600 text-white shadow-lg' : 'text-indigo-300 hover:bg-white/5'
            }`}
          >
            <Building className="w-4 h-4" /> Lots & Ouvrages
          </button>
          <button
            onClick={() => setActiveTab('metres')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'metres' ? 'bg-indigo-600 text-white shadow-lg' : 'text-indigo-300 hover:bg-white/5'
            }`}
          >
            <Ruler className="w-4 h-4" /> Métrés & Vérif.
          </button>
          <button
            onClick={() => setActiveTab('rapports')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'rapports' ? 'bg-indigo-600 text-white shadow-lg' : 'text-indigo-300 hover:bg-white/5'
            }`}
          >
            <ClipboardCheck className="w-4 h-4" /> Rapports
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="min-h-[400px]">
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="Lots Actifs" value={stats.totalLots} icon={Layers} color="purple" />
              <StatCard title="Métrés Saisis" value={stats.totalMetres} icon={Ruler} color="blue" />
              <StatCard title="En attente validation" value={stats.pendingMetres} icon={AlertCircle} color="amber" />
              <StatCard title="Rapports validés" value={chantierRapports.filter(r => r.statut === 'VALIDE').length} icon={CheckCircle2} color="emerald" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-bold text-slate-800 text-sm">Avancement par Lot de Travaux</h3>
                  <div className="flex gap-2">
                    <button className="text-[10px] font-bold text-slate-500 hover:text-indigo-600 border border-slate-200 px-2 py-1 rounded">Export PDF</button>
                    <button className="text-[10px] font-bold text-slate-500 hover:text-indigo-600 border border-slate-200 px-2 py-1 rounded">Export Excel</button>
                    <button className="text-xs text-indigo-600 font-bold hover:underline">Détails</button>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  {chantierLots.map(lot => (
                    <div key={lot.id} className="space-y-1">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-slate-700">{lot.libelle}</span>
                        <span className="text-indigo-600">65%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-4">
                <h3 className="font-bold text-slate-800 text-sm">Alertes & Retards</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-rose-50 border border-rose-100 text-rose-800">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold">Retard Approvisionnement Acier</p>
                      <p className="text-[10px] opacity-80 mt-0.5">Le lot Gros Œuvre accuse un retard de 4 jours sur le ferraillage R+4.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50 border border-amber-100 text-amber-800">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold">Métré en attente de vérification</p>
                      <p className="text-[10px] opacity-80 mt-0.5">3 nouveaux métrés transmis par le métreur Oran attendent validation technique.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'lots' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-4">
                <h2 className="text-sm font-bold text-slate-900">Nomenclature des Lots & Postes</h2>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Rechercher un poste..."
                    className="pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
                  />
                </div>
              </div>
              <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-[10px] font-bold flex items-center gap-1.5 shadow-sm hover:bg-indigo-700">
                <Plus className="w-3.5 h-3.5" /> Nouveau Lot
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Code</th>
                    <th className="py-3 px-4">Désignation</th>
                    <th className="py-3 px-4">Unité</th>
                    <th className="py-3 px-4">Qté Prévue</th>
                    <th className="py-3 px-4">Qté Exécutée</th>
                    <th className="py-3 px-4">Progression</th>
                    <th className="py-3 px-4 text-right">Budget Prévu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {chantierLots.map(lot => (
                    <React.Fragment key={lot.id}>
                      <tr className="bg-slate-50/80 font-bold">
                        <td className="py-2 px-4 text-indigo-700">{lot.code_lot}</td>
                        <td colSpan={5} className="py-2 px-4 uppercase tracking-wider text-slate-800">{lot.libelle}</td>
                        <td className="py-2 px-4 text-right font-mono">{lot.budget_prevu.toLocaleString()} DZD</td>
                      </tr>
                      {postesTravaux.filter(p => p.lot_id === lot.id).map(poste => (
                        <tr key={poste.id} className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-mono text-slate-500 pl-8">{poste.code_article}</td>
                          <td className="py-3 px-4 font-medium">{poste.designation}</td>
                          <td className="py-3 px-4">{poste.unite_symbole}</td>
                          <td className="py-3 px-4 font-mono">{poste.quantite_prevue}</td>
                          <td className="py-3 px-4 font-mono">120</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500" style={{ width: '10%' }}></div>
                              </div>
                              <span className="text-[10px] font-bold text-slate-600">10%</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right font-mono text-slate-600">
                            {(poste.quantite_prevue * poste.prix_unitaire_ref).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'metres' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 cursor-pointer hover:bg-slate-50">
                  <Filter className="w-3.5 h-3.5" /> Filtrer
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 cursor-pointer hover:bg-slate-50">
                  <Calendar className="w-3.5 h-3.5" /> Cette semaine
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm hover:bg-indigo-700">
                  <Plus className="w-4 h-4" /> Saisir Nouveau Métré
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {chantierMetres.map(metre => {
                const poste = postesTravaux.find(p => p.id === metre.poste_id);
                const structure = structuresChantier.find(s => s.id === metre.structure_id);
                return (
                  <div key={metre.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:border-indigo-200 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                          <Ruler className="w-6 h-6 text-slate-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900 text-sm">{poste?.designation}</h4>
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">{structure?.libelle}</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">Saisi par <span className="font-semibold text-slate-700">{metre.saisi_par_nom}</span> le {metre.date_mesure}</p>
                          <div className="mt-2 flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] uppercase font-bold text-slate-400">Quantité</span>
                              <span className="text-xs font-black text-indigo-600">{metre.quantite_executee} {poste?.unite_symbole}</span>
                            </div>
                            <div className="w-px h-3 bg-slate-200"></div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] uppercase font-bold text-slate-400">Statut</span>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                                metre.statut === 'VALIDE' ? 'bg-emerald-100 text-emerald-800' :
                                metre.statut === 'REJETE' ? 'bg-rose-100 text-rose-800' :
                                'bg-amber-100 text-amber-800'
                              }`}>
                                {metre.statut}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {metre.statut === 'TRANSMIS' && (
                          <>
                            <button 
                              onClick={() => validerMetre(metre.id, 'REJETE')}
                              className="px-3 py-1.5 rounded-lg border border-rose-200 text-rose-600 text-[11px] font-bold hover:bg-rose-50"
                            >
                              Rejeter
                            </button>
                            <button 
                              onClick={() => validerMetre(metre.id, 'VALIDE')}
                              className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-[11px] font-bold hover:bg-emerald-700 shadow-sm"
                            >
                              Valider & Confirmer
                            </button>
                          </>
                        )}
                        <button className="p-2 text-slate-400 hover:text-slate-600">
                          <FileText className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'rapports' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-[10px] font-bold flex items-center gap-1.5 hover:bg-slate-200 border border-slate-200">
              <FileText className="w-3.5 h-3.5" /> Export PDF
            </button>
            <button className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-[10px] font-bold flex items-center gap-1.5 hover:bg-slate-200 border border-slate-200">
              <BarChart3 className="w-3.5 h-3.5" /> Export Excel
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm hover:bg-indigo-700">
              <Plus className="w-4 h-4" /> Nouveau Rapport Journalier
            </button>
          </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chantierRapports.map(rapport => (
                <div key={rapport.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group hover:border-indigo-300 transition-all">
                  <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-slate-900">{rapport.date_rapport}</div>
                        <div className="text-[9px] uppercase font-bold text-slate-400">{rapport.type}</div>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      rapport.statut === 'VALIDE' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {rapport.statut}
                    </span>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Météo :</span>
                      <span className="font-semibold text-slate-700">{rapport.meteo}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Effectif :</span>
                      <span className="font-semibold text-slate-700">{rapport.effectif_total} ouvriers</span>
                    </div>
                    <div className="pt-2">
                      <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Activités</div>
                      <p className="text-[11px] text-slate-600 line-clamp-3 leading-relaxed">
                        {rapport.activites_realisees}
                      </p>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-[10px] text-slate-400">Rédigé par <span className="font-bold">{rapport.redacteur_nom}</span></div>
                    <button className="text-indigo-600 hover:text-indigo-800 text-[11px] font-bold flex items-center gap-1">
                      Consulter <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: string | number; icon: any; color: 'purple' | 'blue' | 'amber' | 'emerald' }> = ({ title, value, icon: Icon, color }) => {
  const colors = {
    purple: 'bg-purple-50 text-purple-600 border-purple-100',
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100'
  };

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${colors[color]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{title}</div>
        <div className="text-xl font-black text-slate-900 leading-none mt-1">{value}</div>
      </div>
    </div>
  );
};

const ArrowRight: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);
