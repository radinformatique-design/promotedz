import React, { useState, useMemo, useEffect } from 'react';
import {
  HardHat,
  Plus,
  MapPin,
  Calendar,
  Building,
  CheckCircle2,
  FolderOpen,
  X,
  Layers,
  Sparkles,
  Clock,
  Clock3,
  ShieldAlert,
  Users,
  Check,
  AlertTriangle,
  Send,
  Lock,
  Unlock,
  History,
  Briefcase
} from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import {
  Chantier,
  ChantierStatut,
  PointageStatut,
  PointageLigne,
  Employe,
  CategorieProfessionnelle
} from '../types/database.ts';

const CATEGORIE_LABELS: Record<CategorieProfessionnelle, string> = {
  CHEF_EQUIPE: 'Chef d’équipe gros-œuvre',
  MACON: 'Maçon qualifié',
  FERRAILLEUR: 'Ferrailleur',
  COFFREUR: 'Coffreur bancheur',
  CONDUCTEUR_ENGIN: 'Conducteur d’engins (Grue/Pelle)',
  MANOEUVRE: 'Manœuvre ordinaire',
  ELECTRICIEN: 'Électricien bâtiment',
  PLOMBIER: 'Plombier sanitaire',
  TOPOGRAPHE: 'Topographe BTP',
  SOUDEUR: 'Soudeur qualifié',
  PEINTRE: 'Peintre en bâtiment',
  ETANCHEUR: 'Étancheur'
};

export const ChantiersView: React.FC = () => {
  const {
    chantiers,
    addChantier,
    setSelectedChantierId,
    selectedChantierId,
    documents,
    utilisateurs,
    currentUser,
    employes,
    pointages,
    enregistrerPointage,
    soumettreDemandeDerogationPointage,
    parametresGeneraux,
    simulatedPointageTime,
    setSimulatedPointageTime
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'projets' | 'pointage' | 'equipe'>('projets');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedChantierDetail, setSelectedChantierDetail] = useState<Chantier | null>(null);

  // Chantier sélectionné pour le pointage
  const defaultSiteId = useMemo(() => {
    if (selectedChantierId !== 'ALL') return selectedChantierId;
    if (chantiers.length > 0) return chantiers[0].id;
    return 'cht-001';
  }, [selectedChantierId, chantiers]);

  const [activePointageChantierId, setActivePointageChantierId] = useState<string>(defaultSiteId);
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);
  const [selectedPointageDate, setSelectedPointageDate] = useState<string>(todayStr);

  // État local des saisies de pointage pour la journée
  const [localPointages, setLocalPointages] = useState<Record<string, { statut: PointageStatut; heure_arrivee?: string; observations?: string }>>({});
  const [toastMessage, setToastMessage] = useState<{ text: string; isError?: boolean } | null>(null);

  const showToast = (text: string, isError = false) => {
    setToastMessage({ text, isError });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Synchroniser quand on change de chantier ou de date
  useEffect(() => {
    const existing = pointages.filter(p => p.chantier_id === activePointageChantierId && p.date === selectedPointageDate);
    const map: Record<string, { statut: PointageStatut; heure_arrivee?: string; observations?: string }> = {};
    existing.forEach(p => {
      map[p.employe_id] = {
        statut: p.statut,
        heure_arrivee: p.heure_arrivee,
        observations: p.observations
      };
    });
    setLocalPointages(map);
  }, [activePointageChantierId, selectedPointageDate, pointages]);

  // Ouvriers affectés au chantier sélectionné
  const assignedWorkers = useMemo(() => {
    return employes.filter(e => e.chantier_actuel_id === activePointageChantierId);
  }, [employes, activePointageChantierId]);

  // Vérifier si le pointage est verrouillé
  const heureLimite = parametresGeneraux.heure_limite_pointage || '08:15';
  const isPointageLocked = simulatedPointageTime > heureLimite;

  // Modal Dérogation Post-Clôture
  const [isDerogationModalOpen, setIsDerogationModalOpen] = useState(false);
  const [derogationTargetWorker, setDerogationTargetWorker] = useState<Employe | null>(null);
  const [derogationStatutDemande, setDerogationStatutDemande] = useState<PointageStatut>('PRESENT');
  const [derogationHeureArrivee, setDerogationHeureArrivee] = useState('08:30');
  const [derogationMotif, setDerogationMotif] = useState('');

  // Form State Création Chantier
  const [formData, setFormData] = useState({
    nom_projet: '',
    code_chantier: '',
    wilaya: 'Alger (16)',
    commune: 'Bouchaoui',
    adresse_site: '',
    superficie_terrain_m2: 3200,
    surface_plancher_m2: 11500,
    nombre_logements: 80,
    nombre_locaux_commerciaux: 6,
    nombre_niveaux: '2SS + RDC + 9',
    permis_construire_ref: '',
    date_ouverture_chantier: new Date().toISOString().split('T')[0],
    date_livraison_prevue: '2027-12-31',
    budget_global_prevu: 1500000000,
    statut: 'ETUDE_FONCIERE' as ChantierStatut,
    bureau_etudes: 'Cabinet d’Architecture & Génie Civil',
    organisme_ctc: 'CTC Centre'
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nom_projet) return;

    addChantier({
      ...formData,
      code_chantier: formData.code_chantier || `CHT-ALG-${Date.now().toString().slice(-4)}`
    });

    setIsCreateModalOpen(false);
    showToast(`Chantier "${formData.nom_projet}" créé avec succès.`);
  };

  const formatDZD = (amount: number) => {
    return new Intl.NumberFormat('fr-DZ', {
      style: 'currency',
      currency: 'DZD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Action rapide : tout pointer présent
  const handleMarkAllPresent = () => {
    const updated: Record<string, { statut: PointageStatut; heure_arrivee?: string; observations?: string }> = {};
    assignedWorkers.forEach(w => {
      updated[w.id] = {
        statut: 'PRESENT',
        heure_arrivee: '08:00',
        observations: localPointages[w.id]?.observations || ''
      };
    });
    setLocalPointages(updated);
    showToast('Tous les ouvriers affectés ont été pré-remplis à "Présent (08:00)".');
  };

  // Enregistrer le pointage du jour
  const handleSavePointage = () => {
    const activeChantier = chantiers.find(c => c.id === activePointageChantierId);
    const lignes: PointageLigne[] = assignedWorkers.map(w => {
      const entry = localPointages[w.id] || { statut: 'PRESENT', heure_arrivee: '08:00' };
      const isRetard = entry.statut === 'RETARD';
      const isAbsent = entry.statut === 'ABSENT_INJUSTIFIE';

      return {
        id: `ptg-${w.id}-${selectedPointageDate}`,
        chantier_id: activePointageChantierId,
        employe_id: w.id,
        employe_nom: `${w.nom} ${w.prenom}`,
        employe_matricule: w.matricule,
        employe_categorie: w.categorie,
        date: selectedPointageDate,
        statut: entry.statut,
        heure_arrivee: entry.heure_arrivee || (entry.statut === 'PRESENT' ? '08:00' : undefined),
        heure_depart: '16:30',
        minutes_retard: isRetard ? 30 : 0,
        heures_travaillees: isAbsent ? 0 : isRetard ? 7.5 : 8,
        observations: entry.observations,
        saisi_par_id: currentUser?.id || 'user-ct',
        saisi_par_nom: currentUser ? `${currentUser.prenom} ${currentUser.nom}` : 'Conducteur de Travaux',
        verrouille: isPointageLocked,
        updated_at: new Date().toISOString()
      };
    });

    const res = enregistrerPointage(activePointageChantierId, selectedPointageDate, lignes);
    if (!res.success) {
      showToast(res.message, true);
    } else {
      showToast(res.message);
    }
  };

  // Soumission d'une demande de dérogation post-clôture
  const handleSubmitDerogation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!derogationTargetWorker || !derogationMotif) {
      showToast('Veuillez renseigner le motif circonstancié.', true);
      return;
    }

    const currentEntry = localPointages[derogationTargetWorker.id]?.statut || 'ABSENT_INJUSTIFIE';
    const activeChantier = chantiers.find(c => c.id === activePointageChantierId);

    soumettreDemandeDerogationPointage({
      chantier_id: activePointageChantierId,
      chantier_nom: activeChantier?.nom_projet || 'Chantier',
      date_pointage: selectedPointageDate,
      employe_id: derogationTargetWorker.id,
      employe_nom: `${derogationTargetWorker.nom} ${derogationTargetWorker.prenom}`,
      employe_matricule: derogationTargetWorker.matricule,
      demandeur_id: currentUser?.id || 'user-ct',
      demandeur_nom: currentUser ? `${currentUser.prenom} ${currentUser.nom}` : 'Conducteur de travaux',
      demandeur_role: currentUser?.poste || 'Conducteur de Travaux',
      statut_actuel: currentEntry,
      statut_demande: derogationStatutDemande,
      heure_arrivee_demandee: derogationHeureArrivee,
      motif_demande: derogationMotif
    });

    setIsDerogationModalOpen(false);
    setDerogationMotif('');
    showToast('Votre demande d\'autorisation a été transmise au Responsable RH. L\'administrateur a été notifié.');
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-sm font-medium border transition-all ${
            toastMessage.isError
              ? 'bg-rose-50 text-rose-800 border-rose-200'
              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
          }`}
        >
          {toastMessage.isError ? (
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Top Banner avec onglets intégrés */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-1">
              <HardHat className="w-4 h-4" />
              <span>Gestion Multi-Chantiers & Pilotage Terrain</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Entités Chantiers & Feuille de Pointage Quotidien
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Chaque chantier est modélisé comme une entité autonome rattachée à l'entreprise avec ses équipes, ses budgets DZD et ses pointages d'assiduité.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Ouvrir un nouveau chantier</span>
            </button>
          </div>
        </div>

        {/* Navigation Sub-Tabs */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveSubTab('projets')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
              activeSubTab === 'projets'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Building className="w-4 h-4" />
            Entités Chantiers ({chantiers.length})
          </button>
          <button
            onClick={() => setActiveSubTab('pointage')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
              activeSubTab === 'pointage'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Clock3 className="w-4 h-4" />
            Feuille de Pointage Quotidien (Conducteur)
          </button>
          <button
            onClick={() => setActiveSubTab('equipe')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
              activeSubTab === 'equipe'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            Équipe Affectée au Chantier ({assignedWorkers.length})
          </button>
        </div>
      </div>

      {/* SOUS-ONGLET 1 : PROJETS ET FICHES CHANTIERS */}
      {activeSubTab === 'projets' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {chantiers.map((chantier) => {
            const ratioBudget = Math.round((chantier.budget_engage / chantier.budget_global_prevu) * 100);
            const isCurrentActive = selectedChantierId === chantier.id;
            const siteWorkersCount = employes.filter(e => e.chantier_actuel_id === chantier.id).length;

            return (
              <div
                key={chantier.id}
                className={`bg-white rounded-xl border transition-all shadow-xs flex flex-col ${
                  isCurrentActive ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="p-5 flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="font-mono text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {chantier.code_chantier}
                      </span>
                      <h3 className="font-bold text-slate-900 text-base mt-1.5">
                        {chantier.nom_projet}
                      </h3>
                    </div>

                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {chantier.statut.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{chantier.commune}, {chantier.wilaya}</span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                    {chantier.description || 'Projet résidentiel en cours de réalisation.'}
                  </p>

                  {/* Technical stats mini grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100 mb-4">
                    <div>
                      <span className="text-slate-400 text-[10px] block">Unités logements</span>
                      <span className="font-bold text-slate-800 font-mono">{chantier.nombre_logements}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Effectif affecté</span>
                      <span className="font-bold text-purple-700 font-mono">{siteWorkersCount} ouvriers</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Surface Plancher</span>
                      <span className="font-mono text-slate-800 text-[11px]">{chantier.surface_plancher_m2.toLocaleString()} m²</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Organisme CTC</span>
                      <span className="text-slate-800 text-[11px] truncate block">{chantier.organisme_ctc || 'CTC Régional'}</span>
                    </div>
                  </div>

                  {/* Progress bars */}
                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between text-slate-600 mb-1 text-[11px]">
                        <span>Avancement physique</span>
                        <span className="font-mono font-bold text-slate-900">{chantier.taux_avancement_physique}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${chantier.taux_avancement_physique}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-600 mb-1 text-[11px]">
                        <span>Budget consommé ({ratioBudget}%)</span>
                        <span className="font-mono text-slate-900">{formatDZD(chantier.budget_engage)}</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${ratioBudget > 85 ? 'bg-amber-500' : 'bg-blue-600'}`}
                          style={{ width: `${Math.min(ratioBudget, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 rounded-b-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedChantierDetail(chantier)}
                      className="font-medium text-slate-700 hover:text-slate-900"
                    >
                      Fiche technique
                    </button>
                    <span className="text-slate-300">•</span>
                    <button
                      onClick={() => {
                        setActivePointageChantierId(chantier.id);
                        setActiveSubTab('pointage');
                      }}
                      className="font-semibold text-purple-700 hover:text-purple-800"
                    >
                      Pointage ouvriers
                    </button>
                  </div>

                  <button
                    onClick={() => setSelectedChantierId(chantier.id)}
                    className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                      isCurrentActive
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {isCurrentActive ? 'Chantier Actif' : 'Sélectionner'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SOUS-ONGLET 2 : FEUILLE DE POINTAGE DU CONDUCTEUR DE TRAVAUX */}
      {activeSubTab === 'pointage' && (
        <div className="space-y-4">
          {/* Barre d'Assiduité & Clôture */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                {/* Sélecteur de Chantier */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">Chantier d'intervention</label>
                  <select
                    value={activePointageChantierId}
                    onChange={e => setActivePointageChantierId(e.target.value)}
                    className="text-xs font-bold text-slate-900 bg-white border border-slate-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-emerald-500"
                  >
                    {chantiers.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.nom_projet} ({c.wilaya})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sélecteur de Date */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">Date du pointage</label>
                  <input
                    type="date"
                    value={selectedPointageDate}
                    onChange={e => setSelectedPointageDate(e.target.value)}
                    className="text-xs font-bold text-slate-900 bg-white border border-slate-300 rounded-lg px-3 py-1.5"
                  />
                </div>
              </div>

              {/* Indicateur de Clôture & Heure Limite */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${isPointageLocked ? 'bg-rose-500' : 'bg-emerald-500 animate-pulse'}`} />
                  <div>
                    <div className="flex items-center gap-1.5">
                      {isPointageLocked ? (
                        <span className="text-xs font-bold text-rose-800 flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5 text-rose-600" />
                          POINTAGE CLÔTURÉ & VERROUILLÉ
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                          <Unlock className="w-3.5 h-3.5 text-emerald-600" />
                          POINTAGE OUVERT (Saisie directe autorisée)
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500">
                      Heure limite : <strong className="text-slate-800">{heureLimite}</strong> • Heure simulée : <strong className="text-slate-800">{simulatedPointageTime}</strong>
                    </p>
                  </div>
                </div>

                {/* Bouton de test rapide pour simuler avant vs après clôture */}
                <div className="flex items-center gap-1 border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0 sm:pl-3">
                  <button
                    onClick={() => setSimulatedPointageTime('08:00')}
                    className={`px-2 py-1 rounded text-[10px] font-semibold ${
                      simulatedPointageTime === '08:00' ? 'bg-emerald-600 text-white' : 'bg-white border text-slate-700'
                    }`}
                  >
                    Simuler 08:00 (Ouvert)
                  </button>
                  <button
                    onClick={() => setSimulatedPointageTime('08:35')}
                    className={`px-2 py-1 rounded text-[10px] font-semibold ${
                      simulatedPointageTime === '08:35' ? 'bg-rose-600 text-white' : 'bg-white border text-slate-700'
                    }`}
                  >
                    Simuler 08:35 (Clôturé)
                  </button>
                </div>
              </div>
            </div>

            {/* Alerte si verrouillé */}
            {isPointageLocked && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3 text-xs text-amber-800">
                <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <strong className="font-bold">L'heure limite de pointage ({heureLimite}) est échue.</strong>
                  <p className="text-[11px] mt-0.5 text-amber-700">
                    Les modifications directes sont verrouillées sur le chantier. Pour déclarer une présence tardive ou rectifier une omission, utilisez le bouton <strong>« Demander une dérogation post-clôture »</strong>. Votre demande sera soumise à la validation formelle du Responsable RH avec notification d'information à l'Administrateur.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Tableau de Saisie du Pointage */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50/60 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Effectifs Affectés au Chantier ({assignedWorkers.length} ouvriers répertoriés)
                </h4>
                <p className="text-[11px] text-slate-500">
                  Les nouveaux ouvriers recrutés par le RH et affectés à ce chantier apparaissent ici automatiquement.
                </p>
              </div>

              {!isPointageLocked && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleMarkAllPresent}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    Tout pointer présent
                  </button>
                  <button
                    type="button"
                    onClick={handleSavePointage}
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Enregistrer la feuille
                  </button>
                </div>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100/80 text-slate-600 font-semibold border-b border-slate-200">
                    <th className="py-3 px-4">Ouvrier & Métier BTP</th>
                    <th className="py-3 px-4">Statut d'Assiduité</th>
                    <th className="py-3 px-4">Heure d'Entrée</th>
                    <th className="py-3 px-4">Observations du Conducteur</th>
                    <th className="py-3 px-4 text-right">Action / Dérogation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {assignedWorkers.map(worker => {
                    const currentEntry = localPointages[worker.id] || { statut: 'PRESENT', heure_arrivee: '08:00' };

                    return (
                      <tr key={worker.id} className="hover:bg-slate-50/80">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 font-bold text-slate-700 flex items-center justify-center text-xs shrink-0">
                              {worker.prenom[0]}{worker.nom[0]}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">{worker.nom} {worker.prenom}</p>
                              <p className="text-[11px] text-purple-700 font-medium">
                                {CATEGORIE_LABELS[worker.categorie]} • <span className="text-slate-400 font-mono">{worker.matricule}</span>
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Boutons d'état d'assiduité */}
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap items-center gap-1">
                            {[
                              { id: 'PRESENT', label: 'Présent', color: 'bg-emerald-600 text-white', hover: 'hover:bg-emerald-50 text-emerald-700 border border-emerald-300' },
                              { id: 'RETARD', label: 'Retard', color: 'bg-amber-600 text-white', hover: 'hover:bg-amber-50 text-amber-700 border border-amber-300' },
                              { id: 'ABSENT_INJUSTIFIE', label: 'Injustifié', color: 'bg-rose-600 text-white', hover: 'hover:bg-rose-50 text-rose-700 border border-rose-300' },
                              { id: 'ABSENT_JUSTIFIE', label: 'Justifié / Congé', color: 'bg-blue-600 text-white', hover: 'hover:bg-blue-50 text-blue-700 border border-blue-300' }
                            ].map(btn => {
                              const isSelected = currentEntry.statut === btn.id;
                              return (
                                <button
                                  key={btn.id}
                                  type="button"
                                  disabled={isPointageLocked}
                                  onClick={() => {
                                    setLocalPointages({
                                      ...localPointages,
                                      [worker.id]: {
                                        ...currentEntry,
                                        statut: btn.id as PointageStatut,
                                        heure_arrivee: btn.id === 'RETARD' ? '08:35' : btn.id === 'PRESENT' ? '08:00' : undefined
                                      }
                                    });
                                  }}
                                  className={`px-2 py-1 rounded text-[11px] font-semibold transition-all ${
                                    isSelected ? btn.color : `bg-white ${btn.hover}`
                                  } ${isPointageLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                  {btn.label}
                                </button>
                              );
                            })}
                          </div>
                        </td>

                        {/* Heure d'entrée */}
                        <td className="py-3 px-4">
                          <input
                            type="time"
                            disabled={isPointageLocked || currentEntry.statut === 'ABSENT_INJUSTIFIE'}
                            value={currentEntry.heure_arrivee || ''}
                            onChange={e => {
                              setLocalPointages({
                                ...localPointages,
                                [worker.id]: {
                                  ...currentEntry,
                                  heure_arrivee: e.target.value
                                }
                              });
                            }}
                            className="text-xs p-1 border border-slate-200 rounded font-mono disabled:bg-slate-100 disabled:text-slate-400"
                          />
                        </td>

                        {/* Observations */}
                        <td className="py-3 px-4">
                          <input
                            type="text"
                            disabled={isPointageLocked}
                            placeholder="ex: Affecté coulage radier..."
                            value={currentEntry.observations || ''}
                            onChange={e => {
                              setLocalPointages({
                                ...localPointages,
                                [worker.id]: {
                                  ...currentEntry,
                                  observations: e.target.value
                                }
                              });
                            }}
                            className="w-full text-xs p-1 border border-slate-200 rounded disabled:bg-slate-100 disabled:text-slate-400"
                          />
                        </td>

                        {/* Action : Dérogation si clôturé */}
                        <td className="py-3 px-4 text-right">
                          {isPointageLocked ? (
                            <button
                              type="button"
                              onClick={() => {
                                setDerogationTargetWorker(worker);
                                setDerogationStatutDemande('PRESENT');
                                setDerogationHeureArrivee('08:30');
                                setDerogationMotif('');
                                setIsDerogationModalOpen(true);
                              }}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 font-semibold text-xs transition-colors"
                            >
                              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                              Dérogation post-clôture
                            </button>
                          ) : (
                            <span className="text-[11px] text-emerald-700 font-medium">Saisie active</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}

                  {assignedWorkers.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-500 text-xs">
                        Aucun ouvrier n'est actuellement affecté à ce chantier. Rendez-vous dans le module RH pour recruter ou transférer des ouvriers.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pied de tableau avec bouton de validation si ouvert */}
            {!isPointageLocked && assignedWorkers.length > 0 && (
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
                <button
                  type="button"
                  onClick={handleSavePointage}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-2 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Valider et enregistrer la feuille de pointage
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SOUS-ONGLET 3 : EFFECTIFS AFFECTÉS AU CHANTIER */}
      {activeSubTab === 'equipe' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600" />
                Liste Nominative des Ouvriers Affectés au Chantier
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Personnel actif sous la supervision du conducteur de travaux.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                {assignedWorkers.length} ouvriers actifs
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assignedWorkers.map(worker => (
              <div key={worker.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{worker.nom} {worker.prenom}</h4>
                      <p className="text-[11px] font-mono text-slate-500">{worker.matricule}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
                      {CATEGORIE_LABELS[worker.categorie]}
                    </span>
                  </div>

                  <div className="mt-3 space-y-1 text-xs text-slate-600">
                    <p>Qualification : <strong className="text-slate-800">{worker.qualification}</strong></p>
                    <p>Contrat : <strong className="text-slate-800">{worker.type_contrat}</strong></p>
                    <p>N° CNAS : <span className="font-mono">{worker.num_cnas}</span></p>
                    <p>Tél : <span className="font-semibold">{worker.telephone}</span></p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Affecté le {worker.date_affectation_actuelle}</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    En poste
                  </span>
                </div>
              </div>
            ))}

            {assignedWorkers.length === 0 && (
              <div className="col-span-full py-8 text-center text-slate-500 text-xs">
                Aucun ouvrier n'est actuellement affecté à ce chantier.
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL : DEMANDE D'AUTORISATION DE POINTAGE POST-CLÔTURE */}
      {isDerogationModalOpen && derogationTargetWorker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-600" />
                Demande d'Autorisation de Modification Post-Clôture
              </h3>
              <button onClick={() => setIsDerogationModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400 hover:text-slate-600" />
              </button>
            </div>

            <form onSubmit={handleSubmitDerogation} className="space-y-4 text-xs">
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900">
                <p className="font-bold">Règle de gouvernance BatiProm :</p>
                <p className="text-[11px] mt-0.5">
                  L'heure limite de pointage ({heureLimite}) est passée. Votre demande sera transmise au Responsable RH pour validation. L'Administrateur reçoit une copie d'information.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div>
                  <span className="text-slate-500 block">Ouvrier ciblé :</span>
                  <strong className="text-slate-900 font-bold">{derogationTargetWorker.nom} {derogationTargetWorker.prenom}</strong>
                  <span className="text-[10px] text-slate-400 font-mono block">({derogationTargetWorker.matricule})</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Chantier & Date :</span>
                  <strong className="text-slate-900">{chantiers.find(c => c.id === activePointageChantierId)?.nom_projet}</strong>
                  <span className="text-[10px] text-slate-500 font-mono block">Le {selectedPointageDate}</span>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Nouveau statut sollicité *</label>
                <select
                  value={derogationStatutDemande}
                  onChange={e => setDerogationStatutDemande(e.target.value as PointageStatut)}
                  className="w-full p-2 border border-slate-300 rounded-lg bg-white font-bold"
                >
                  <option value="PRESENT">Présent (Travail effectif)</option>
                  <option value="RETARD">Retard autorisé</option>
                  <option value="ABSENT_JUSTIFIE">Absent Justifié (Arrêt maladie / Urgence)</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Heure d'arrivée effective déclarée</label>
                <input
                  type="time"
                  value={derogationHeureArrivee}
                  onChange={e => setDerogationHeureArrivee(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg font-mono font-bold"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Motif circonstancié obligatoire *</label>
                <textarea
                  required
                  rows={3}
                  value={derogationMotif}
                  onChange={e => setDerogationMotif(e.target.value)}
                  placeholder="ex: Ouvrier arrivé à 08h35 suite à une panne du bus de transport de la base-vie. Présent sur le poste ferraillage bloc B."
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsDerogationModalOpen(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded-lg text-slate-700"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold flex items-center gap-1.5 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  Transmettre au RH
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DETAIL DRAWER / MODAL CHANTIER */}
      {selectedChantierDetail && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-xl border border-slate-200 my-8">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {selectedChantierDetail.code_chantier}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 uppercase font-semibold">
                    {selectedChantierDetail.statut}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-lg mt-1">
                  {selectedChantierDetail.nom_projet}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedChantierDetail.commune}, {selectedChantierDetail.wilaya} · {selectedChantierDetail.adresse_site}
                </p>
              </div>

              <button
                onClick={() => setSelectedChantierDetail(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Assiette Foncière</span>
                <span className="text-base font-bold font-mono text-slate-900">{selectedChantierDetail.superficie_terrain_m2.toLocaleString()} m²</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Surface de Plancher</span>
                <span className="text-base font-bold font-mono text-slate-900">{selectedChantierDetail.surface_plancher_m2.toLocaleString()} m²</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Budget d'Investissement</span>
                <span className="text-xs font-bold font-mono text-slate-900">{formatDZD(selectedChantierDetail.budget_global_prevu)}</span>
              </div>
            </div>

            {/* Intervenants & Organismes */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2 text-xs mb-6">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                Partenaires & Organismes Agréés en Algérie
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-600">
                <div>
                  <span className="text-slate-400 block text-[11px]">Bureau d'Études Techniques (BET) :</span>
                  <span className="font-semibold text-slate-800">{selectedChantierDetail.bureau_etudes || 'Non spécifié'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Organisme de Contrôle Technique (CTC) :</span>
                  <span className="font-semibold text-slate-800">{selectedChantierDetail.organisme_ctc || 'CTC Régional'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Permis de Construire :</span>
                  <span className="font-semibold text-slate-800">{selectedChantierDetail.permis_construire_ref || 'En cours'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Date Prévisionnelle de Réception :</span>
                  <span className="font-semibold text-slate-800">{new Date(selectedChantierDetail.date_livraison_prevue).toLocaleDateString('fr-DZ')}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setSelectedChantierId(selectedChantierDetail.id);
                  setActivePointageChantierId(selectedChantierDetail.id);
                  setSelectedChantierDetail(null);
                  setActiveSubTab('pointage');
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs"
              >
                Ouvrir la feuille de pointage de ce chantier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CREATE CHANTIER */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-xl border border-slate-200 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">
                  Ouverture d'une nouvelle Entité Chantier
                </h3>
                <p className="text-xs text-slate-500">
                  Rattachement relationnel immédiat à l'entreprise de promotion immobilière.
                </p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Nom du projet immobilier *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex: Résidence El Bahia"
                    value={formData.nom_projet}
                    onChange={(e) => setFormData({ ...formData, nom_projet: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Code de référence chantier
                  </label>
                  <input
                    type="text"
                    placeholder="ex: CHT-ALG-2024-04"
                    value={formData.code_chantier}
                    onChange={(e) => setFormData({ ...formData, code_chantier: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Wilaya (Algérie) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.wilaya}
                    onChange={(e) => setFormData({ ...formData, wilaya: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Commune
                  </label>
                  <input
                    type="text"
                    value={formData.commune}
                    onChange={(e) => setFormData({ ...formData, commune: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-medium text-slate-700 mb-1">
                    Adresse précise du terrain / site
                  </label>
                  <input
                    type="text"
                    placeholder="ex: Route Nationale 11, Bordj El Kiffan"
                    value={formData.adresse_site}
                    onChange={(e) => setFormData({ ...formData, adresse_site: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Budget d'investissement prévisionnel (DZD) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.budget_global_prevu}
                    onChange={(e) => setFormData({ ...formData, budget_global_prevu: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Date prévisionnelle de livraison
                  </label>
                  <input
                    type="date"
                    value={formData.date_livraison_prevue}
                    onChange={(e) => setFormData({ ...formData, date_livraison_prevue: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs"
                >
                  Créer et enregistrer le chantier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
