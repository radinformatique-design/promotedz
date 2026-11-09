import {
  Entreprise,
  Chantier,
  Utilisateur,
  Role,
  Permission,
  RolePermission,
  UtilisateurChantierAffectation,
  Notification,
  AuditLog,
  DocumentGED,
  UserSession,
  ModuleCode,
  PermissionAction,
  CompteBancaire,
  ParametresGeneraux,
  Employe,
  AffectationHistorique,
  PointageLigne,
  DemandeDerogationPointage,
  CongeAbsence,
  Fournisseur,
  DemandeAchat,
  ComparaisonOffre,
  BonCommande,
  BonLivraisonReception,
  FactureFournisseur,
  ArticleStock,
  MouvementStock,
  BonSortie,
  TransfertInterChantier,
  InventaireMagasin,
  Vehicule,
  Entretien,
  PieceRemplacable,
  LotTravaux,
  StructureChantier,
  PosteTravaux,
  MetreVérification,
  RapportChantier,
  FactureClient,
  TransactionFinanciere,
  DeclarationFiscale,
  ClotureComptableMensuelle,
  EcritureComptable,
  ContratJuridique,
  DocumentFoncierAdmin,
  DossierLitige,
  BienImmobilier,
  ClientProspect,
  ReservationVenteVEFA
} from '../types/database.ts';

export const DEMO_ENTREPRISE: Entreprise = {
  id: 'ent-001',
  raison_sociale: 'BatiProm Promotion Immobilière Algérie SPA',
  nom_commercial: 'BatiProm Immobilier',
  forme_juridique: 'SPA',
  capital_social: 500000000, // 500 Millions DZD
  rc: '16/00-0982341B21',
  nif: '002116098234189',
  nis: '002116098234189',
  article_imposition: '16032014589',
  agrement_promoteur: 'AGR-MHUV-16-2018-0412', // Agréé par le Ministère de l'Habitat, de l'Urbanisme et de la Ville
  date_agrement: '2018-05-22',
  adresse_siege: '14 Boulevard Colonel Amirouche, Alger Centre',
  wilaya: 'Alger (16)',
  commune_siege: 'Alger Centre',
  code_postal: '16000',
  telephone: '+213 (0) 23 45 67 89',
  email: 'contact@batiprom-dz.com',
  site_web: 'https://www.batiprom-dz.com',
  logo_url: '',
  created_at: '2023-01-15T08:00:00Z',
  updated_at: '2026-10-01T10:00:00Z'
};

export const DEMO_COMPTES_BANCAIRES: CompteBancaire[] = [
  {
    id: 'cpt-001',
    entreprise_id: 'ent-001',
    nom_banque: 'Banque Nationale d’Algérie (BNA)',
    code_banque: '001',
    agence: 'Agence Amirouche 601 (Alger)',
    titulaire: 'BatiProm Promotion Immobilière SPA',
    rib: '001 00601 0200012345 67',
    iban: 'DZ51 001 00601 0200012345 67',
    swift_bic: 'BNAL DZA AL',
    devise: 'DZD',
    actif: true,
    is_compte_principal: true,
    type_compte: 'COURANT',
    created_at: '2023-01-15T09:00:00Z',
    updated_at: '2026-01-10T11:00:00Z'
  },
  {
    id: 'cpt-002',
    entreprise_id: 'ent-001',
    nom_banque: 'Crédit Populaire d’Algérie (CPA)',
    code_banque: '004',
    agence: 'Agence Chéraga 142 (Alger)',
    titulaire: 'BatiProm Immobilier - Compte Séquestre FGCMPI',
    rib: '004 00142 0400098765 42',
    iban: 'DZ51 004 00142 0400098765 42',
    swift_bic: 'CPAL DZA AL',
    devise: 'DZD',
    actif: true,
    is_compte_principal: false,
    type_compte: 'SEQUESTRE_VEFA',
    chantier_dedie_id: 'cht-001',
    chantier_dedie_nom: 'Résidence Les Pins - Chéraga',
    created_at: '2024-01-20T10:00:00Z',
    updated_at: '2026-02-01T14:30:00Z'
  },
  {
    id: 'cpt-003',
    entreprise_id: 'ent-001',
    nom_banque: 'Banque Extérieure d’Algérie (BEA)',
    code_banque: '002',
    agence: 'Agence Front de Mer 210 (Oran)',
    titulaire: 'BatiProm Immobilier - Projet Tour Bahia',
    rib: '002 00210 0300055443 19',
    iban: 'DZ51 002 00210 0300055443 19',
    swift_bic: 'BEAL DZA OR',
    devise: 'DZD',
    actif: true,
    is_compte_principal: false,
    type_compte: 'COURANT',
    chantier_dedie_id: 'cht-002',
    chantier_dedie_nom: 'Tour Bahia - Front de Mer',
    created_at: '2023-10-15T08:30:00Z',
    updated_at: '2026-03-12T09:15:00Z'
  },
  {
    id: 'cpt-004',
    entreprise_id: 'ent-001',
    nom_banque: 'Al Baraka Bank Algeria',
    code_banque: '026',
    agence: 'Agence Didouche Mourad 012 (Alger)',
    titulaire: 'BatiProm Promotion Immobilière SPA',
    rib: '026 00012 0500077889 88',
    iban: 'DZ51 026 00012 0500077889 88',
    swift_bic: 'BARK DZA AL',
    devise: 'EUR',
    actif: true,
    is_compte_principal: false,
    type_compte: 'DEVISES',
    created_at: '2024-06-01T10:00:00Z',
    updated_at: '2025-12-10T16:00:00Z'
  },
  {
    id: 'cpt-005',
    entreprise_id: 'ent-001',
    nom_banque: 'CNEP Banque',
    code_banque: '003',
    agence: 'Agence Constantine Coudiat 302',
    titulaire: 'BatiProm Immobilier - Compte Garanti',
    rib: '003 00302 0100033221 55',
    iban: 'DZ51 003 00302 0100033221 55',
    swift_bic: 'CNEP DZA CS',
    devise: 'DZD',
    actif: false, // Compte inactif / archivé
    is_compte_principal: false,
    type_compte: 'COURANT',
    created_at: '2022-04-10T11:00:00Z',
    updated_at: '2025-01-05T08:00:00Z'
  }
];

export const DEMO_PARAMETRES_GENERAUX: ParametresGeneraux = {
  id: 'param-001',
  entreprise_id: 'ent-001',
  devise_principale: 'DZD',
  langue_defaut: 'fr',
  is_rtl: false,
  format_date: 'JJ/MM/AAAA',
  horaires_travail: {
    debut: '08:00',
    fin: '16:30',
    pause_dejeuner_debut: '12:00',
    pause_dejeuner_fin: '13:00',
    jours_ouvres: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi']
  },
  heure_limite_pointage: '08:15',
  notifications_config: {
    email_actif: true,
    sms_actif: false,
    alerte_depassement_budget_pct: 85,
    rappel_delai_jours_ctc: 15,
    alerte_stock_critique: true,
    alerte_retard_livraison: true,
    notifier_direction_generale: true
  },
  unites_mesure: [
    { id: 'u-1', code: 'M2', libelle: 'Mètre Carré', symbole: 'm²', categorie: 'SURFACE' },
    { id: 'u-2', code: 'M3', libelle: 'Mètre Cube', symbole: 'm³', categorie: 'VOLUME' },
    { id: 'u-3', code: 'T', libelle: 'Tonne Métrique (Acier)', symbole: 't', categorie: 'POIDS' },
    { id: 'u-4', code: 'SAC', libelle: 'Sac de Ciment (50kg)', symbole: 'sac', categorie: 'POIDS' },
    { id: 'u-5', code: 'ML', libelle: 'Mètre Linéaire', symbole: 'ml', categorie: 'LONGUEUR' },
    { id: 'u-6', code: 'U', libelle: 'Unité / Pièce', symbole: 'u', categorie: 'UNITE' }
  ],
  exercices_comptables: [
    { id: 'ex-2026', annee: 2026, date_debut: '2026-01-01', date_fin: '2026-12-31', statut: 'OUVERT', observations: 'Exercice fiscal en cours' },
    { id: 'ex-2025', annee: 2025, date_debut: '2025-01-01', date_fin: '2025-12-31', statut: 'CLOTURE', observations: 'Bilan clôturé et certifié par le commissaire aux comptes' },
    { id: 'ex-2024', annee: 2024, date_debut: '2024-01-01', date_fin: '2024-12-31', statut: 'CLOTURE', observations: 'Clôturé' }
  ],
  updated_at: '2026-11-01T10:00:00Z'
};

export const DEMO_CHANTIERS: Chantier[] = [
  {
    id: 'cht-001',
    entreprise_id: 'ent-001',
    code_chantier: 'CHT-ALG-2024-01',
    nom_projet: 'Résidence Les Pins - Chéraga',
    description: 'Programme résidentiel haut standing de 120 logements avec centre commercial intégré, parking souterrain 2 niveaux et esplanade piétonne.',
    wilaya: 'Alger (16)',
    commune: 'Chéraga',
    adresse_site: 'Route de Bouchaoui, Lotissement Les Pins, Chéraga',
    superficie_terrain_m2: 4850.00,
    surface_plancher_m2: 18200.00,
    nombre_logements: 120,
    nombre_locaux_commerciaux: 14,
    nombre_niveaux: '2SS + RDC + 9 ÉTAGES',
    permis_construire_ref: 'PC-APC-CHR-2023/184',
    date_obtention_permis: '2023-11-14',
    date_ouverture_chantier: '2024-01-10',
    date_livraison_prevue: '2027-06-30',
    budget_global_prevu: 1850000000,
    budget_engage: 980000000,
    statut: 'GROS_OEUVRE',
    taux_avancement_physique: 62.5,
    directeur_chantier_id: 'user-admin',
    conducteur_travaux_id: 'user-ct',
    bureau_etudes: 'BET Archi-Tech & Partenaires (Alger)',
    organisme_ctc: 'CTC Centre - Antenne Chéraga',
    created_at: '2024-01-05T08:00:00Z',
    updated_at: '2026-11-05T14:30:00Z'
  },
  {
    id: 'cht-002',
    entreprise_id: 'ent-001',
    code_chantier: 'CHT-ORN-2024-02',
    nom_projet: 'Tour Bahia - Front de Mer',
    description: 'Tour résidentielle panoramique R+15 sur la baie d’Oran, 84 appartements de luxe, finitions marbre et domotique intégrée.',
    wilaya: 'Oran (31)',
    commune: 'Oran',
    adresse_site: 'Boulevard de l’ALN, Front de Mer, Oran',
    superficie_terrain_m2: 2900.00,
    surface_plancher_m2: 14800.00,
    nombre_logements: 84,
    nombre_locaux_commerciaux: 8,
    nombre_niveaux: '3SS + RDC + 15 ÉTAGES',
    permis_construire_ref: 'PC-W31-ORN-2023/092',
    date_obtention_permis: '2023-08-20',
    date_ouverture_chantier: '2023-10-01',
    date_livraison_prevue: '2026-12-31',
    budget_global_prevu: 2400000000,
    budget_engage: 1890000000,
    statut: 'SECOND_OEUVRE',
    taux_avancement_physique: 78.0,
    directeur_chantier_id: 'user-admin',
    conducteur_travaux_id: 'user-metreur',
    bureau_etudes: 'Cabinet d’Ingénierie Wahran Design',
    organisme_ctc: 'CTC Ouest - Direction Régionale Oran',
    created_at: '2023-09-15T08:00:00Z',
    updated_at: '2026-11-06T10:15:00Z'
  },
  {
    id: 'cht-003',
    entreprise_id: 'ent-001',
    code_chantier: 'CHT-CST-2025-03',
    nom_projet: 'Résidence Cirta - Bellevue',
    description: 'Complexe résidentiel fermé et sécurisé de 95 logements avec espaces verts et crèche privée sur les hauteurs de Constantine.',
    wilaya: 'Constantine (25)',
    commune: 'Constantine',
    adresse_site: 'Plateau de Bellevue, Route de Batna, Constantine',
    superficie_terrain_m2: 6100.00,
    surface_plancher_m2: 16500.00,
    nombre_logements: 95,
    nombre_locaux_commerciaux: 6,
    nombre_niveaux: '1SS + RDC + 7 ÉTAGES',
    permis_construire_ref: 'PC-APC-CST-2024/311',
    date_obtention_permis: '2024-06-15',
    date_ouverture_chantier: '2025-02-01',
    date_livraison_prevue: '2027-12-31',
    budget_global_prevu: 1350000000,
    budget_engage: 320000000,
    statut: 'TERRASSEMENT',
    taux_avancement_physique: 24.0,
    directeur_chantier_id: 'user-admin',
    conducteur_travaux_id: 'user-magasinier',
    bureau_etudes: 'BET Cirta Génie Civil & Structures',
    organisme_ctc: 'CTC Est - Agence Constantine',
    created_at: '2025-01-10T08:00:00Z',
    updated_at: '2026-11-04T17:00:00Z'
  }
];

// ==========================================
// 11 RÔLES OFFICIELS (A: CENTRAUX / B: CHANTIERS)
// ==========================================
export const DEMO_ROLES: Role[] = [
  // A. UTILISATEURS CENTRAUX
  {
    id: 'role-admin',
    code: 'ADMINISTRATEUR',
    libelle: 'Administrateur Central',
    description: 'Accès décisionnel complet et visibilité globale sur l’ensemble des chantiers et modules du siège.',
    is_system: true,
    niveau_hierarchique: 1,
    created_at: '2023-01-01T08:00:00Z'
  },
  {
    id: 'role-rh',
    code: 'RESPONSABLE_RH',
    libelle: 'Responsable RH (Central)',
    description: 'Gestion centralisée du personnel, déclarations CNAS, contrats et pointages ouvriers chantiers.',
    is_system: true,
    niveau_hierarchique: 2,
    created_at: '2023-01-01T08:00:00Z'
  },
  {
    id: 'role-juridique',
    code: 'RESPONSABLE_JURIDIQUE',
    libelle: 'Responsable Juridique (Central)',
    description: 'Affaires foncières, permis de construire, contrats notariés et contentieux (consultation chantiers sans modification).',
    is_system: true,
    niveau_hierarchique: 2,
    created_at: '2023-01-01T08:00:00Z'
  },
  {
    id: 'role-compta',
    code: 'RESPONSABLE_COMPTABILITE',
    libelle: 'Responsable Comptabilité & Fiscalité (Central)',
    description: 'Comptabilité analytique par chantier, TVA, TAP, IBS, situations de travaux et trésorerie.',
    is_system: true,
    niveau_hierarchique: 2,
    created_at: '2023-01-01T08:00:00Z'
  },
  {
    id: 'role-tech',
    code: 'RESPONSABLE_TECHNIQUE',
    libelle: 'Responsable Technique (Central)',
    description: 'Coordination technique des chantiers, BET, visas CTC et validation des réceptions de travaux.',
    is_system: true,
    niveau_hierarchique: 2,
    created_at: '2023-01-01T08:00:00Z'
  },
  {
    id: 'role-materiel',
    code: 'RESPONSABLE_MATERIEL',
    libelle: 'Responsable Matériel (Central)',
    description: 'Parc engins, grues, centrales à béton, maintenances et transferts inter-chantiers.',
    is_system: true,
    niveau_hierarchique: 2,
    created_at: '2023-01-01T08:00:00Z'
  },
  {
    id: 'role-commercial',
    code: 'RESPONSABLE_COMMERCIAL',
    libelle: 'Responsable Commercial (Central)',
    description: 'Programmes de vente sur plans (VEFA Loi 11-04), réservations acquéreurs et versements FGCMPI.',
    is_system: true,
    niveau_hierarchique: 2,
    created_at: '2023-01-01T08:00:00Z'
  },
  {
    id: 'role-appro',
    code: 'RESPONSABLE_APPROVISIONNEMENTS',
    libelle: 'Responsable Approvisionnements (Central)',
    description: 'Centralisation des achats de matériaux (acier, ciment, agrégats) et validation des commandes.',
    is_system: true,
    niveau_hierarchique: 2,
    created_at: '2023-01-01T08:00:00Z'
  },

  // B. UTILISATEURS DES CHANTIERS
  {
    id: 'role-ct',
    code: 'CONDUCTEUR_TRAVAUX',
    libelle: 'Conducteur de Travaux (Chantier)',
    description: 'Pilotage opérationnel exclusif sur son chantier : exécution, DA matériaux, PV et avancement.',
    is_system: true,
    niveau_hierarchique: 3,
    created_at: '2023-01-01T08:00:00Z'
  },
  {
    id: 'role-metreur',
    code: 'METREUR_VERIFICATEUR',
    libelle: 'Métreur Vérificateur (Chantier)',
    description: 'Consultation et saisie des attachements et situations techniques de son chantier.',
    is_system: true,
    niveau_hierarchique: 3,
    created_at: '2023-01-01T08:00:00Z'
  },
  {
    id: 'role-magasinier',
    code: 'MAGASINIER',
    libelle: 'Magasinier (Chantier)',
    description: 'Gestion exclusive du stock et des réceptions du magasin de son chantier.',
    is_system: true,
    niveau_hierarchique: 4,
    created_at: '2023-01-01T08:00:00Z'
  }
];

// ==========================================
// CATALOGUE DES PERMISSIONS PAR MODULE ET ACTION (7 ACTIONS INDÉPENDANTES)
// ==========================================
export const ACTIONS_LIST: PermissionAction[] = [
  'CONSULTER',
  'AJOUTER',
  'MODIFIER',
  'SUPPRIMER',
  'VALIDER',
  'REFUSER',
  'EXPORTER'
];

export const MODULES_LIST: { code: ModuleCode; libelle: string; isCentralOnly: boolean }[] = [
  { code: 'DASHBOARD', libelle: 'Tableau de bord', isCentralOnly: false },
  { code: 'ADMINISTRATION', libelle: 'Administration', isCentralOnly: true },
  { code: 'RH', libelle: 'Ressources humaines', isCentralOnly: true },
  { code: 'JURIDIQUE', libelle: 'Juridique', isCentralOnly: true },
  { code: 'COMPTABILITE', libelle: 'Comptabilité et fiscalité', isCentralOnly: true },
  { code: 'TECHNIQUE', libelle: 'Technique', isCentralOnly: false },
  { code: 'MATERIEL', libelle: 'Matériel', isCentralOnly: true },
  { code: 'COMMERCIAL', libelle: 'Commercial', isCentralOnly: true },
  { code: 'APPROVISIONNEMENTS', libelle: 'Approvisionnements', isCentralOnly: false },
  { code: 'CHANTIERS', libelle: 'Chantiers', isCentralOnly: false },
  { code: 'NOTIFICATIONS', libelle: 'Notifications', isCentralOnly: false },
  { code: 'DOCUMENTS', libelle: 'Documents & GED', isCentralOnly: false },
  { code: 'PARAMETRES', libelle: 'Paramètres', isCentralOnly: true }
];

// Génération exhaustive des permissions par module et action
export const DEMO_PERMISSIONS: Permission[] = [];
MODULES_LIST.forEach(m => {
  ACTIONS_LIST.forEach(a => {
    DEMO_PERMISSIONS.push({
      id: `perm-${m.code.toLowerCase()}-${a.toLowerCase()}`,
      module: m.code,
      action: a,
      code: `${m.code}:${a}`,
      description: `${a} dans le module ${m.libelle}`
    });
  });
});

// ==========================================
// MATRICE INITIALE DES RÔLES & PERMISSIONS
// Respect strict des règles 1 à 7
// ==========================================
export const DEMO_ROLE_PERMISSIONS: RolePermission[] = [
  // 1. ADMINISTRATEUR : Visibilité globale et TOUS les droits
  ...DEMO_PERMISSIONS.map(p => ({ role_id: 'role-admin', permission_id: p.id })),

  // 2. RESPONSABLE RH (Central) : Uniquement RH + Dashboard (Consulter)
  { role_id: 'role-rh', permission_id: 'perm-dashboard-consulter' },
  { role_id: 'role-rh', permission_id: 'perm-rh-consulter' },
  { role_id: 'role-rh', permission_id: 'perm-rh-ajouter' },
  { role_id: 'role-rh', permission_id: 'perm-rh-modifier' },
  { role_id: 'role-rh', permission_id: 'perm-rh-valider' },
  { role_id: 'role-rh', permission_id: 'perm-rh-refuser' },
  { role_id: 'role-rh', permission_id: 'perm-rh-exporter' },
  { role_id: 'role-rh', permission_id: 'perm-notifications-consulter' },

  // 3. RESPONSABLE JURIDIQUE (Central) : Juridique + Consulter Chantiers et Documents sans les modifier
  { role_id: 'role-juridique', permission_id: 'perm-dashboard-consulter' },
  { role_id: 'role-juridique', permission_id: 'perm-juridique-consulter' },
  { role_id: 'role-juridique', permission_id: 'perm-juridique-ajouter' },
  { role_id: 'role-juridique', permission_id: 'perm-juridique-modifier' },
  { role_id: 'role-juridique', permission_id: 'perm-juridique-valider' },
  { role_id: 'role-juridique', permission_id: 'perm-juridique-refuser' },
  { role_id: 'role-juridique', permission_id: 'perm-juridique-exporter' },
  { role_id: 'role-juridique', permission_id: 'perm-chantiers-consulter' }, // Consultation sans modification
  { role_id: 'role-juridique', permission_id: 'perm-documents-consulter' },
  { role_id: 'role-juridique', permission_id: 'perm-documents-valider' },
  { role_id: 'role-juridique', permission_id: 'perm-notifications-consulter' },

  // 4. RESPONSABLE COMPTABILITÉ (Central) : Comptabilité + Consulter Chantiers sans modifier
  { role_id: 'role-compta', permission_id: 'perm-dashboard-consulter' },
  { role_id: 'role-compta', permission_id: 'perm-comptabilite-consulter' },
  { role_id: 'role-compta', permission_id: 'perm-comptabilite-ajouter' },
  { role_id: 'role-compta', permission_id: 'perm-comptabilite-modifier' },
  { role_id: 'role-compta', permission_id: 'perm-comptabilite-valider' },
  { role_id: 'role-compta', permission_id: 'perm-comptabilite-refuser' },
  { role_id: 'role-compta', permission_id: 'perm-comptabilite-exporter' },
  { role_id: 'role-compta', permission_id: 'perm-approvisionnements-consulter' }, // Contrôle budgétaire des DA
  { role_id: 'role-compta', permission_id: 'perm-approvisionnements-valider' },   // Validation comptable obligatoire
  { role_id: 'role-compta', permission_id: 'perm-approvisionnements-refuser' },   // Refus comptable motivé
  { role_id: 'role-compta', permission_id: 'perm-chantiers-consulter' }, // Consultation sans modification
  { role_id: 'role-compta', permission_id: 'perm-documents-consulter' },
  { role_id: 'role-compta', permission_id: 'perm-notifications-consulter' },

  // 5. RESPONSABLE TECHNIQUE (Central) : Technique + Chantiers + Documents
  { role_id: 'role-tech', permission_id: 'perm-dashboard-consulter' },
  { role_id: 'role-tech', permission_id: 'perm-technique-consulter' },
  { role_id: 'role-tech', permission_id: 'perm-technique-ajouter' },
  { role_id: 'role-tech', permission_id: 'perm-technique-modifier' },
  { role_id: 'role-tech', permission_id: 'perm-technique-valider' },
  { role_id: 'role-tech', permission_id: 'perm-technique-refuser' },
  { role_id: 'role-tech', permission_id: 'perm-technique-exporter' },
  { role_id: 'role-tech', permission_id: 'perm-chantiers-consulter' },
  { role_id: 'role-tech', permission_id: 'perm-chantiers-modifier' },
  { role_id: 'role-tech', permission_id: 'perm-documents-consulter' },
  { role_id: 'role-tech', permission_id: 'perm-documents-ajouter' },
  { role_id: 'role-tech', permission_id: 'perm-documents-valider' },
  { role_id: 'role-tech', permission_id: 'perm-notifications-consulter' },

  // 6. RESPONSABLE MATÉRIEL (Central) : Matériel + Chantiers (consulter)
  { role_id: 'role-materiel', permission_id: 'perm-dashboard-consulter' },
  { role_id: 'role-materiel', permission_id: 'perm-materiel-consulter' },
  { role_id: 'role-materiel', permission_id: 'perm-materiel-ajouter' },
  { role_id: 'role-materiel', permission_id: 'perm-materiel-modifier' },
  { role_id: 'role-materiel', permission_id: 'perm-materiel-valider' },
  { role_id: 'role-materiel', permission_id: 'perm-materiel-exporter' },
  { role_id: 'role-materiel', permission_id: 'perm-chantiers-consulter' },
  { role_id: 'role-materiel', permission_id: 'perm-notifications-consulter' },

  // 7. RESPONSABLE COMMERCIAL (Central) : Commercial + Chantiers (consulter)
  { role_id: 'role-commercial', permission_id: 'perm-dashboard-consulter' },
  { role_id: 'role-commercial', permission_id: 'perm-commercial-consulter' },
  { role_id: 'role-commercial', permission_id: 'perm-commercial-ajouter' },
  { role_id: 'role-commercial', permission_id: 'perm-commercial-modifier' },
  { role_id: 'role-commercial', permission_id: 'perm-commercial-valider' },
  { role_id: 'role-commercial', permission_id: 'perm-commercial-exporter' },
  { role_id: 'role-commercial', permission_id: 'perm-chantiers-consulter' },
  { role_id: 'role-commercial', permission_id: 'perm-notifications-consulter' },

  // 8. RESPONSABLE APPROVISIONNEMENTS (Central) : Approvisionnements centralisés
  { role_id: 'role-appro', permission_id: 'perm-dashboard-consulter' },
  { role_id: 'role-appro', permission_id: 'perm-approvisionnements-consulter' },
  { role_id: 'role-appro', permission_id: 'perm-approvisionnements-ajouter' },
  { role_id: 'role-appro', permission_id: 'perm-approvisionnements-modifier' },
  { role_id: 'role-appro', permission_id: 'perm-approvisionnements-valider' },
  { role_id: 'role-appro', permission_id: 'perm-approvisionnements-refuser' },
  { role_id: 'role-appro', permission_id: 'perm-approvisionnements-exporter' },
  { role_id: 'role-appro', permission_id: 'perm-chantiers-consulter' },
  { role_id: 'role-appro', permission_id: 'perm-notifications-consulter' },

  // 9. CONDUCTEUR DE TRAVAUX (Chantier) : Uniquement son chantier, Technique, DA Appro, Documents
  // AUCUN ACCÈS AUX MODULES CENTRAUX (Admin, RH, Juridique, Compta, Matériel, Commercial, Paramètres)
  { role_id: 'role-ct', permission_id: 'perm-dashboard-consulter' },
  { role_id: 'role-ct', permission_id: 'perm-chantiers-consulter' },
  { role_id: 'role-ct', permission_id: 'perm-technique-consulter' },
  { role_id: 'role-ct', permission_id: 'perm-technique-ajouter' },
  { role_id: 'role-ct', permission_id: 'perm-technique-modifier' },
  { role_id: 'role-ct', permission_id: 'perm-approvisionnements-consulter' },
  { role_id: 'role-ct', permission_id: 'perm-approvisionnements-ajouter' }, // Émettre des DA de son chantier
  { role_id: 'role-ct', permission_id: 'perm-documents-consulter' },
  { role_id: 'role-ct', permission_id: 'perm-documents-ajouter' },
  { role_id: 'role-ct', permission_id: 'perm-notifications-consulter' },

  // 10. MÉTREUR VÉRIFICATEUR (Chantier) : Uniquement Technique autorisée sur son chantier
  // AUCUN ACCÈS AUX MODULES CENTRAUX
  { role_id: 'role-metreur', permission_id: 'perm-chantiers-consulter' },
  { role_id: 'role-metreur', permission_id: 'perm-technique-consulter' },
  { role_id: 'role-metreur', permission_id: 'perm-technique-ajouter' },
  { role_id: 'role-metreur', permission_id: 'perm-technique-modifier' },
  { role_id: 'role-metreur', permission_id: 'perm-documents-consulter' },
  { role_id: 'role-metreur', permission_id: 'perm-notifications-consulter' },

  // 11. MAGASINIER (Chantier) : Uniquement le magasin de son chantier (Approvisionnements / Réceptions / Stocks)
  // AUCUN ACCÈS AUX MODULES CENTRAUX
  { role_id: 'role-magasinier', permission_id: 'perm-chantiers-consulter' },
  { role_id: 'role-magasinier', permission_id: 'perm-approvisionnements-consulter' },
  { role_id: 'role-magasinier', permission_id: 'perm-approvisionnements-ajouter' }, // Saisir bon de réception chantier
  { role_id: 'role-magasinier', permission_id: 'perm-notifications-consulter' }
];

// ==========================================
// 11 UTILISATEURS DE DÉMONSTRATION COMPLETS
// ==========================================
export const DEMO_UTILISATEURS: Utilisateur[] = [
  // A. UTILISATEURS CENTRAUX
  {
    id: 'user-admin',
    entreprise_id: 'ent-001',
    nom: 'Haddad',
    prenom: 'Amine',
    email: 'admin@batiprom-dz.com',
    telephone: '+213 550 12 34 56',
    poste: 'Administrateur Général & Directeur',
    type: 'CENTRAL',
    role_id: 'role-admin',
    statut: 'ACTIF',
    chantiers_assignes: ['cht-001', 'cht-002', 'cht-003'],
    dernier_acces: '2026-11-08T08:15:00Z',
    created_at: '2023-01-15T08:00:00Z',
    updated_at: '2026-11-01T09:00:00Z'
  },
  {
    id: 'user-rh',
    entreprise_id: 'ent-001',
    nom: 'Benali',
    prenom: 'Nadia',
    email: 'rh@batiprom-dz.com',
    telephone: '+213 551 22 33 44',
    poste: 'Responsable Ressources Humaines',
    type: 'CENTRAL',
    role_id: 'role-rh',
    statut: 'ACTIF',
    chantiers_assignes: ['cht-001', 'cht-002', 'cht-003'],
    dernier_acces: '2026-11-07T14:20:00Z',
    created_at: '2023-02-10T08:00:00Z',
    updated_at: '2026-10-12T11:00:00Z'
  },
  {
    id: 'user-juridique',
    entreprise_id: 'ent-001',
    nom: 'Mansouri',
    prenom: 'Karima',
    email: 'juridique@batiprom-dz.com',
    telephone: '+213 555 44 33 22',
    poste: 'Responsable Juridique & Affaires Foncières',
    type: 'CENTRAL',
    role_id: 'role-juridique',
    statut: 'ACTIF',
    chantiers_assignes: ['cht-001', 'cht-002', 'cht-003'],
    dernier_acces: '2026-11-07T16:40:00Z',
    created_at: '2023-03-01T08:00:00Z',
    updated_at: '2026-10-15T11:00:00Z'
  },
  {
    id: 'user-compta',
    entreprise_id: 'ent-001',
    nom: 'Saidi',
    prenom: 'Farid',
    email: 'compta@batiprom-dz.com',
    telephone: '+213 552 66 77 88',
    poste: 'Responsable Comptabilité & Fiscalité',
    type: 'CENTRAL',
    role_id: 'role-compta',
    statut: 'ACTIF',
    chantiers_assignes: ['cht-001', 'cht-002', 'cht-003'],
    dernier_acces: '2026-11-08T07:30:00Z',
    created_at: '2023-02-01T08:00:00Z',
    updated_at: '2026-11-01T10:00:00Z'
  },
  {
    id: 'user-tech',
    entreprise_id: 'ent-001',
    nom: 'Chaib',
    prenom: 'Mourad',
    email: 'technique@batiprom-dz.com',
    telephone: '+213 553 11 99 00',
    poste: 'Responsable Technique Central',
    type: 'CENTRAL',
    role_id: 'role-tech',
    statut: 'ACTIF',
    chantiers_assignes: ['cht-001', 'cht-002', 'cht-003'],
    dernier_acces: '2026-11-08T08:00:00Z',
    created_at: '2023-01-20T08:00:00Z',
    updated_at: '2026-11-02T16:00:00Z'
  },
  {
    id: 'user-materiel',
    entreprise_id: 'ent-001',
    nom: 'Taleb',
    prenom: 'Samir',
    email: 'materiel@batiprom-dz.com',
    telephone: '+213 554 33 44 55',
    poste: 'Responsable Matériel & Parc Engins',
    type: 'CENTRAL',
    role_id: 'role-materiel',
    statut: 'ACTIF',
    chantiers_assignes: ['cht-001', 'cht-002', 'cht-003'],
    dernier_acces: '2026-11-06T15:00:00Z',
    created_at: '2023-04-01T08:00:00Z',
    updated_at: '2026-10-20T10:00:00Z'
  },
  {
    id: 'user-commercial',
    entreprise_id: 'ent-001',
    nom: 'Dahmani',
    prenom: 'Selma',
    email: 'commercial@batiprom-dz.com',
    telephone: '+213 556 77 88 99',
    poste: 'Responsable Commerciale & Ventes VEFA',
    type: 'CENTRAL',
    role_id: 'role-commercial',
    statut: 'ACTIF',
    chantiers_assignes: ['cht-001', 'cht-002', 'cht-003'],
    dernier_acces: '2026-11-07T11:30:00Z',
    created_at: '2023-05-15T08:00:00Z',
    updated_at: '2026-11-03T14:00:00Z'
  },
  {
    id: 'user-appro',
    entreprise_id: 'ent-001',
    nom: 'Bouzid',
    prenom: 'Yacine',
    email: 'appro@batiprom-dz.com',
    telephone: '+213 770 99 88 77',
    poste: 'Responsable Approvisionnements Groupe',
    type: 'CENTRAL',
    role_id: 'role-appro',
    statut: 'ACTIF',
    chantiers_assignes: ['cht-001', 'cht-002', 'cht-003'],
    dernier_acces: '2026-11-08T08:00:00Z',
    created_at: '2023-09-01T08:00:00Z',
    updated_at: '2026-11-02T10:20:00Z'
  },

  // B. UTILISATEURS DES CHANTIERS
  {
    id: 'user-ct',
    entreprise_id: 'ent-001',
    nom: 'Belkacem',
    prenom: 'Sofiane',
    email: 'conducteur.cheraga@batiprom-dz.com',
    telephone: '+213 661 78 90 12',
    poste: 'Conducteur de Travaux (Chéraga)',
    type: 'CHANTIER',
    role_id: 'role-ct',
    statut: 'ACTIF',
    chantiers_assignes: ['cht-001'], // STRICTEMENT Chéraga
    dernier_acces: '2026-11-08T07:50:00Z',
    created_at: '2023-06-10T08:00:00Z',
    updated_at: '2026-11-05T14:30:00Z'
  },
  {
    id: 'user-metreur',
    entreprise_id: 'ent-001',
    nom: 'Larbi',
    prenom: 'Kamel',
    email: 'metreur.oran@batiprom-dz.com',
    telephone: '+213 662 45 67 89',
    poste: 'Métreur Vérificateur (Oran)',
    type: 'CHANTIER',
    role_id: 'role-metreur',
    statut: 'ACTIF',
    chantiers_assignes: ['cht-002'], // STRICTEMENT Tour Bahia Oran
    dernier_acces: '2026-11-07T16:10:00Z',
    created_at: '2023-08-01T08:00:00Z',
    updated_at: '2026-10-30T15:00:00Z'
  },
  {
    id: 'user-magasinier',
    entreprise_id: 'ent-001',
    nom: 'Ghezzal',
    prenom: 'Rabah',
    email: 'magasinier.constantine@batiprom-dz.com',
    telephone: '+213 663 12 34 56',
    poste: 'Magasinier de Chantier (Constantine)',
    type: 'CHANTIER',
    role_id: 'role-magasinier',
    statut: 'ACTIF',
    chantiers_assignes: ['cht-003'], // STRICTEMENT Cirta Constantine
    dernier_acces: '2026-11-08T07:00:00Z',
    created_at: '2023-11-01T08:00:00Z',
    updated_at: '2026-11-04T12:00:00Z'
  }
];

export const DEMO_SESSIONS: UserSession[] = [
  {
    id: 'sess-001',
    user_id: 'user-admin',
    token: 'jwt_adm_session_live_8912',
    ip_address: '197.200.12.94 (Fibre Alger Siège)',
    device_info: 'Chrome 128 / macOS Desktop',
    created_at: '2026-11-08T07:30:00Z',
    expires_at: '2026-11-08T19:30:00Z',
    is_revoked: false,
    last_activity: '2026-11-08T08:15:00Z'
  },
  {
    id: 'sess-002',
    user_id: 'user-ct',
    token: 'jwt_ct_session_live_4418',
    ip_address: '105.101.44.18 (4G Mobilis Chéraga)',
    device_info: 'Safari Mobile / iPad Chantier',
    created_at: '2026-11-08T06:50:00Z',
    expires_at: '2026-11-08T18:50:00Z',
    is_revoked: false,
    last_activity: '2026-11-08T07:50:00Z'
  }
];

export const DEMO_NOTIFICATIONS: Notification[] = [
  // 1. Demande d'achat : notification à la comptabilité
  {
    id: 'notif-001',
    created_at: '2026-11-08T08:30:00Z',
    titre: 'Demande d’Achat à contröler : DA-2026-CHT01-0042',
    message: 'Le chantier Résidence Les Pins - Chéraga a émis une DA urgente pour 15 Tonnes d’Acier FeE500 (Montant estimé : 1.950.000 DZD). Contrôle et visa budgétaire requis.',
    type: 'VALIDATION_REQUISE',
    priorite: 'URGENTE',
    statut_validation: 'EN_ATTENTE',
    module: 'APPROVISIONNEMENTS',
    expediteur_id: 'user-ct',
    expediteur_nom: 'Sofiane Belkacem',
    expediteur_role: 'Conducteur de Travaux',
    destinataire_id: 'user-compta',
    destinataire_nom: 'Farid Saidi',
    destinataire_role: 'RESPONSABLE_COMPTABILITE',
    chantier_id: 'cht-001',
    chantier_nom: 'Résidence Les Pins - Chéraga',
    lu: false,
    lien_action: '/approvisionnements',
    historique_actions: [
      { id: 'ha-1', date: '2026-11-08T08:30:00Z', auteur: 'Sofiane Belkacem', action: 'Émission DA et envoi notification à la Comptabilité' }
    ]
  },
  // 2. Achat validé : notification aux approvisionnements
  {
    id: 'notif-002',
    created_at: '2026-11-07T14:15:00Z',
    titre: 'DA-2026-CHT01-0038 VALIDÉE par la Comptabilité',
    message: 'La demande pour 800 sacs de ciment Portland CEM II (720.000 DZD) a reçu le visa comptable. Procédez aux consultations et à l’émission du bon de commande.',
    type: 'INFO',
    priorite: 'HAUTE',
    statut_validation: 'VALIDE',
    module: 'APPROVISIONNEMENTS',
    expediteur_id: 'user-compta',
    expediteur_nom: 'Farid Saidi',
    expediteur_role: 'Responsable Comptabilité & Fiscalité',
    destinataire_id: 'user-appro',
    destinataire_nom: 'Yacine Bouzid',
    destinataire_role: 'RESPONSABLE_APPROVISIONNEMENTS',
    chantier_id: 'cht-001',
    chantier_nom: 'Résidence Les Pins - Chéraga',
    lu: true,
    date_lecture: '2026-11-07T15:00:00Z',
    lien_action: '/approvisionnements',
    historique_actions: [
      { id: 'ha-2', date: '2026-11-07T14:15:00Z', auteur: 'Farid Saidi', action: 'Visa comptable accordé', commentaire: 'Imputation sur budget gros œuvre' }
    ]
  },
  // 3. Marchandises livrées : notification au magasinier concerné
  {
    id: 'notif-003',
    created_at: '2026-11-08T09:00:00Z',
    titre: 'Commande BC-2026-0019 en cours de livraison au Magasin',
    message: 'Livraison directe au magasin du chantier Tour Bahia (120 m³ de Gravier concassé par SCA Carrières). Réception et visa de conformité requis.',
    type: 'INFO',
    priorite: 'NORMALE',
    statut_validation: 'EN_ATTENTE',
    module: 'MAGASIN',
    expediteur_id: 'user-appro',
    expediteur_nom: 'Yacine Bouzid',
    expediteur_role: 'Responsable Approvisionnements',
    destinataire_id: 'user-magasinier',
    destinataire_nom: 'Rabah Ghezzal',
    destinataire_role: 'MAGASINIER',
    chantier_id: 'cht-002',
    chantier_nom: 'Tour Bahia - Front de Mer',
    lu: false,
    lien_action: '/magasin',
    historique_actions: [
      { id: 'ha-3', date: '2026-11-08T09:00:00Z', auteur: 'Yacine Bouzid', action: 'Notification d’expédition transmise au magasinier' }
    ]
  },
  // 4. Demande de modification de pointage : notification au RH
  {
    id: 'notif-004',
    created_at: '2026-11-08T09:15:00Z',
    titre: 'Demande de Dérogation de Pointage : Ali Slimani',
    message: 'Le conducteur de travaux demande la rectification du statut d’absence vers RETARD (Arrivée 08h40 suite panne transport) pour l’ouvrier Ali Slimani.',
    type: 'VALIDATION_REQUISE',
    priorite: 'HAUTE',
    statut_validation: 'EN_ATTENTE',
    module: 'RH',
    expediteur_id: 'user-ct',
    expediteur_nom: 'Sofiane Belkacem',
    expediteur_role: 'Conducteur de Travaux',
    destinataire_id: 'user-rh',
    destinataire_nom: 'Nadia Benali',
    destinataire_role: 'RESPONSABLE_RH',
    chantier_id: 'cht-001',
    chantier_nom: 'Résidence Les Pins - Chéraga',
    lu: false,
    lien_action: '/rh',
    historique_actions: [
      { id: 'ha-4', date: '2026-11-08T09:15:00Z', auteur: 'Sofiane Belkacem', action: 'Soumission dérogation pointage post-clôture' }
    ]
  },
  // 5. Assurance bientôt expirée : notification au responsable matériel
  {
    id: 'notif-005',
    created_at: '2026-11-06T10:00:00Z',
    titre: 'Alerte Expiration Assurance : Camion Toupie Mercedes (01423-116-16)',
    message: 'La police d’assurance SAA N° 16-78914 du camion toupie Mercedes arrive à échéance le 25/11/2026 (dans 17 jours). Renouvellement impératif.',
    type: 'CRITIQUE',
    priorite: 'URGENTE',
    statut_validation: 'EN_ATTENTE',
    module: 'MATERIEL',
    expediteur_id: 'system',
    expediteur_nom: 'Système d’Alerte Automatique',
    expediteur_role: 'AUTOMATE',
    destinataire_id: 'user-materiel',
    destinataire_nom: 'Samir Taleb',
    destinataire_role: 'RESPONSABLE_MATERIEL',
    chantier_id: 'cht-001',
    chantier_nom: 'Résidence Les Pins - Chéraga',
    lu: false,
    lien_action: '/materiel',
    historique_actions: [
      { id: 'ha-5', date: '2026-11-06T10:00:00Z', auteur: 'Système', action: 'Détection automatique de fin de validité assurance' }
    ]
  },
  // 6. Contrôle technique à renouveler : notification au responsable matériel
  {
    id: 'notif-006',
    created_at: '2026-11-05T08:30:00Z',
    titre: 'Renouvellement Contrôle Technique : Grue à Tour Potain 50m',
    message: 'Le certificat de visite de sécurité périodique CTC/VERITAL de la grue à tour sur le chantier Chéraga expire le 30/11/2026. Inspection technique requise.',
    type: 'AVERTISSEMENT',
    priorite: 'HAUTE',
    statut_validation: 'EN_ATTENTE',
    module: 'MATERIEL',
    expediteur_id: 'system',
    expediteur_nom: 'Système d’Alerte Automatique',
    expediteur_role: 'AUTOMATE',
    destinataire_id: 'user-materiel',
    destinataire_nom: 'Samir Taleb',
    destinataire_role: 'RESPONSABLE_MATERIEL',
    chantier_id: 'cht-001',
    chantier_nom: 'Résidence Les Pins - Chéraga',
    lu: true,
    date_lecture: '2026-11-05T11:00:00Z',
    lien_action: '/materiel',
    historique_actions: [
      { id: 'ha-6', date: '2026-11-05T08:30:00Z', auteur: 'Système', action: 'Alerte préventive contrôle technique matériel' }
    ]
  },
  // 7. Stock minimum atteint : notification au magasinier et aux responsables
  {
    id: 'notif-007',
    created_at: '2026-11-07T16:00:00Z',
    titre: 'Alerte Seuil Critique Stock : Acier 12mm (Reste 1.8 Tonne)',
    message: 'Le stock au magasin du chantier Cirta Constantine a franchi le seuil d’alerte (Seuil min : 5.0 t). Réapprovisionnement urgent requis.',
    type: 'CRITIQUE',
    priorite: 'URGENTE',
    statut_validation: 'EN_ATTENTE',
    module: 'MAGASIN',
    expediteur_id: 'user-magasinier',
    expediteur_nom: 'Rabah Ghezzal',
    expediteur_role: 'Magasinier',
    destinataire_id: 'user-appro',
    destinataire_nom: 'Yacine Bouzid',
    destinataire_role: 'RESPONSABLE_APPROVISIONNEMENTS',
    chantier_id: 'cht-003',
    chantier_nom: 'Résidence Cirta - Bellevue',
    lu: false,
    lien_action: '/magasin',
    historique_actions: [
      { id: 'ha-7', date: '2026-11-07T16:00:00Z', auteur: 'Rabah Ghezzal', action: 'Signalement inventaire sous seuil minimum' }
    ]
  },
  // 8. Nouveau recrutement : notification aux utilisateurs autorisés
  {
    id: 'notif-008',
    created_at: '2026-11-04T11:20:00Z',
    titre: 'Nouveau Recrutement : Ahmed Zerrouki (Chef d’Équipe)',
    message: 'Le responsable RH a enregistré le recrutement et l’affectation de M. Ahmed Zerrouki (Matricule: EMP-BTP-2024-001) sur votre chantier.',
    type: 'INFO',
    priorite: 'NORMALE',
    statut_validation: 'NON_APPLICABLE',
    module: 'RH',
    expediteur_id: 'user-rh',
    expediteur_nom: 'Nadia Benali',
    expediteur_role: 'Responsable Ressources Humaines',
    destinataire_id: 'user-ct',
    destinataire_nom: 'Sofiane Belkacem',
    destinataire_role: 'CONDUCTEUR_TRAVAUX',
    chantier_id: 'cht-001',
    chantier_nom: 'Résidence Les Pins - Chéraga',
    lu: true,
    date_lecture: '2026-11-04T14:00:00Z',
    lien_action: '/rh',
    historique_actions: [
      { id: 'ha-8', date: '2026-11-04T11:20:00Z', auteur: 'Nadia Benali', action: 'Création fiche employé et affectation chantier' }
    ]
  },
  // 9. Retard de livraison : notification aux approvisionnements et aux responsables
  {
    id: 'notif-009',
    created_at: '2026-11-08T07:15:00Z',
    titre: 'Retard de Livraison Signallé : BL-GICA-98214 (Ciment)',
    message: 'Le camion-citerne GICA Meftah prévu le 07/11 accuse un retard de 24h sur le chantier Chéraga. Suivi auprès du transporteur requis.',
    type: 'AVERTISSEMENT',
    priorite: 'HAUTE',
    statut_validation: 'EN_ATTENTE',
    module: 'APPROVISIONNEMENTS',
    expediteur_id: 'user-magasinier',
    expediteur_nom: 'Rabah Ghezzal',
    expediteur_role: 'Magasinier Chantier',
    destinataire_id: 'user-appro',
    destinataire_nom: 'Yacine Bouzid',
    destinataire_role: 'RESPONSABLE_APPROVISIONNEMENTS',
    chantier_id: 'cht-001',
    chantier_nom: 'Résidence Les Pins - Chéraga',
    lu: false,
    lien_action: '/approvisionnements',
    historique_actions: [
      { id: 'ha-9', date: '2026-11-08T07:15:00Z', auteur: 'Rabah Ghezzal', action: 'Signalement non-réception camion à la date convenue' }
    ]
  }
];

export const DEMO_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'aud-001',
    created_at: '2026-11-08T07:45:12Z',
    utilisateur_id: 'user-ct',
    utilisateur_nom: 'Sofiane Belkacem',
    utilisateur_email: 'conducteur.cheraga@batiprom-dz.com',
    chantier_id: 'cht-001',
    chantier_nom: 'Résidence Les Pins - Chéraga',
    module: 'APPROVISIONNEMENTS',
    action: 'CREATION',
    entite_cible: 'approvisionnement_demandes_achat',
    entite_id: 'DA-2026-089',
    description: 'Création d’une demande d’achat urgente : 60 Tonnes Acier FeE500 haute adhérence.',
    adresse_ip: '105.101.44.18 (4G Mobilis Chantier Chéraga)',
    details_modifications: {
      apres: { numero_da: 'DA-2026-089', quantite: '60 Tonnes', statut: 'SOUMIS_SIEGE' }
    }
  },
  {
    id: 'aud-002',
    created_at: '2026-11-07T16:30:20Z',
    utilisateur_id: 'user-juridique',
    utilisateur_nom: 'Karima Mansouri',
    utilisateur_email: 'juridique@batiprom-dz.com',
    chantier_id: 'cht-003',
    chantier_nom: 'Résidence Cirta - Bellevue',
    module: 'JURIDIQUE',
    action: 'VALIDATION_FINANCIERE',
    entite_cible: 'juridique_dossiers',
    entite_id: 'JUR-FONC-25-014',
    description: 'Enregistrement et visa de conformité de l’acte notarié d’assiette foncière délivré par la conservation de Constantine.',
    adresse_ip: '197.200.12.94 (Fibre Siège Central Alger)',
    details_modifications: {
      avant: { statut_conformite: 'EN_ATTENTE_PURGE' },
      apres: { statut_conformite: 'CONFORME', date_validation: '2026-11-07' }
    }
  },
  {
    id: 'aud-003',
    created_at: '2026-11-06T14:15:00Z',
    utilisateur_id: 'user-admin',
    utilisateur_nom: 'Amine Haddad (Admin)',
    utilisateur_email: 'admin@batiprom-dz.com',
    chantier_id: 'cht-002',
    chantier_nom: 'Tour Bahia - Front de Mer',
    module: 'COMPTABILITE',
    action: 'APPROBATION_TECHNIQUE',
    entite_cible: 'comptabilite_budgets',
    entite_id: 'BUD-ORN-LOT03',
    description: 'Approbation de l’avenant N°2 pour le lot Façades Murs-Rideaux aluminium (Montant : 45.000.000 DZD).',
    adresse_ip: '197.200.12.94 (Siège Central Alger)'
  }
];

export const DEMO_DOCUMENTS: DocumentGED[] = [
  {
    id: 'doc-001',
    titre: 'Arrêté d’Approbation du Permis de Construire',
    reference_officielle: 'PC N° 184/APC/2023',
    chantier_id: 'cht-001',
    chantier_nom: 'Résidence Les Pins - Chéraga',
    module: 'JURIDIQUE',
    categorie: 'PERMIS_ET_JURIDIQUE',
    nom_fichier: 'Permis_Construire_Cheraga_184_2023.pdf',
    extension: 'PDF',
    taille_ko: 3420,
    mime_type: 'application/pdf',
    version: 'v1.0-Signé',
    est_valide_juridiquement: true,
    uploade_par_id: 'user-juridique',
    uploade_par_nom: 'Karima Mansouri',
    created_at: '2023-11-15T10:00:00Z',
    updated_at: '2023-11-15T10:00:00Z'
  },
  {
    id: 'doc-002',
    titre: 'Plan de Coffrage et Ferraillage Voiles Béton (R+4 au R+7)',
    reference_officielle: 'BET-PLN-BA-2024-401',
    chantier_id: 'cht-001',
    chantier_nom: 'Résidence Les Pins - Chéraga',
    module: 'TECHNIQUE',
    categorie: 'PLAN_TECHNIQUE',
    nom_fichier: 'Plans_Ferraillage_Voiles_R4_R7.dwg',
    extension: 'DWG',
    taille_ko: 14850,
    mime_type: 'application/octet-stream',
    version: 'v2.1-Approuvé CTC',
    est_valide_juridiquement: true,
    uploade_par_id: 'user-ct',
    uploade_par_nom: 'Sofiane Belkacem',
    created_at: '2024-05-10T14:30:00Z',
    updated_at: '2024-06-01T09:00:00Z'
  },
  {
    id: 'doc-003',
    titre: 'Procès-Verbal de Réception Technique CTC - Fondations Profondes',
    reference_officielle: 'PV-CTC-ORN-2023-088',
    chantier_id: 'cht-002',
    chantier_nom: 'Tour Bahia - Front de Mer',
    module: 'TECHNIQUE',
    categorie: 'RAPPORT_CTC',
    nom_fichier: 'PV_CTC_Pieux_Fondations_Bahia.pdf',
    extension: 'PDF',
    taille_ko: 2150,
    mime_type: 'application/pdf',
    version: 'v1.0-Définitif',
    est_valide_juridiquement: true,
    uploade_par_id: 'user-tech',
    uploade_par_nom: 'Mourad Chaib',
    created_at: '2023-12-05T11:00:00Z',
    updated_at: '2023-12-05T11:00:00Z'
  }
];

// ==========================================
// RESSOURCES HUMAINES & GESTION DU PERSONNEL (BTP)
// ==========================================

export const DEMO_EMPLOYES: Employe[] = [
  {
    id: 'emp-001',
    entreprise_id: 'ent-001',
    matricule: 'EMP-BTP-2024-001',
    nom: 'Zerrouki',
    prenom: 'Ahmed',
    date_naissance: '1984-06-12',
    lieu_naissance: 'Médéa',
    wilaya_naissance: 'Médéa (26)',
    nationalite: 'Algérienne',
    nin: '119842600123456789',
    num_cnas: '26/840612001-44',
    groupe_sanguin: 'O+',
    telephone: '+213 661 24 55 80',
    adresse: 'Cité 500 Logements, Bâtiment C4, Chéraga',
    commune: 'Chéraga',
    wilaya: 'Alger (16)',
    personne_urgence_nom: 'Zerrouki Fatima (Épouse)',
    personne_urgence_tel: '+213 662 10 99 44',
    categorie: 'CHEF_EQUIPE',
    qualification: 'MAITRISE',
    type_contrat: 'CDD_CHANTIER',
    date_embauche: '2024-01-15',
    date_fin_contrat: '2027-06-30',
    salaire_base_dzd: 78000,
    chantier_actuel_id: 'cht-001',
    chantier_actuel_nom: 'Résidence Les Pins - Chéraga',
    date_affectation_actuelle: '2024-01-15',
    statut: 'ACTIF',
    documents_fournis: {
      carte_chifa_cnas: true,
      certificat_medical_aptitude: true,
      copie_cni_nin: true,
      attestation_travail_ou_diplome: true,
      photos_identite: true,
      fiche_anthropometrique: true
    },
    created_at: '2024-01-15T08:00:00Z',
    updated_at: '2026-11-01T09:00:00Z'
  },
  {
    id: 'emp-002',
    entreprise_id: 'ent-001',
    matricule: 'EMP-BTP-2024-002',
    nom: 'Kaci',
    prenom: 'Mourad',
    date_naissance: '1990-03-22',
    lieu_naissance: 'Tizi Ouzou',
    wilaya_naissance: 'Tizi Ouzou (15)',
    nationalite: 'Algérienne',
    nin: '119901500345678901',
    num_cnas: '15/900322019-12',
    groupe_sanguin: 'A+',
    telephone: '+213 770 41 82 90',
    adresse: 'Village Tala Allam, Tizi Ouzou (Résidence base-vie chantier)',
    commune: 'Chéraga',
    wilaya: 'Alger (16)',
    personne_urgence_nom: 'Kaci Arezki (Frère)',
    personne_urgence_tel: '+213 551 88 20 15',
    categorie: 'MACON',
    qualification: 'QUALIFIE',
    type_contrat: 'CDD_CHANTIER',
    date_embauche: '2024-02-01',
    date_fin_contrat: '2026-12-31',
    salaire_base_dzd: 58000,
    chantier_actuel_id: 'cht-001',
    chantier_actuel_nom: 'Résidence Les Pins - Chéraga',
    date_affectation_actuelle: '2024-02-01',
    statut: 'ACTIF',
    documents_fournis: {
      carte_chifa_cnas: true,
      certificat_medical_aptitude: true,
      copie_cni_nin: true,
      attestation_travail_ou_diplome: true,
      photos_identite: true,
      fiche_anthropometrique: true
    },
    created_at: '2024-02-01T08:00:00Z',
    updated_at: '2026-11-01T09:00:00Z'
  },
  {
    id: 'emp-003',
    entreprise_id: 'ent-001',
    matricule: 'EMP-BTP-2024-003',
    nom: 'Bouzid',
    prenom: 'Brahim',
    date_naissance: '1987-11-05',
    lieu_naissance: 'Bordj Bou Arreridj',
    wilaya_naissance: 'BBA (34)',
    nationalite: 'Algérienne',
    nin: '119873400567890123',
    num_cnas: '34/871105008-88',
    groupe_sanguin: 'B+',
    telephone: '+213 558 92 11 04',
    adresse: 'Hai El Badr, Kouba',
    commune: 'Kouba',
    wilaya: 'Alger (16)',
    personne_urgence_nom: 'Bouzid Samira (Soeur)',
    personne_urgence_tel: '+213 550 44 32 10',
    categorie: 'FERRAILLEUR',
    qualification: 'HAUTEMENT_QUALIFIE',
    type_contrat: 'CDD_CHANTIER',
    date_embauche: '2024-02-15',
    date_fin_contrat: '2027-06-30',
    salaire_base_dzd: 62000,
    chantier_actuel_id: 'cht-001',
    chantier_actuel_nom: 'Résidence Les Pins - Chéraga',
    date_affectation_actuelle: '2024-02-15',
    statut: 'ACTIF',
    documents_fournis: {
      carte_chifa_cnas: true,
      certificat_medical_aptitude: true,
      copie_cni_nin: true,
      attestation_travail_ou_diplome: true,
      photos_identite: true,
      fiche_anthropometrique: true
    },
    created_at: '2024-02-15T08:00:00Z',
    updated_at: '2026-11-01T09:00:00Z'
  },
  {
    id: 'emp-004',
    entreprise_id: 'ent-001',
    matricule: 'EMP-BTP-2024-004',
    nom: 'Benali',
    prenom: 'Rabah',
    date_naissance: '1992-09-18',
    lieu_naissance: 'Ain Defla',
    wilaya_naissance: 'Ain Defla (44)',
    nationalite: 'Algérienne',
    nin: '119924400987654321',
    num_cnas: '44/920918012-76',
    groupe_sanguin: 'O-',
    telephone: '+213 664 77 12 05',
    adresse: 'Bouchaoui Centre, Chéraga',
    commune: 'Chéraga',
    wilaya: 'Alger (16)',
    personne_urgence_nom: 'Benali Omar (Père)',
    personne_urgence_tel: '+213 771 90 22 41',
    categorie: 'COFFREUR',
    qualification: 'SPECIALISE',
    type_contrat: 'CDD_CHANTIER',
    date_embauche: '2024-03-01',
    date_fin_contrat: '2027-06-30',
    salaire_base_dzd: 64000,
    chantier_actuel_id: 'cht-001',
    chantier_actuel_nom: 'Résidence Les Pins - Chéraga',
    date_affectation_actuelle: '2024-03-01',
    statut: 'ACTIF',
    documents_fournis: {
      carte_chifa_cnas: true,
      certificat_medical_aptitude: true,
      copie_cni_nin: true,
      attestation_travail_ou_diplome: true,
      photos_identite: true,
      fiche_anthropometrique: true
    },
    created_at: '2024-03-01T08:00:00Z',
    updated_at: '2026-11-01T09:00:00Z'
  },
  {
    id: 'emp-005',
    entreprise_id: 'ent-001',
    matricule: 'EMP-BTP-2024-005',
    nom: 'Meziani',
    prenom: 'Khaled',
    date_naissance: '1982-01-30',
    lieu_naissance: 'Blida',
    wilaya_naissance: 'Blida (09)',
    nationalite: 'Algérienne',
    nin: '119820900112233445',
    num_cnas: '09/820130005-99',
    groupe_sanguin: 'AB+',
    telephone: '+213 552 14 36 78',
    adresse: 'Boufarik, Blida',
    commune: 'Boufarik',
    wilaya: 'Blida (09)',
    personne_urgence_nom: 'Meziani Hassiba (Épouse)',
    personne_urgence_tel: '+213 553 40 88 12',
    categorie: 'CONDUCTEUR_ENGIN',
    qualification: 'HAUTEMENT_QUALIFIE',
    type_contrat: 'CDI',
    date_embauche: '2023-05-10',
    salaire_base_dzd: 88000,
    chantier_actuel_id: 'cht-001',
    chantier_actuel_nom: 'Résidence Les Pins - Chéraga',
    date_affectation_actuelle: '2024-01-10',
    statut: 'ACTIF',
    documents_fournis: {
      carte_chifa_cnas: true,
      certificat_medical_aptitude: true,
      copie_cni_nin: true,
      attestation_travail_ou_diplome: true,
      photos_identite: true,
      fiche_anthropometrique: true
    },
    created_at: '2023-05-10T08:00:00Z',
    updated_at: '2026-11-01T09:00:00Z'
  },
  {
    id: 'emp-006',
    entreprise_id: 'ent-001',
    matricule: 'EMP-BTP-2024-006',
    nom: 'Slimani',
    prenom: 'Ali',
    date_naissance: '1998-04-14',
    lieu_naissance: 'M’Sila',
    wilaya_naissance: 'M’Sila (28)',
    nationalite: 'Algérienne',
    nin: '119982800456123789',
    num_cnas: '28/980414002-31',
    groupe_sanguin: 'O+',
    telephone: '+213 670 99 81 22',
    adresse: 'Base-vie ouvriers Chéraga',
    commune: 'Chéraga',
    wilaya: 'Alger (16)',
    personne_urgence_nom: 'Slimani Lakhdar (Oncle)',
    personne_urgence_tel: '+213 661 55 40 19',
    categorie: 'MANOEUVRE',
    qualification: 'MANOEUVRE_ORDINAIRE',
    type_contrat: 'JOURNALIER',
    date_embauche: '2024-04-01',
    date_fin_contrat: '2026-12-31',
    salaire_base_dzd: 45000,
    chantier_actuel_id: 'cht-001',
    chantier_actuel_nom: 'Résidence Les Pins - Chéraga',
    date_affectation_actuelle: '2024-04-01',
    statut: 'ACTIF',
    documents_fournis: {
      carte_chifa_cnas: true,
      certificat_medical_aptitude: true,
      copie_cni_nin: true,
      attestation_travail_ou_diplome: false,
      photos_identite: true,
      fiche_anthropometrique: true
    },
    created_at: '2024-04-01T08:00:00Z',
    updated_at: '2026-11-01T09:00:00Z'
  },
  {
    id: 'emp-007',
    entreprise_id: 'ent-001',
    matricule: 'EMP-BTP-2024-007',
    nom: 'Cherif',
    prenom: 'Yassine',
    date_naissance: '1991-12-03',
    lieu_naissance: 'Alger',
    wilaya_naissance: 'Alger (16)',
    nationalite: 'Algérienne',
    nin: '119911600789123456',
    num_cnas: '16/911203004-50',
    groupe_sanguin: 'A-',
    telephone: '+213 560 33 21 89',
    adresse: 'Bab El Oued, Alger',
    commune: 'Bab El Oued',
    wilaya: 'Alger (16)',
    personne_urgence_nom: 'Cherif Meriem (Mère)',
    personne_urgence_tel: '+213 555 78 90 12',
    categorie: 'ELECTRICIEN',
    qualification: 'QUALIFIE',
    type_contrat: 'CDD_CHANTIER',
    date_embauche: '2024-05-15',
    date_fin_contrat: '2027-06-30',
    salaire_base_dzd: 65000,
    chantier_actuel_id: 'cht-001',
    chantier_actuel_nom: 'Résidence Les Pins - Chéraga',
    date_affectation_actuelle: '2024-05-15',
    statut: 'ACTIF',
    documents_fournis: {
      carte_chifa_cnas: true,
      certificat_medical_aptitude: true,
      copie_cni_nin: true,
      attestation_travail_ou_diplome: true,
      photos_identite: true,
      fiche_anthropometrique: true
    },
    created_at: '2024-05-15T08:00:00Z',
    updated_at: '2026-11-01T09:00:00Z'
  },
  // Employés Chantier 2 (Oran)
  {
    id: 'emp-008',
    entreprise_id: 'ent-001',
    matricule: 'EMP-BTP-2023-008',
    nom: 'Hamidi',
    prenom: 'Reda',
    date_naissance: '1985-08-19',
    lieu_naissance: 'Oran',
    wilaya_naissance: 'Oran (31)',
    nationalite: 'Algérienne',
    nin: '119853100891234567',
    num_cnas: '31/850819001-22',
    groupe_sanguin: 'O+',
    telephone: '+213 661 88 44 20',
    adresse: 'Hai Akid Lotfi, Oran',
    commune: 'Oran',
    wilaya: 'Oran (31)',
    personne_urgence_nom: 'Hamidi Salima (Épouse)',
    personne_urgence_tel: '+213 770 12 34 56',
    categorie: 'FERRAILLEUR',
    qualification: 'HAUTEMENT_QUALIFIE',
    type_contrat: 'CDD_CHANTIER',
    date_embauche: '2023-10-05',
    date_fin_contrat: '2026-12-31',
    salaire_base_dzd: 70000,
    chantier_actuel_id: 'cht-002',
    chantier_actuel_nom: 'Tour Bahia - Front de Mer',
    date_affectation_actuelle: '2023-10-05',
    statut: 'ACTIF',
    documents_fournis: {
      carte_chifa_cnas: true,
      certificat_medical_aptitude: true,
      copie_cni_nin: true,
      attestation_travail_ou_diplome: true,
      photos_identite: true,
      fiche_anthropometrique: true
    },
    created_at: '2023-10-05T08:00:00Z',
    updated_at: '2026-11-01T09:00:00Z'
  },
  {
    id: 'emp-009',
    entreprise_id: 'ent-001',
    matricule: 'EMP-BTP-2023-009',
    nom: 'Taleb',
    prenom: 'Mustapha',
    date_naissance: '1988-02-11',
    lieu_naissance: 'Mostaganem',
    wilaya_naissance: 'Mostaganem (27)',
    nationalite: 'Algérienne',
    nin: '119882700912345678',
    num_cnas: '27/880211003-88',
    groupe_sanguin: 'B-',
    telephone: '+213 550 77 66 11',
    adresse: 'Hai Khemisti, Oran',
    commune: 'Oran',
    wilaya: 'Oran (31)',
    personne_urgence_nom: 'Taleb Abdelkader (Père)',
    personne_urgence_tel: '+213 551 22 33 44',
    categorie: 'COFFREUR',
    qualification: 'QUALIFIE',
    type_contrat: 'CDD_CHANTIER',
    date_embauche: '2023-10-15',
    date_fin_contrat: '2026-12-31',
    salaire_base_dzd: 61000,
    chantier_actuel_id: 'cht-002',
    chantier_actuel_nom: 'Tour Bahia - Front de Mer',
    date_affectation_actuelle: '2023-10-15',
    statut: 'ACTIF',
    documents_fournis: {
      carte_chifa_cnas: true,
      certificat_medical_aptitude: true,
      copie_cni_nin: true,
      attestation_travail_ou_diplome: true,
      photos_identite: true,
      fiche_anthropometrique: true
    },
    created_at: '2023-10-15T08:00:00Z',
    updated_at: '2026-11-01T09:00:00Z'
  },
  {
    id: 'emp-010',
    entreprise_id: 'ent-001',
    matricule: 'EMP-BTP-2023-010',
    nom: 'Belhadj',
    prenom: 'Nabil',
    date_naissance: '1980-10-25',
    lieu_naissance: 'Mascara',
    wilaya_naissance: 'Mascara (29)',
    nationalite: 'Algérienne',
    nin: '119802900123456789',
    num_cnas: '29/801025002-14',
    groupe_sanguin: 'O+',
    telephone: '+213 772 19 80 44',
    adresse: 'Sidi Chami, Oran',
    commune: 'Sidi Chami',
    wilaya: 'Oran (31)',
    personne_urgence_nom: 'Belhadj Nadia (Épouse)',
    personne_urgence_tel: '+213 661 90 87 65',
    categorie: 'CONDUCTEUR_ENGIN',
    qualification: 'HAUTEMENT_QUALIFIE',
    type_contrat: 'CDI',
    date_embauche: '2023-09-01',
    salaire_base_dzd: 84000,
    chantier_actuel_id: 'cht-002',
    chantier_actuel_nom: 'Tour Bahia - Front de Mer',
    date_affectation_actuelle: '2023-10-01',
    statut: 'ACTIF',
    documents_fournis: {
      carte_chifa_cnas: true,
      certificat_medical_aptitude: true,
      copie_cni_nin: true,
      attestation_travail_ou_diplome: true,
      photos_identite: true,
      fiche_anthropometrique: true
    },
    created_at: '2023-09-01T08:00:00Z',
    updated_at: '2026-11-01T09:00:00Z'
  },
  // Employés Chantier 3 (Constantine)
  {
    id: 'emp-011',
    entreprise_id: 'ent-001',
    matricule: 'EMP-BTP-2025-011',
    nom: 'Amrani',
    prenom: 'Farouk',
    date_naissance: '1989-05-17',
    lieu_naissance: 'Constantine',
    wilaya_naissance: 'Constantine (25)',
    nationalite: 'Algérienne',
    nin: '119892500123456789',
    num_cnas: '25/890517006-77',
    groupe_sanguin: 'A+',
    telephone: '+213 559 11 22 33',
    adresse: 'Cité Ziadia, Constantine',
    commune: 'Constantine',
    wilaya: 'Constantine (25)',
    personne_urgence_nom: 'Amrani Mourad (Frère)',
    personne_urgence_tel: '+213 551 66 77 88',
    categorie: 'TOPOGRAPHE',
    qualification: 'MAITRISE',
    type_contrat: 'CDI',
    date_embauche: '2025-01-20',
    salaire_base_dzd: 92000,
    chantier_actuel_id: 'cht-003',
    chantier_actuel_nom: 'Résidence Cirta - Bellevue',
    date_affectation_actuelle: '2025-02-01',
    statut: 'ACTIF',
    documents_fournis: {
      carte_chifa_cnas: true,
      certificat_medical_aptitude: true,
      copie_cni_nin: true,
      attestation_travail_ou_diplome: true,
      photos_identite: true,
      fiche_anthropometrique: true
    },
    created_at: '2025-01-20T08:00:00Z',
    updated_at: '2026-11-01T09:00:00Z'
  },
  {
    id: 'emp-012',
    entreprise_id: 'ent-001',
    matricule: 'EMP-BTP-2025-012',
    nom: 'Mansour',
    prenom: 'Kamel',
    date_naissance: '1993-07-28',
    lieu_naissance: 'Batna',
    wilaya_naissance: 'Batna (05)',
    nationalite: 'Algérienne',
    nin: '119930500987654321',
    num_cnas: '05/930728004-90',
    groupe_sanguin: 'O+',
    telephone: '+213 662 33 44 55',
    adresse: 'Plateau Bellevue, Constantine',
    commune: 'Constantine',
    wilaya: 'Constantine (25)',
    personne_urgence_nom: 'Mansour Toufik (Cousin)',
    personne_urgence_tel: '+213 770 99 88 77',
    categorie: 'PLOMBIER',
    qualification: 'QUALIFIE',
    type_contrat: 'CDD_CHANTIER',
    date_embauche: '2025-02-01',
    date_fin_contrat: '2027-12-31',
    salaire_base_dzd: 58000,
    chantier_actuel_id: 'cht-003',
    chantier_actuel_nom: 'Résidence Cirta - Bellevue',
    date_affectation_actuelle: '2025-02-01',
    statut: 'ACTIF',
    documents_fournis: {
      carte_chifa_cnas: true,
      certificat_medical_aptitude: true,
      copie_cni_nin: true,
      attestation_travail_ou_diplome: true,
      photos_identite: true,
      fiche_anthropometrique: true
    },
    created_at: '2025-02-01T08:00:00Z',
    updated_at: '2026-11-01T09:00:00Z'
  }
];

// ==========================================
// HISTORIQUE DES AFFECTATIONS & TRANSFERTS INTER-CHANTIERS
// ==========================================

export const DEMO_AFFECTATIONS_HISTORIQUE: AffectationHistorique[] = [
  {
    id: 'aff-001',
    employe_id: 'emp-001',
    employe_nom: 'Ahmed Zerrouki',
    employe_matricule: 'EMP-BTP-2024-001',
    chantier_cible_id: 'cht-001',
    chantier_cible_nom: 'Résidence Les Pins - Chéraga',
    date_effet: '2024-01-15',
    motif: 'Affectation initiale lors du démarrage du gros œuvre',
    valide_par_id: 'user-rh',
    valide_par_nom: 'Nadia Benali (RH)',
    created_at: '2024-01-15T08:00:00Z'
  },
  {
    id: 'aff-002',
    employe_id: 'emp-003',
    employe_nom: 'Brahim Bouzid',
    employe_matricule: 'EMP-BTP-2024-003',
    chantier_source_id: 'cht-002',
    chantier_source_nom: 'Tour Bahia - Front de Mer',
    chantier_cible_id: 'cht-001',
    chantier_cible_nom: 'Résidence Les Pins - Chéraga',
    date_effet: '2024-02-15',
    motif: 'Transfert de renfort pour coulage du radier et voiles de sous-sol',
    valide_par_id: 'user-rh',
    valide_par_nom: 'Nadia Benali (RH)',
    created_at: '2024-02-14T15:00:00Z'
  },
  {
    id: 'aff-003',
    employe_id: 'emp-005',
    employe_nom: 'Khaled Meziani',
    employe_matricule: 'EMP-BTP-2024-005',
    chantier_cible_id: 'cht-001',
    chantier_cible_nom: 'Résidence Les Pins - Chéraga',
    date_effet: '2024-01-10',
    motif: 'Affectation au poste de grutier principal (Grue à tour Potain 50m)',
    valide_par_id: 'user-rh',
    valide_par_nom: 'Nadia Benali (RH)',
    created_at: '2024-01-10T09:00:00Z'
  }
];

// ==========================================
// CONGÉS ET ABSENCES RH
// ==========================================

export const DEMO_CONGES_ABSENCES: CongeAbsence[] = [
  {
    id: 'cng-001',
    employe_id: 'emp-002',
    employe_nom: 'Mourad Kaci',
    employe_matricule: 'EMP-BTP-2024-002',
    chantier_id: 'cht-001',
    type: 'EVENEMENT_FAMILIAL',
    date_debut: '2026-11-09',
    date_fin: '2026-11-11',
    nombre_jours: 3,
    motif: 'Mariage de son frère à Tizi Ouzou',
    statut: 'VALIDE',
    valide_par_nom: 'Nadia Benali (RH)',
    created_at: '2026-11-04T10:00:00Z'
  },
  {
    id: 'cng-002',
    employe_id: 'emp-004',
    employe_nom: 'Rabah Benali',
    employe_matricule: 'EMP-BTP-2024-004',
    chantier_id: 'cht-001',
    type: 'MALADIE_CNAS',
    date_debut: '2026-11-02',
    date_fin: '2026-11-04',
    nombre_jours: 3,
    motif: 'Arrêt de travail visé par médecin conventionné CNAS',
    certificat_medical_ref: 'CNAS-AT-16-2026/891',
    statut: 'VALIDE',
    valide_par_nom: 'Nadia Benali (RH)',
    created_at: '2026-11-02T08:30:00Z'
  },
  {
    id: 'cng-003',
    employe_id: 'emp-006',
    employe_nom: 'Ali Slimani',
    employe_matricule: 'EMP-BTP-2024-006',
    chantier_id: 'cht-001',
    type: 'CONGE_PAYE',
    date_debut: '2026-11-15',
    date_fin: '2026-11-20',
    nombre_jours: 6,
    motif: 'Reliquat de congé annuel',
    statut: 'EN_ATTENTE',
    created_at: '2026-11-06T14:00:00Z'
  }
];

// Date du jour pour démonstration
const TODAY_STR = new Date().toISOString().split('T')[0];

// ==========================================
// POINTAGES JOURNALIERS DES CHANTIERS
// ==========================================

export const DEMO_POINTAGES: PointageLigne[] = [
  // Chantier Chéraga (cht-001) - Aujourd'hui
  {
    id: 'ptg-001',
    chantier_id: 'cht-001',
    employe_id: 'emp-001',
    employe_nom: 'Ahmed Zerrouki',
    employe_matricule: 'EMP-BTP-2024-001',
    employe_categorie: 'CHEF_EQUIPE',
    date: TODAY_STR,
    statut: 'PRESENT',
    heure_arrivee: '07:45',
    heure_depart: '16:30',
    heures_travaillees: 8,
    observations: 'Prise de poste anticipée - Briefing sécurité',
    saisi_par_id: 'user-ct',
    saisi_par_nom: 'Sofiane Belkacem',
    verrouille: false,
    updated_at: `${TODAY_STR}T07:50:00Z`
  },
  {
    id: 'ptg-002',
    chantier_id: 'cht-001',
    employe_id: 'emp-002',
    employe_nom: 'Mourad Kaci',
    employe_matricule: 'EMP-BTP-2024-002',
    employe_categorie: 'MACON',
    date: TODAY_STR,
    statut: 'PRESENT',
    heure_arrivee: '07:55',
    heure_depart: '16:30',
    heures_travaillees: 8,
    observations: 'Poste maçonnerie bloc B',
    saisi_par_id: 'user-ct',
    saisi_par_nom: 'Sofiane Belkacem',
    verrouille: false,
    updated_at: `${TODAY_STR}T07:56:00Z`
  },
  {
    id: 'ptg-003',
    chantier_id: 'cht-001',
    employe_id: 'emp-003',
    employe_nom: 'Brahim Bouzid',
    employe_matricule: 'EMP-BTP-2024-003',
    employe_categorie: 'FERRAILLEUR',
    date: TODAY_STR,
    statut: 'RETARD',
    heure_arrivee: '08:35',
    heure_depart: '16:30',
    minutes_retard: 35,
    heures_travaillees: 7.5,
    observations: 'Embouteillage autoroute de Zéralda',
    saisi_par_id: 'user-ct',
    saisi_par_nom: 'Sofiane Belkacem',
    verrouille: false,
    updated_at: `${TODAY_STR}T08:36:00Z`
  },
  {
    id: 'ptg-004',
    chantier_id: 'cht-001',
    employe_id: 'emp-004',
    employe_nom: 'Rabah Benali',
    employe_matricule: 'EMP-BTP-2024-004',
    employe_categorie: 'COFFREUR',
    date: TODAY_STR,
    statut: 'PRESENT',
    heure_arrivee: '07:50',
    heure_depart: '16:30',
    heures_travaillees: 8,
    observations: 'Coffrage poteaux R+6',
    saisi_par_id: 'user-ct',
    saisi_par_nom: 'Sofiane Belkacem',
    verrouille: false,
    updated_at: `${TODAY_STR}T07:55:00Z`
  },
  {
    id: 'ptg-005',
    chantier_id: 'cht-001',
    employe_id: 'emp-005',
    employe_nom: 'Khaled Meziani',
    employe_matricule: 'EMP-BTP-2024-005',
    employe_categorie: 'CONDUCTEUR_ENGIN',
    date: TODAY_STR,
    statut: 'PRESENT',
    heure_arrivee: '07:40',
    heure_depart: '16:30',
    heures_travaillees: 8,
    observations: 'Contrôle quotidien de sécurité grue à tour',
    saisi_par_id: 'user-ct',
    saisi_par_nom: 'Sofiane Belkacem',
    verrouille: false,
    updated_at: `${TODAY_STR}T07:42:00Z`
  },
  {
    id: 'ptg-006',
    chantier_id: 'cht-001',
    employe_id: 'emp-006',
    employe_nom: 'Ali Slimani',
    employe_matricule: 'EMP-BTP-2024-006',
    employe_categorie: 'MANOEUVRE',
    date: TODAY_STR,
    statut: 'ABSENT_INJUSTIFIE',
    heures_travaillees: 0,
    observations: 'Non présenté sans justificatif',
    saisi_par_id: 'user-ct',
    saisi_par_nom: 'Sofiane Belkacem',
    verrouille: false,
    updated_at: `${TODAY_STR}T08:15:00Z`
  },
  {
    id: 'ptg-007',
    chantier_id: 'cht-001',
    employe_id: 'emp-007',
    employe_nom: 'Yassine Cherif',
    employe_matricule: 'EMP-BTP-2024-007',
    employe_categorie: 'ELECTRICIEN',
    date: TODAY_STR,
    statut: 'PRESENT',
    heure_arrivee: '07:58',
    heure_depart: '16:30',
    heures_travaillees: 8,
    observations: 'Passage de gaines électriques R+3',
    saisi_par_id: 'user-ct',
    saisi_par_nom: 'Sofiane Belkacem',
    verrouille: false,
    updated_at: `${TODAY_STR}T08:00:00Z`
  },

  // Chantier Oran (cht-002) - Aujourd'hui
  {
    id: 'ptg-008',
    chantier_id: 'cht-002',
    employe_id: 'emp-008',
    employe_nom: 'Reda Hamidi',
    employe_matricule: 'EMP-BTP-2023-008',
    employe_categorie: 'FERRAILLEUR',
    date: TODAY_STR,
    statut: 'PRESENT',
    heure_arrivee: '07:50',
    heure_depart: '16:30',
    heures_travaillees: 8,
    saisi_par_id: 'user-ct',
    saisi_par_nom: 'Conducteur Travaux Oran',
    verrouille: false,
    updated_at: `${TODAY_STR}T07:55:00Z`
  },
  {
    id: 'ptg-009',
    chantier_id: 'cht-002',
    employe_id: 'emp-009',
    employe_nom: 'Mustapha Taleb',
    employe_matricule: 'EMP-BTP-2023-009',
    employe_categorie: 'COFFREUR',
    date: TODAY_STR,
    statut: 'PRESENT',
    heure_arrivee: '07:55',
    heure_depart: '16:30',
    heures_travaillees: 8,
    saisi_par_id: 'user-ct',
    saisi_par_nom: 'Conducteur Travaux Oran',
    verrouille: false,
    updated_at: `${TODAY_STR}T07:56:00Z`
  },
  {
    id: 'ptg-010',
    chantier_id: 'cht-002',
    employe_id: 'emp-010',
    employe_nom: 'Nabil Belhadj',
    employe_matricule: 'EMP-BTP-2023-010',
    employe_categorie: 'CONDUCTEUR_ENGIN',
    date: TODAY_STR,
    statut: 'PRESENT',
    heure_arrivee: '07:45',
    heure_depart: '16:30',
    heures_travaillees: 8,
    saisi_par_id: 'user-ct',
    saisi_par_nom: 'Conducteur Travaux Oran',
    verrouille: false,
    updated_at: `${TODAY_STR}T07:50:00Z`
  }
];

// ==========================================
// DEMANDES D'AUTORISATION POST-CLÔTURE DU POINTAGE
// ==========================================

export const DEMO_DEMANDES_DEROGATION: DemandeDerogationPointage[] = [
  {
    id: 'drg-001',
    pointage_id: 'ptg-006',
    chantier_id: 'cht-001',
    chantier_nom: 'Résidence Les Pins - Chéraga',
    date_pointage: TODAY_STR,
    employe_id: 'emp-006',
    employe_nom: 'Ali Slimani',
    employe_matricule: 'EMP-BTP-2024-006',
    demandeur_id: 'user-ct',
    demandeur_nom: 'Sofiane Belkacem',
    demandeur_role: 'Conducteur de Travaux',
    statut_actuel: 'ABSENT_INJUSTIFIE',
    statut_demande: 'RETARD',
    heure_arrivee_demandee: '08:40',
    motif_demande: 'L’ouvrier est arrivé à 08h40 suite à une panne de transport de nuit sur la ligne M’Sila-Alger. Présent sur poste ferraillage.',
    statut_demande_approbation: 'EN_ATTENTE',
    created_at: `${TODAY_STR}T09:15:00Z`
  },
  {
    id: 'drg-002',
    pointage_id: 'ptg-prev-001',
    chantier_id: 'cht-001',
    chantier_nom: 'Résidence Les Pins - Chéraga',
    date_pointage: '2026-11-05',
    employe_id: 'emp-003',
    employe_nom: 'Brahim Bouzid',
    employe_matricule: 'EMP-BTP-2024-003',
    demandeur_id: 'user-ct',
    demandeur_nom: 'Sofiane Belkacem',
    demandeur_role: 'Conducteur de Travaux',
    statut_actuel: 'ABSENT_INJUSTIFIE',
    statut_demande: 'PRESENT',
    heure_arrivee_demandee: '08:00',
    motif_demande: 'Omission de saisie lors de la relève d’équipe de 08h00. Était présent sur le coulage radier confirmé par chef d’équipe.',
    statut_demande_approbation: 'VALIDEE',
    traite_par_id: 'user-rh',
    traite_par_nom: 'Nadia Benali (RH)',
    date_traitement: '2026-11-05T11:30:00Z',
    created_at: '2026-11-05T09:40:00Z'
  }
];

// ==========================================
// FOURNISSEURS AGRÉÉS ALGÉRIE (ACHATS & APPROVISIONNEMENTS)
// ==========================================
export const DEMO_FOURNISSEURS: Fournisseur[] = [
  {
    id: 'fourn-001',
    entreprise_id: 'ent-001',
    nom_fournisseur: 'Groupe Industriel SIDER El Hadjar Annaba (SPA)',
    forme_juridique: 'SPA',
    categorie: 'ACIER_ARMATURES',
    nif: '000023010000045',
    rc: '23/00-0012345B01',
    nis: '000023010000045',
    adresse: 'Zone Industrielle Sidi Amar, BP 200, El Hadjar',
    wilaya: 'Annaba (23)',
    telephone: '+213 (0) 38 72 10 00',
    email: 'commercial@sider-elhadjar.dz',
    contact_commercial: 'M. Hocine Bensaïd (Direction Commerciale)',
    delai_livraison_moyen_jours: 5,
    conditions_paiement: 'Virement bancaire 30 jours fin de mois',
    rib: '001 00600 0300123456 22',
    banque_nom: 'Banque Nationale d’Algérie (BNA)',
    agence_banque: 'Agence Annaba El Hadjar (Code 600)',
    actif: true,
    note_qualite: 4.8,
    created_at: '2023-02-10T08:00:00Z'
  },
  {
    id: 'fourn-002',
    entreprise_id: 'ent-001',
    nom_fournisseur: 'GICA - Société des Ciments de Meftah (SPA)',
    forme_juridique: 'SPA',
    categorie: 'CIMENT_BETON',
    nif: '000009010000078',
    rc: '09/00-0045678B09',
    nis: '000009010000078',
    adresse: 'Route Nationale N°29, Meftah',
    wilaya: 'Blida (09)',
    telephone: '+213 (0) 25 43 20 15',
    email: 'ventes@ciments-meftah.dz',
    contact_commercial: 'Mme Meriem Zerrouki',
    delai_livraison_moyen_jours: 2,
    conditions_paiement: 'Paiement à la commande par chèque de banque certifié',
    rib: '002 00410 0400987654 33',
    banque_nom: 'Banque Extérieure d’Algérie (BEA)',
    agence_banque: 'Agence Blida Centre (Code 410)',
    actif: true,
    note_qualite: 4.9,
    created_at: '2023-02-15T09:30:00Z'
  },
  {
    id: 'fourn-003',
    entreprise_id: 'ent-001',
    nom_fournisseur: 'Société des Carrières d’Alger - SCA (SPA)',
    forme_juridique: 'SPA',
    categorie: 'MATERIAUX_GROS_OEUVRE',
    nif: '000216010000032',
    rc: '16/00-0089123B16',
    nis: '000216010000032',
    adresse: 'Carrière de Jaafri, Route de Rouiba',
    wilaya: 'Alger (16)',
    telephone: '+213 (0) 23 85 40 10',
    email: 'commandes@sca-alger.dz',
    contact_commercial: 'M. Samir Khelifa',
    delai_livraison_moyen_jours: 1,
    conditions_paiement: 'Paiement à 15 jours sur situation validée',
    rib: '004 00120 0200554433 11',
    banque_nom: 'Crédit Populaire d’Algérie (CPA)',
    agence_banque: 'Agence Rouiba (Code 120)',
    actif: true,
    note_qualite: 4.6,
    created_at: '2023-03-01T10:00:00Z'
  },
  {
    id: 'fourn-004',
    entreprise_id: 'ent-001',
    nom_fournisseur: 'BTP Algérie Matériaux & Quincaillerie Industrielle (SARL)',
    forme_juridique: 'SARL',
    categorie: 'OUTILLAGE_EPI',
    nif: '001516098765432',
    rc: '16/00-0065432B16',
    nis: '001516098765432',
    adresse: 'Zone d’Activité Amara, Lot 18, Chéraga',
    wilaya: 'Alger (16)',
    telephone: '+213 (0) 23 36 12 45',
    email: 'contact@btp-algerie-materiaux.com',
    contact_commercial: 'M. Mourad Belahcene',
    delai_livraison_moyen_jours: 2,
    conditions_paiement: 'Traite bancaire 45 jours',
    rib: '005 00210 0100778899 44',
    banque_nom: 'Banque du Développement Local (BDL)',
    agence_banque: 'Agence Chéraga (Code 210)',
    actif: true,
    note_qualite: 4.5,
    created_at: '2023-04-12T11:00:00Z'
  },
  {
    id: 'fourn-005',
    entreprise_id: 'ent-001',
    nom_fournisseur: 'Câbleries Algériennes - CABEL (SPA)',
    forme_juridique: 'SPA',
    categorie: 'ELECTRICITE_PLOMBERIE',
    nif: '000016010000099',
    rc: '16/00-0033221B16',
    nis: '000016010000099',
    adresse: 'Zone Industrielle Oued Smar, Alger',
    wilaya: 'Alger (16)',
    telephone: '+213 (0) 21 51 60 70',
    email: 'distribution@cabel.dz',
    contact_commercial: 'M. Farouk Hamidi',
    delai_livraison_moyen_jours: 4,
    conditions_paiement: 'Virement bancaire 30 jours',
    rib: '003 00150 0500112233 55',
    banque_nom: 'Banque de l’Agriculture et du Développement Rural (BADR)',
    agence_banque: 'Agence Oued Smar (Code 150)',
    actif: true,
    note_qualite: 4.7,
    created_at: '2023-05-18T08:45:00Z'
  },
  {
    id: 'fourn-006',
    entreprise_id: 'ent-001',
    nom_fournisseur: 'SARL BTP Ouest Location & Grues',
    forme_juridique: 'SARL',
    categorie: 'LOCATION_ENGINS',
    nif: '001931012345678',
    rc: '31/00-0098765B31',
    nis: '001931012345678',
    adresse: 'Zone Industrielle d’Es Sénia, Oran',
    wilaya: 'Oran (31)',
    telephone: '+213 (0) 41 40 55 60',
    email: 'location@btp-ouest.dz',
    contact_commercial: 'M. Abdelkader Benyamina',
    delai_livraison_moyen_jours: 3,
    conditions_paiement: 'Virement 50% commande / 50% fin prestation',
    rib: '001 00320 0600998877 66',
    banque_nom: 'Banque Nationale d’Algérie (BNA)',
    agence_banque: 'Agence Oran Es Sénia (Code 320)',
    actif: true,
    note_qualite: 4.4,
    created_at: '2023-06-20T14:00:00Z'
  }
];

// ==========================================
// DEMANDES D'ACHAT (CIRCUIT DIRECT CHANTIER)
// ==========================================
export const DEMO_DEMANDES_ACHAT: DemandeAchat[] = [
  {
    id: 'da-001',
    numero_da: 'DA-2026-CHT01-0042',
    chantier_id: 'cht-001',
    chantier_nom: 'Résidence Les Pins - Chéraga',
    demandeur_id: 'user-ct',
    demandeur_nom: 'Sofiane Belkacem',
    demandeur_role: 'Conducteur de Travaux',
    date_demande: '2026-11-07',
    designation_produit: 'Acier Haute Adhérence FeE500 Diamètre 14mm & 16mm (Barres 12m)',
    famille_article: 'ACIER_ARMATURES',
    quantite_demandee: 15,
    unite_mesure: 'Tonne',
    niveau_urgence: 'URGENT',
    justification: 'Ferraillage des poteaux et voiles béton armé R+2 (Tranche 1B). Coulage programmé le 15/11. Risque d’arrêt chantier immédiat si non approvisionné.',
    date_besoin_chantier: '2026-11-14',
    estimation_budget_dzd: 1950000,
    statut: 'EN_ATTENTE_COMPTABILITE',
    historique_validations: [
      {
        id: 'hist-da-101',
        statut_precedent: 'BROUILLON',
        nouveau_statut: 'EN_ATTENTE_COMPTABILITE',
        auteur_id: 'user-ct',
        auteur_nom: 'Sofiane Belkacem',
        auteur_role: 'Conducteur de Travaux',
        date: '2026-11-07T08:30:00Z',
        commentaire: 'Émission de la demande suite aux plans de ferraillage validés par BET et CTC.'
      }
    ],
    created_at: '2026-11-07T08:30:00Z',
    updated_at: '2026-11-07T08:30:00Z'
  },
  {
    id: 'da-002',
    numero_da: 'DA-2026-CHT01-0038',
    chantier_id: 'cht-001',
    chantier_nom: 'Résidence Les Pins - Chéraga',
    demandeur_id: 'user-ct',
    demandeur_nom: 'Sofiane Belkacem',
    demandeur_role: 'Conducteur de Travaux',
    date_demande: '2026-11-04',
    designation_produit: 'Ciment Portland Composé CEM II/A-L 42.5N (Sacs de 50kg)',
    famille_article: 'CIMENT_BETON',
    quantite_demandee: 800,
    unite_mesure: 'Sac (50kg)',
    niveau_urgence: 'NORMAL',
    justification: 'Travaux de maçonnerie, enduits intérieurs et petits bétons de calage au magasin du chantier.',
    date_besoin_chantier: '2026-11-18',
    estimation_budget_dzd: 720000,
    statut: 'VALIDEE',
    historique_validations: [
      {
        id: 'hist-da-201',
        statut_precedent: 'BROUILLON',
        nouveau_statut: 'EN_ATTENTE_COMPTABILITE',
        auteur_id: 'user-ct',
        auteur_nom: 'Sofiane Belkacem',
        auteur_role: 'Conducteur de Travaux',
        date: '2026-11-04T09:00:00Z',
        commentaire: 'Demande standard de réapprovisionnement du magasin chantier.'
      },
      {
        id: 'hist-da-202',
        statut_precedent: 'EN_ATTENTE_COMPTABILITE',
        nouveau_statut: 'VALIDEE',
        auteur_id: 'user-compta',
        auteur_nom: 'Karim Meziane',
        auteur_role: 'Responsable Comptabilité & Fiscalité',
        date: '2026-11-05T14:15:00Z',
        commentaire: 'Vérification budgétaire conforme. Imputation sur ligne Matériaux Gros Œuvre Chéraga.'
      }
    ],
    created_at: '2026-11-04T09:00:00Z',
    updated_at: '2026-11-05T14:15:00Z'
  },
  {
    id: 'da-003',
    numero_da: 'DA-2026-CHT02-0029',
    chantier_id: 'cht-002',
    chantier_nom: 'Tour Bahia - Front de Mer',
    demandeur_id: 'user-metreur',
    demandeur_nom: 'Salim Hadj',
    demandeur_role: 'Métreur Vérificateur',
    date_demande: '2026-10-28',
    designation_produit: 'Gravier calcaire concassé 15/25 lavé pour béton armé B25',
    famille_article: 'MATERIAUX_GROS_OEUVRE',
    quantite_demandee: 120,
    unite_mesure: 'm³',
    niveau_urgence: 'NORMAL',
    justification: 'Centrale à béton de chantier pour coulage plancher haut R+8.',
    date_besoin_chantier: '2026-11-10',
    estimation_budget_dzd: 288000,
    statut: 'COMMANDEE',
    bon_commande_id: 'bc-001',
    bon_commande_ref: 'BC-2026-0019',
    historique_validations: [
      {
        id: 'hist-da-301',
        statut_precedent: 'BROUILLON',
        nouveau_statut: 'EN_ATTENTE_COMPTABILITE',
        auteur_id: 'user-metreur',
        auteur_nom: 'Salim Hadj',
        auteur_role: 'Métreur Vérificateur',
        date: '2026-10-28T10:00:00Z',
        commentaire: 'Calcul quantitatif conforme au métré d’exécution R+8.'
      },
      {
        id: 'hist-da-302',
        statut_precedent: 'EN_ATTENTE_COMPTABILITE',
        nouveau_statut: 'VALIDEE',
        auteur_id: 'user-compta',
        auteur_nom: 'Karim Meziane',
        auteur_role: 'Responsable Comptabilité & Fiscalité',
        date: '2026-10-29T11:20:00Z',
        commentaire: 'Contrôle budgétaire validé pour le projet Tour Bahia.'
      },
      {
        id: 'hist-da-303',
        statut_precedent: 'VALIDEE',
        nouveau_statut: 'COMMANDEE',
        auteur_id: 'user-appro',
        auteur_nom: 'Tariq Mansouri',
        auteur_role: 'Responsable Approvisionnements',
        date: '2026-10-31T15:40:00Z',
        commentaire: 'Fournisseur SCA retenu après consultation. Bon de commande BC-2026-0019 émis.'
      }
    ],
    created_at: '2026-10-28T10:00:00Z',
    updated_at: '2026-10-31T15:40:00Z'
  },
  {
    id: 'da-004',
    numero_da: 'DA-2026-CHT01-0025',
    chantier_id: 'cht-001',
    chantier_nom: 'Résidence Les Pins - Chéraga',
    demandeur_id: 'user-ct',
    demandeur_nom: 'Sofiane Belkacem',
    demandeur_role: 'Conducteur de Travaux',
    date_demande: '2026-10-15',
    designation_produit: 'Bastaings bois sapin rouge 63x175 (Longueurs 4.00m)',
    famille_article: 'OUTILLAGE_EPI',
    quantite_demandee: 15,
    unite_mesure: 'm³',
    niveau_urgence: 'NORMAL',
    justification: 'Renouvellement des bois de coffrage et platelage de sécurité pour les cages d’escaliers.',
    date_besoin_chantier: '2026-10-25',
    estimation_budget_dzd: 825000,
    statut: 'RECEPTIONNEE',
    bon_commande_id: 'bc-002',
    bon_commande_ref: 'BC-2026-0018',
    historique_validations: [
      {
        id: 'hist-da-401',
        statut_precedent: 'BROUILLON',
        nouveau_statut: 'EN_ATTENTE_COMPTABILITE',
        auteur_id: 'user-ct',
        auteur_nom: 'Sofiane Belkacem',
        auteur_role: 'Conducteur de Travaux',
        date: '2026-10-15T08:00:00Z',
        commentaire: 'Demande pour coffrage R+1.'
      },
      {
        id: 'hist-da-402',
        statut_precedent: 'EN_ATTENTE_COMPTABILITE',
        nouveau_statut: 'VALIDEE',
        auteur_id: 'user-compta',
        auteur_nom: 'Karim Meziane',
        auteur_role: 'Responsable Comptabilité & Fiscalité',
        date: '2026-10-16T10:30:00Z',
        commentaire: 'Budget validé.'
      },
      {
        id: 'hist-da-403',
        statut_precedent: 'VALIDEE',
        nouveau_statut: 'COMMANDEE',
        auteur_id: 'user-appro',
        auteur_nom: 'Tariq Mansouri',
        auteur_role: 'Responsable Approvisionnements',
        date: '2026-10-17T14:00:00Z',
        commentaire: 'Commande passée auprès de BTP Algérie SARL.'
      },
      {
        id: 'hist-da-404',
        statut_precedent: 'COMMANDEE',
        nouveau_statut: 'RECEPTIONNEE',
        auteur_id: 'user-magasinier',
        auteur_nom: 'Yacine Mansouri',
        auteur_role: 'Magasinier (Chantier)',
        date: '2026-10-22T11:15:00Z',
        commentaire: 'Réception conforme au magasin chantier de Chéraga. BR-2026-CHT01-0008 émis.'
      }
    ],
    created_at: '2026-10-15T08:00:00Z',
    updated_at: '2026-10-22T11:15:00Z'
  },
  {
    id: 'da-005',
    numero_da: 'DA-2026-CHT03-0011',
    chantier_id: 'cht-003',
    chantier_nom: 'Résidence Cirta - Constantine',
    demandeur_id: 'user-ct',
    demandeur_nom: 'Sofiane Belkacem',
    demandeur_role: 'Conducteur de Travaux',
    date_demande: '2026-11-02',
    designation_produit: 'Gasoil Extra pour engins de terrassement (Pelles & Dumpers)',
    famille_article: 'MATERIAUX_GROS_OEUVRE',
    quantite_demandee: 5000,
    unite_mesure: 'Litre',
    niveau_urgence: 'URGENT',
    justification: 'Alimentation de la cuve mobile de chantier pour double poste terrassement.',
    date_besoin_chantier: '2026-11-08',
    estimation_budget_dzd: 145000,
    statut: 'REFUSEE',
    historique_validations: [
      {
        id: 'hist-da-501',
        statut_precedent: 'BROUILLON',
        nouveau_statut: 'EN_ATTENTE_COMPTABILITE',
        auteur_id: 'user-ct',
        auteur_nom: 'Sofiane Belkacem',
        auteur_role: 'Conducteur de Travaux',
        date: '2026-11-02T08:45:00Z',
        commentaire: 'Demande pour cuve chantier Constantine.'
      },
      {
        id: 'hist-da-502',
        statut_precedent: 'EN_ATTENTE_COMPTABILITE',
        nouveau_statut: 'REFUSEE',
        auteur_id: 'user-compta',
        auteur_nom: 'Karim Meziane',
        auteur_role: 'Responsable Comptabilité & Fiscalité',
        date: '2026-11-03T16:20:00Z',
        commentaire: 'Refus : Dépassement de la provision mensuelle de carburant sans avenant BET. Demande à réajuster à 2 500 L ou justifier auprès de la Direction.'
      }
    ],
    created_at: '2026-11-02T08:45:00Z',
    updated_at: '2026-11-03T16:20:00Z'
  }
];

// ==========================================
// TABLEAU COMPARATIF DES OFFRES FOURNISSEURS
// ==========================================
export const DEMO_COMPARAISONS_OFFRES: ComparaisonOffre[] = [
  // Offres pour DA-002 (Ciment CEM II 42.5N)
  {
    id: 'off-001',
    demande_achat_id: 'da-002',
    fournisseur_id: 'fourn-002',
    fournisseur_nom: 'GICA - Société des Ciments de Meftah (SPA)',
    prix_unitaire_ht_dzd: 850,
    tva_pct: 19,
    delai_livraison_jours: 2,
    frais_transport_dzd: 35000,
    modalite_paiement: 'Chèque certifié à l’enlèvement',
    retenu: true,
    observations: 'Producteur public direct certifié ISO 9001. Garantie de résistance mécanique optimale.'
  },
  {
    id: 'off-002',
    demande_achat_id: 'da-002',
    fournisseur_id: 'fourn-004',
    fournisseur_nom: 'BTP Algérie Matériaux & Quincaillerie Industrielle (SARL)',
    prix_unitaire_ht_dzd: 910,
    tva_pct: 19,
    delai_livraison_jours: 1,
    frais_transport_dzd: 20000,
    modalite_paiement: 'Traite 30 jours',
    retenu: false,
    observations: 'Distributeur local plus cher au sac malgré transport inférieur.'
  },

  // Offres pour DA-003 (Gravier concassé 15/25)
  {
    id: 'off-003',
    demande_achat_id: 'da-003',
    fournisseur_id: 'fourn-003',
    fournisseur_nom: 'Société des Carrières d’Alger - SCA (SPA)',
    prix_unitaire_ht_dzd: 2200,
    tva_pct: 19,
    delai_livraison_jours: 1,
    frais_transport_dzd: 40000,
    modalite_paiement: 'Paiement 15 jours sur situation',
    retenu: true,
    observations: 'Agrégats lavés conformes aux spécifications BET béton B25. Flotte de camions bennes 8x4 disponible.'
  }
];

// ==========================================
// BONS DE COMMANDE (LIVRAISON DIRECTE CHANTIER)
// ==========================================
export const DEMO_BONS_COMMANDE: BonCommande[] = [
  {
    id: 'bc-001',
    numero_bc: 'BC-2026-0019',
    demande_achat_id: 'da-003',
    demande_achat_ref: 'DA-2026-CHT02-0029',
    fournisseur_id: 'fourn-003',
    fournisseur_nom: 'Société des Carrières d’Alger - SCA (SPA)',
    fournisseur_nif: '000216010000032',
    fournisseur_rc: '16/00-0089123B16',
    fournisseur_telephone: '+213 (0) 23 85 40 10',
    chantier_destinataire_id: 'cht-002',
    chantier_destinataire_nom: 'Tour Bahia - Front de Mer',
    adresse_livraison: 'Magasin Chantier Tour Bahia, Boulevard de l’ALN, Front de Mer, Oran (31)',
    contact_reception_magasinier: 'Magasinier Chantier Oran (Tél: +213 550 44 55 66)',
    date_commande: '2026-10-31',
    date_livraison_prevue: '2026-11-10',
    designation_marchandise: 'Gravier calcaire concassé 15/25 lavé pour béton armé B25',
    quantite_commandee: 120,
    unite_mesure: 'm³',
    prix_unitaire_ht_dzd: 2200,
    montant_total_ht_dzd: 264000,
    taux_tva_pct: 19,
    montant_tva_dzd: 50160,
    montant_total_ttc_dzd: 314160,
    delai_paiement: 'Virement 15 jours après constat de réception magasinier',
    statut: 'EN_LIVRAISON',
    etabli_par_id: 'user-appro',
    etabli_par_nom: 'Tariq Mansouri (Approvisionnements)',
    created_at: '2026-10-31T15:40:00Z'
  },
  {
    id: 'bc-002',
    numero_bc: 'BC-2026-0018',
    demande_achat_id: 'da-004',
    demande_achat_ref: 'DA-2026-CHT01-0025',
    fournisseur_id: 'fourn-004',
    fournisseur_nom: 'BTP Algérie Matériaux & Quincaillerie Industrielle (SARL)',
    fournisseur_nif: '001516098765432',
    fournisseur_rc: '16/00-0065432B16',
    fournisseur_telephone: '+213 (0) 23 36 12 45',
    chantier_destinataire_id: 'cht-001',
    chantier_destinataire_nom: 'Résidence Les Pins - Chéraga',
    adresse_livraison: 'Magasin Chantier Résidence Les Pins, Route de Bouchaoui, Chéraga, Alger (16)',
    contact_reception_magasinier: 'Yacine Mansouri (Magasinier Chéraga, Tél: +213 550 99 88 77)',
    date_commande: '2026-10-17',
    date_livraison_prevue: '2026-10-22',
    designation_marchandise: 'Bastaings bois sapin rouge 63x175 (Longueurs 4.00m)',
    quantite_commandee: 15,
    unite_mesure: 'm³',
    prix_unitaire_ht_dzd: 55000,
    montant_total_ht_dzd: 825000,
    taux_tva_pct: 19,
    montant_tva_dzd: 156750,
    montant_total_ttc_dzd: 981750,
    delai_paiement: 'Traite bancaire 45 jours après visa BR',
    statut: 'LIVRE_TOTAL',
    etabli_par_id: 'user-appro',
    etabli_par_nom: 'Tariq Mansouri (Approvisionnements)',
    created_at: '2026-10-17T14:00:00Z'
  }
];

// ==========================================
// RÉCEPTIONS AUX MAGASINS DES CHANTIERS (BL / BR)
// ==========================================
export const DEMO_BONS_LIVRAISON_RECEPTION: BonLivraisonReception[] = [
  {
    id: 'br-001',
    numero_bl_fournisseur: 'BL-BTPA-88412',
    numero_br_interne: 'BR-2026-CHT01-0008',
    bon_commande_id: 'bc-002',
    bon_commande_ref: 'BC-2026-0018',
    chantier_id: 'cht-001',
    chantier_nom: 'Résidence Les Pins - Chéraga',
    magasinier_id: 'user-magasinier',
    magasinier_nom: 'Yacine Mansouri',
    fournisseur_nom: 'BTP Algérie Matériaux & Quincaillerie Industrielle (SARL)',
    date_reception: '2026-10-22',
    quantite_recue: 15,
    unite_mesure: 'm³',
    quantite_conforme: 15,
    quantite_rejetee: 0,
    conformite_qualite: 'CONFORME',
    motif_rejet_ou_reserves: 'Bois de premier choix conforme aux fiches techniques, absence de voilement ou fentes excessives.',
    numero_plaque_camion: '02341-119-16',
    nom_chauffeur: 'Rachid Benkhedda',
    visa_magasinier: true,
    statut: 'RECEPTIONNE_CONFORME',
    created_at: '2026-10-22T11:15:00Z'
  }
];

// ==========================================
// FACTURES FOURNISSEURS (APPROBATION COMPTABLE)
// ==========================================
export const DEMO_FACTURES_FOURNISSEURS: FactureFournisseur[] = [
  {
    id: 'fac-001',
    numero_facture: 'FAC-BTPA-2026-0941',
    bon_commande_id: 'bc-002',
    bon_commande_ref: 'BC-2026-0018',
    bon_reception_ref: 'BR-2026-CHT01-0008',
    fournisseur_id: 'fourn-004',
    fournisseur_nom: 'BTP Algérie Matériaux & Quincaillerie Industrielle (SARL)',
    fournisseur_nif: '001516098765432',
    chantier_id: 'cht-001',
    chantier_nom: 'Résidence Les Pins - Chéraga',
    date_facture: '2026-10-24',
    date_echeance: '2026-12-08',
    montant_ht_dzd: 825000,
    montant_tva_dzd: 156750,
    montant_ttc_dzd: 981750,
    statut_comptable: 'BON_A_PAYER',
    mode_paiement: 'VIREMENT_BANCAIRE',
    compte_bancaire_societe_id: 'cpt-001',
    reference_virement: 'VIR-BNA-2026-1102',
    created_at: '2026-10-25T09:00:00Z'
  }
];

// ==========================================
// STOCK & MAGASIN (100% INDÉPENDANT PAR CHANTIER)
// ==========================================

export const DEMO_ARTICLES_STOCK: ArticleStock[] = [
  // Chantier 1 : Résidence Les Pins - Chéraga
  {
    id: 'art-001',
    entreprise_id: 'ent-001',
    chantier_id: 'cht-001',
    chantier_nom: 'Résidence Les Pins - Chéraga',
    code_article: 'MAT-ACIER-16',
    designation: 'Acier Haute Adhérence FeE500 Diamètre 16mm (Barres 12m)',
    famille: 'ACIER_ARMATURES',
    unite_mesure: 'Tonne',
    quantite_stock: 38.5,
    seuil_alerte_minimum: 10.0,
    prix_unitaire_moyen_dzd: 130000,
    emplacement_magasin: 'Zone Stockage A - Alvéole Ferraillage 2',
    updated_at: '2026-11-07T10:00:00Z'
  },
  {
    id: 'art-002',
    entreprise_id: 'ent-001',
    chantier_id: 'cht-001',
    chantier_nom: 'Résidence Les Pins - Chéraga',
    code_article: 'MAT-CIMENT-42',
    designation: 'Ciment Portland Composé CEM II/A-L 42.5N (Sacs 50kg)',
    famille: 'CIMENT_BETON',
    unite_mesure: 'Sac (50kg)',
    quantite_stock: 450,
    seuil_alerte_minimum: 200,
    prix_unitaire_moyen_dzd: 900,
    emplacement_magasin: 'Magasin Couvert B - Palette Ciment',
    updated_at: '2026-11-06T14:30:00Z'
  },
  {
    id: 'art-003',
    entreprise_id: 'ent-001',
    chantier_id: 'cht-001',
    chantier_nom: 'Résidence Les Pins - Chéraga',
    code_article: 'MAT-BOIS-BAST',
    designation: 'Bastaings bois sapin rouge 63x175 (Long. 4.00m)',
    famille: 'MATERIAUX_GROS_OEUVRE',
    unite_mesure: 'm³',
    quantite_stock: 12.0,
    seuil_alerte_minimum: 5.0,
    prix_unitaire_moyen_dzd: 55000,
    emplacement_magasin: 'Parc Bois Extérieur - Zone 1',
    updated_at: '2026-10-22T11:15:00Z'
  },
  {
    id: 'art-004',
    entreprise_id: 'ent-001',
    chantier_id: 'cht-001',
    chantier_nom: 'Résidence Les Pins - Chéraga',
    code_article: 'MAT-GRAV-1525',
    designation: 'Gravier calcaire concassé 15/25 lavé',
    famille: 'MATERIAUX_GROS_OEUVRE',
    unite_mesure: 'm³',
    quantite_stock: 85.0,
    seuil_alerte_minimum: 30.0,
    prix_unitaire_moyen_dzd: 2400,
    emplacement_magasin: 'Aire de Stockage Vrac C',
    updated_at: '2026-11-05T09:00:00Z'
  },

  // Chantier 2 : Tour Bahia - Oran
  {
    id: 'art-005',
    entreprise_id: 'ent-001',
    chantier_id: 'cht-002',
    chantier_nom: 'Tour Bahia - Front de Mer',
    code_article: 'MAT-CIMENT-ORN',
    designation: 'Ciment CPJ CEM II 32.5 (Sacs 50kg)',
    famille: 'CIMENT_BETON',
    unite_mesure: 'Sac (50kg)',
    quantite_stock: 320,
    seuil_alerte_minimum: 150,
    prix_unitaire_moyen_dzd: 850,
    emplacement_magasin: 'Magasin Principal Tour Bahia',
    updated_at: '2026-11-04T11:00:00Z'
  },
  {
    id: 'art-006',
    entreprise_id: 'ent-001',
    chantier_id: 'cht-002',
    chantier_nom: 'Tour Bahia - Front de Mer',
    code_article: 'MAT-GRAV-ORN',
    designation: 'Gravier concassé 15/25 pour béton armé B25',
    famille: 'MATERIAUX_GROS_OEUVRE',
    unite_mesure: 'm³',
    quantite_stock: 45.0,
    seuil_alerte_minimum: 40.0, // Proche alerte!
    prix_unitaire_moyen_dzd: 2200,
    emplacement_magasin: 'Alvéole Centrale Tour Bahia',
    updated_at: '2026-11-07T16:00:00Z'
  }
];

export const DEMO_MOUVEMENTS_STOCK: MouvementStock[] = [
  {
    id: 'mvt-001',
    chantier_id: 'cht-001',
    chantier_nom: 'Résidence Les Pins - Chéraga',
    article_id: 'art-003',
    article_designation: 'Bastaings bois sapin rouge 63x175 (Long. 4.00m)',
    type_mouvement: 'ENTREE_ACHAT',
    quantite: 15,
    unite_mesure: 'm³',
    reference_piece: 'BR-2026-CHT01-0008',
    beneficiaire_ou_provenance: 'BTP Algérie SARL (Fournisseur)',
    date_mouvement: '2026-10-22',
    auteur_id: 'user-magasinier',
    auteur_nom: 'Yacine Mansouri',
    created_at: '2026-10-22T11:15:00Z'
  },
  {
    id: 'mvt-002',
    chantier_id: 'cht-001',
    chantier_nom: 'Résidence Les Pins - Chéraga',
    article_id: 'art-003',
    article_designation: 'Bastaings bois sapin rouge 63x175 (Long. 4.00m)',
    type_mouvement: 'SORTIE_CHANTIER',
    quantite: 3,
    unite_mesure: 'm³',
    reference_piece: 'BS-2026-CHT01-0001',
    beneficiaire_ou_provenance: 'Équipe Coffrage R+1 (Chef d’équipe Amar)',
    date_mouvement: '2026-10-25',
    auteur_id: 'user-magasinier',
    auteur_nom: 'Yacine Mansouri',
    created_at: '2026-10-25T08:30:00Z'
  }
];

export const DEMO_BONS_SORTIE: BonSortie[] = [
  {
    id: 'bs-001',
    numero_bs: 'BS-2026-CHT01-0014',
    chantier_id: 'cht-001',
    chantier_nom: 'Résidence Les Pins - Chéraga',
    date_emission: '2026-11-07',
    article_id: 'art-002',
    designation_article: 'Ciment Portland Composé CEM II/A-L 42.5N (Sacs 50kg)',
    quantite: 50,
    unite_mesure: 'Sac (50kg)',
    destination: 'Maçonnerie cloisons intérieures Bâtiment A - 2ème étage',
    beneficiaire: 'Brigade Maçonnerie A (Chef Khaled)',
    motif: 'Reprise des cloisons de distribution intérieure et scellement dormant.',
    statut_validation_ct: 'VALIDE',
    conducteur_validateur_id: 'user-ct',
    conducteur_validateur_nom: 'Sofiane Belkacem',
    date_validation_ct: '2026-11-07T09:15:00Z',
    statut_confirmation_magasinier: 'CONFIRME',
    magasinier_confirmateur_id: 'user-magasinier',
    magasinier_confirmateur_nom: 'Yacine Mansouri',
    date_confirmation_magasinier: '2026-11-07T09:30:00Z',
    created_at: '2026-11-07T09:00:00Z'
  },
  {
    id: 'bs-002',
    numero_bs: 'BS-2026-CHT01-0015',
    chantier_id: 'cht-001',
    chantier_nom: 'Résidence Les Pins - Chéraga',
    date_emission: '2026-11-08',
    article_id: 'art-001',
    designation_article: 'Acier Haute Adhérence FeE500 Diamètre 16mm (Barres 12m)',
    quantite: 2.5,
    unite_mesure: 'Tonne',
    destination: 'Ferraillage poteaux et amorces voiles R+2',
    beneficiaire: 'Équipe Ferrailleurs (Chef Djamel)',
    motif: 'Coulage poteaux Bloc B programmé le 10/11/2026.',
    statut_validation_ct: 'EN_ATTENTE',
    statut_confirmation_magasinier: 'EN_ATTENTE',
    created_at: '2026-11-08T08:00:00Z'
  }
];

export const DEMO_TRANSFERTS_CHANTIERS: TransfertInterChantier[] = [
  {
    id: 'trf-001',
    numero_transfert: 'TRF-2026-0001',
    chantier_source_id: 'cht-001',
    chantier_source_nom: 'Résidence Les Pins - Chéraga',
    chantier_cible_id: 'cht-002',
    chantier_cible_nom: 'Tour Bahia - Front de Mer',
    article_designation: 'Ciment Portland Composé CEM II/A-L 42.5N (Sacs 50kg)',
    quantite: 100,
    unite_mesure: 'Sac (50kg)',
    motif: 'Dépannage urgent suite retard fournisseur régional Oran',
    statut: 'RECEPTIONNE',
    demandeur_id: 'user-ct',
    demandeur_nom: 'Sofiane Belkacem',
    created_at: '2026-10-15T10:00:00Z'
  }
];

export const DEMO_INVENTAIRES_MAGASIN: InventaireMagasin[] = [
  {
    id: 'inv-001',
    numero_inventaire: 'INV-2026-CHT01-01',
    chantier_id: 'cht-001',
    chantier_nom: 'Résidence Les Pins - Chéraga',
    date_inventaire: '2026-10-31',
    magasinier_id: 'user-magasinier',
    magasinier_nom: 'Yacine Mansouri',
    lignes: [
      {
        article_id: 'art-001',
        code_article: 'MAT-ACIER-16',
        designation: 'Acier Haute Adhérence FeE500 Diamètre 16mm (Barres 12m)',
        stock_theorique: 41.0,
        stock_physique: 41.0,
        ecart: 0,
        observation: 'Comptage physique conforme aux bons de réception.'
      },
      {
        article_id: 'art-002',
        code_article: 'MAT-CIMENT-42',
        designation: 'Ciment Portland Composé CEM II/A-L 42.5N (Sacs 50kg)',
        stock_theorique: 500,
        stock_physique: 495,
        ecart: -5,
        observation: 'Casse normale de 5 sacs lors de la manutention palettisée.'
      }
    ],
    statut: 'VALIDE_ET_CLOTURE',
    created_at: '2026-10-31T17:00:00Z'
  }
];

// ==========================================
// MATÉRIEL ET PARC AUTOMOBILE
// ==========================================

export const DEMO_VEHICULES: Vehicule[] = [
  {
    id: 'veh-001',
    entreprise_id: 'ent-001',
    num_interne: 'VEH-001',
    immatriculation: '12345-116-16',
    marque: 'Toyota',
    modele: 'Hilux',
    annee: 2024,
    caracteristiques: 'Puissance 150ch, 4x4, Benne renforcée',
    chantier_id: 'cht-001',
    statut: 'ACTIF',
    kilometrage: 15200,
    heures_fonctionnement: 0,
    date_prochaine_vidange: '2026-12-15',
    date_prochain_controle_technique: '2027-01-20',
    date_fin_assurance: '2027-06-30',
    historique_affectations: [
      { id: 'aff-1', chantier_id: 'cht-001', chantier_nom: 'Résidence Les Pins', conducteur_nom: 'Ahmed S.', date_debut: '2024-01-10' }
    ],
    created_at: '2024-01-10T08:00:00Z'
  },
  {
    id: 'eng-001',
    entreprise_id: 'ent-001',
    num_interne: 'ENG-001',
    immatriculation: 'N/A',
    marque: 'Caterpillar',
    modele: '320 GC',
    annee: 2023,
    caracteristiques: 'Poids op. 20t, Godet 1.2m3',
    chantier_id: 'cht-002',
    statut: 'ACTIF',
    kilometrage: 0,
    heures_fonctionnement: 2500,
    date_prochaine_vidange: '2026-11-20',
    date_prochain_controle_technique: '2027-02-15',
    date_fin_assurance: '2027-05-10',
    historique_affectations: [
      { id: 'aff-2', chantier_id: 'cht-002', chantier_nom: 'Tour Bahia', conducteur_nom: 'Mohamed B.', date_debut: '2023-09-01' }
    ],
    created_at: '2023-09-01T08:00:00Z'
  }
];

export const DEMO_ENTRETIENS: Entretien[] = [
  {
    id: 'ent-001',
    vehicule_id: 'veh-001',
    type: 'VIDANGE',
    description: 'Vidange huile moteur + filtre à huile',
    date: '2026-10-01',
    kilometrage_entretien: 14000,
    heures_entretien: 0,
    cout: 15000,
    facture_ref: 'FAC-AUTO-102',
    created_at: '2026-10-01T09:00:00Z'
  }
];

export const DEMO_PIECES_REMPLACABLES: PieceRemplacable[] = [
  {
    id: 'pce-001',
    vehicule_id: 'veh-001',
    type: 'PNEU',
    designation: 'Pneu Avant-Gauche',
    marque: 'Michelin',
    dimensions: '265/65 R17',
    numero_serie: 'PNEU-TOY-001',
    date_installation: '2026-05-15',
    kilometrage_installation: 5000,
    position: 'Avant-Gauche',
    etat: 'ACTIF',
    historique_remplacements: [],
    created_at: '2026-05-15T08:00:00Z'
  }
];
// ==========================================
// MODULE TECHNIQUE DEMO DATA
// ==========================================

export const DEMO_LOTS_TRAVAUX: LotTravaux[] = [
  { id: 'lot-01', chantier_id: 'cht-001', code_lot: 'LOT-01', libelle: 'Terrassements & Infrastructure', budget_prevu: 45000000, ordre: 1 },
  { id: 'lot-02', chantier_id: 'cht-001', code_lot: 'LOT-02', libelle: 'Gros Œuvre (BA)', budget_prevu: 280000000, ordre: 2 },
  { id: 'lot-03', chantier_id: 'cht-001', code_lot: 'LOT-03', libelle: 'Étanchéité', budget_prevu: 12000000, ordre: 3 }
];

export const DEMO_STRUCTURE_CHANTIER: StructureChantier[] = [
  { id: 'str-01', chantier_id: 'cht-001', type: 'BATIMENT', libelle: 'Résidence Les Pins' },
  { id: 'str-02', chantier_id: 'cht-001', parent_id: 'str-01', type: 'BLOC', libelle: 'Bloc A' },
  { id: 'str-03', chantier_id: 'cht-001', parent_id: 'str-01', type: 'BLOC', libelle: 'Bloc B' },
  { id: 'str-04', chantier_id: 'cht-001', parent_id: 'str-02', type: 'ETAGE', libelle: 'RDC' },
  { id: 'str-05', chantier_id: 'cht-001', parent_id: 'str-02', type: 'ETAGE', libelle: '1er Étage' }
];

export const DEMO_POSTES_TRAVAUX: PosteTravaux[] = [
  { id: 'pos-01', lot_id: 'lot-02', unite_id: 'u-2', unite_symbole: 'm³', code_article: 'BA-25', designation: 'Béton armé pour poteaux', quantite_prevue: 1200, prix_unitaire_ref: 18500 },
  { id: 'pos-02', lot_id: 'lot-02', unite_id: 'u-3', unite_symbole: 't', code_article: 'AC-HA12', designation: 'Acier HA FeE500 (D12)', quantite_prevue: 45, prix_unitaire_ref: 125000 }
];

export const DEMO_METRES: MetreVérification[] = [
  { id: 'met-01', poste_id: 'pos-01', structure_id: 'str-04', quantite_executee: 120, date_mesure: TODAY_STR, saisi_par_id: 'user-metreur', saisi_par_nom: 'Kamel Larbi', statut: 'VALIDE' }
];

export const DEMO_RAPPORTS_CHANTIER: RapportChantier[] = [
  { 
    id: 'rap-01', 
    chantier_id: 'cht-001', 
    date_rapport: TODAY_STR, 
    type: 'JOURNALIER', 
    effectif_total: 24, 
    meteo: 'Ensoleillé', 
    activites_realisees: 'Ferraillage et coffrage des poteaux du RDC Bloc A.', 
    photos_urls: [], 
    redacteur_id: 'user-ct', 
    redacteur_nom: 'Sofiane Belkacem', 
    statut: 'VALIDE' 
  }
];


// ==========================================
// COMPTABILITÉ & FISCALITÉ DEMO DATA
// ==========================================

export const DEMO_FACTURES_CLIENTS: FactureClient[] = [
  {
    id: 'fac-cli-001',
    numero_facture: 'FAC-VENTE-2026-001',
    client_nom: 'Sarl Immobilière Horizon',
    client_nif: '001216098234189',
    chantier_id: 'cht-001',
    chantier_nom: 'Résidence Les Pins - Chéraga',
    lot_vendu_id: 'Appartement F4 - Bloc A - N°12',
    date_facture: '2026-10-15',
    date_echeance: '2026-11-15',
    montant_ht_dzd: 12000000,
    montant_tva_dzd: 2280000, // 19%
    montant_ttc_dzd: 14280000,
    statut_paiement: 'PARTIELLEMENT_PAYEE',
    created_at: '2026-10-15T10:00:00Z'
  },
  {
    id: 'fac-cli-002',
    numero_facture: 'FAC-VENTE-2026-002',
    client_nom: 'M. Benyahia Kamel',
    chantier_id: 'cht-002',
    chantier_nom: 'Tour Bahia - Front de Mer',
    lot_vendu_id: 'Local Commercial - RDC - L04',
    date_facture: '2026-11-01',
    date_echeance: '2026-12-01',
    montant_ht_dzd: 8500000,
    montant_tva_dzd: 1615000,
    montant_ttc_dzd: 10115000,
    statut_paiement: 'PAYEE',
    created_at: '2026-11-01T09:00:00Z'
  }
];

export const DEMO_TRANSACTIONS_FINANCIERES: TransactionFinanciere[] = [
  {
    id: 'tr-001',
    date: '2026-11-05',
    type: 'DEPENSE',
    categorie: 'ACHAT_MATERIAUX',
    libelle: 'Paiement Facture Acier - Sider El Hadjar',
    montant_dzd: 4500000,
    chantier_id: 'cht-001',
    chantier_nom: 'Résidence Les Pins - Chéraga',
    compte_bancaire_id: 'cpt-001',
    mode_paiement: 'VIREMENT_BANCAIRE',
    reference_paiement: 'VIR-BN-88921',
    cree_par_id: 'user-compta',
    created_at: '2026-11-05T14:30:00Z'
  },
  {
    id: 'tr-002',
    date: '2026-11-07',
    type: 'RECETTE',
    categorie: 'VENTE_VEFA',
    libelle: 'Versement Acompte Benyahia Kamel',
    montant_dzd: 10115000,
    chantier_id: 'cht-002',
    chantier_nom: 'Tour Bahia - Front de Mer',
    compte_bancaire_id: 'cpt-003',
    mode_paiement: 'CHEQUE_BANCAIRE',
    reference_paiement: 'CHQ-BEA-00124',
    cree_par_id: 'user-compta',
    created_at: '2026-11-07T11:00:00Z'
  },
  {
    id: 'tr-003',
    date: '2026-11-02',
    type: 'DEPENSE',
    categorie: 'IMPOTS',
    libelle: 'Paiement G50 - Mois Octobre 2026',
    montant_dzd: 1250000,
    compte_bancaire_id: 'cpt-001',
    mode_paiement: 'VIREMENT_BANCAIRE',
    cree_par_id: 'user-compta',
    created_at: '2026-11-02T09:00:00Z'
  }
];

export const DEMO_DECLARATIONS_FISCALES: DeclarationFiscale[] = [
  {
    id: 'dec-001',
    type: 'G50',
    periode_mois: 10,
    periode_annee: 2026,
    date_declaration: '2026-11-15',
    montant_total_dzd: 1250000,
    details_impots: {
      tva_collectee: 850000,
      tva_deductible: 450000,
      tap_montant: 250000,
      irg_salaires: 600000
    },
    statut: 'PAYEE',
    created_at: '2026-11-10T10:00:00Z'
  },
  {
    id: 'dec-002',
    type: 'G50',
    periode_mois: 11,
    periode_annee: 2026,
    date_declaration: '2026-12-15',
    montant_total_dzd: 0,
    details_impots: {
      tva_collectee: 0,
      tva_deductible: 0,
      tap_montant: 0,
      irg_salaires: 0
    },
    statut: 'BROUILLON',
    created_at: '2026-11-08T15:00:00Z'
  }
];

export const DEMO_CLOTURES_COMPTABLES: ClotureComptableMensuelle[] = [
  {
    id: 'clot-2026-09',
    periode_cle: '2026-09',
    annee: 2026,
    mois: 9,
    statut: 'CLOTUREE',
    date_cloture: '2026-10-05T18:00:00Z',
    cloture_par_id: 'user-compta',
    cloture_par_nom: 'Karim BENMOHAMED (Chef Comptable)',
    total_debit_dzd: 36771000,
    total_credit_dzd: 36771000,
    nombre_ecritures: 6,
    observations: 'Clôture mensuelle Septembre 2026 validée. Journaux auxiliaires centralisés et période verrouillée sans écart.',
    ecritures: [
      {
        id: 'ecr-09-001',
        piece_ref: 'FAC-VEFA-2026-089',
        date: '2026-09-12',
        journal_code: 'J-VENTES',
        journal_libelle: 'Journal Ventes VEFA',
        compte_num: '411000',
        compte_libelle: 'Clients - Appels de fonds VEFA',
        libelle: 'Appel de fond Tranche 1 - Client Brahimi',
        debit_dzd: 9520000,
        credit_dzd: 0,
        chantier_id: 'cht-001',
        chantier_nom: 'Résidence Les Yasmine'
      },
      {
        id: 'ecr-09-002',
        piece_ref: 'FAC-VEFA-2026-089',
        date: '2026-09-12',
        journal_code: 'J-VENTES',
        journal_libelle: 'Journal Ventes VEFA',
        compte_num: '701000',
        compte_libelle: 'Ventes d’immeubles bâtis (VEFA)',
        libelle: 'Vente VEFA HT - Tranche 1',
        debit_dzd: 0,
        credit_dzd: 8000000,
        chantier_id: 'cht-001',
        chantier_nom: 'Résidence Les Yasmine'
      },
      {
        id: 'ecr-09-003',
        piece_ref: 'FAC-VEFA-2026-089',
        date: '2026-09-12',
        journal_code: 'J-VENTES',
        journal_libelle: 'Journal Ventes VEFA',
        compte_num: '445700',
        compte_libelle: 'TVA Collectée 19%',
        libelle: 'TVA collectée sur tranche VEFA',
        debit_dzd: 0,
        credit_dzd: 1520000,
        chantier_id: 'cht-001',
        chantier_nom: 'Résidence Les Yasmine'
      },
      {
        id: 'ecr-09-004',
        piece_ref: 'FAC-FOURN-GICA-4412',
        date: '2026-09-20',
        journal_code: 'J-ACHATS',
        journal_libelle: 'Journal Achats & Sous-traitance',
        compte_num: '601000',
        compte_libelle: 'Achats de matières premières (Ciment GICA)',
        libelle: 'Achat Ciment Vrac Gros Œuvre',
        debit_dzd: 15800000,
        credit_dzd: 0,
        chantier_id: 'cht-001',
        chantier_nom: 'Résidence Les Yasmine'
      },
      {
        id: 'ecr-09-005',
        piece_ref: 'FAC-FOURN-GICA-4412',
        date: '2026-09-20',
        journal_code: 'J-ACHATS',
        journal_libelle: 'Journal Achats & Sous-traitance',
        compte_num: '445600',
        compte_libelle: 'TVA Déductible 19%',
        libelle: 'TVA sur achat Ciment GICA',
        debit_dzd: 3002000,
        credit_dzd: 0,
        chantier_id: 'cht-001',
        chantier_nom: 'Résidence Les Yasmine'
      },
      {
        id: 'ecr-09-006',
        piece_ref: 'FAC-FOURN-GICA-4412',
        date: '2026-09-20',
        journal_code: 'J-ACHATS',
        journal_libelle: 'Journal Achats & Sous-traitance',
        compte_num: '401000',
        compte_libelle: 'Fournisseurs d’investissements et stocks',
        libelle: 'Facture GICA à payer (net retenue 5%)',
        debit_dzd: 0,
        credit_dzd: 18802000,
        chantier_id: 'cht-001',
        chantier_nom: 'Résidence Les Yasmine'
      },
      {
        id: 'ecr-09-007',
        piece_ref: 'FAC-FOURN-GICA-4412',
        date: '2026-09-20',
        journal_code: 'J-ACHATS',
        journal_libelle: 'Journal Achats & Sous-traitance',
        compte_num: '404000',
        compte_libelle: 'Fournisseurs - Retenues de garantie (5% BTPH)',
        libelle: 'Retenue de garantie 5% GICA',
        debit_dzd: 0,
        credit_dzd: 979000,
        chantier_id: 'cht-001',
        chantier_nom: 'Résidence Les Yasmine'
      },
      {
        id: 'ecr-09-008',
        piece_ref: 'VIR-CPA-99120',
        date: '2026-09-25',
        journal_code: 'J-TRESO',
        journal_libelle: 'Journal Trésorerie & Banque',
        compte_num: '512000',
        compte_libelle: 'Banques (Compte Séquestre CPA/FGCMPI)',
        libelle: 'Encaissement virement client VEFA',
        debit_dzd: 8449000,
        credit_dzd: 0,
        chantier_id: 'cht-001',
        chantier_nom: 'Résidence Les Yasmine'
      },
      {
        id: 'ecr-09-009',
        piece_ref: 'VIR-CPA-99120',
        date: '2026-09-25',
        journal_code: 'J-TRESO',
        journal_libelle: 'Journal Trésorerie & Banque',
        compte_num: '411000',
        compte_libelle: 'Clients - Appels de fonds VEFA',
        libelle: 'Règlement client Brahimi',
        debit_dzd: 0,
        credit_dzd: 8449000,
        chantier_id: 'cht-001',
        chantier_nom: 'Résidence Les Yasmine'
      }
    ]
  }
];

// ==========================================
// DEMO DATA - MODULE JURIDIQUE
// ==========================================

export const DEMO_CONTRATS_JURIDIQUES: ContratJuridique[] = [
  {
    id: 'ctr-001',
    numero_contrat: 'CTR-FOURN-2026-0042',
    titre: 'Contrat de fourniture Ciment Vrac & Enachachement GICA',
    type: 'FOURNISSEUR',
    partie_prenante_nom: 'Groupe Industriel des Ciments d’Algérie (GICA SPA)',
    chantier_id: 'cht-001',
    chantier_nom: 'Résidence Les Yasmine',
    date_signature: '2026-01-15',
    date_effet: '2026-02-01',
    date_echeance: '2026-12-31',
    montant_dzd: 45000000,
    statut: 'EN_VIGUEUR',
    reconduction_automatique: true,
    delai_preavis_jours: 30,
    responsable_juridique_nom: 'Maitre Reda HADJ-SAID',
    notes: 'Clausier conforme aux normes BTPH. Retenue de garantie 5% stipulée à l’Article 14.',
    historique_modifications: [
      { id: 'h-1', date: '2026-01-15', auteur: 'Reda HADJ-SAID', action: 'Signature initiale', details: 'Avenant tarifaire négocié à -4%' }
    ],
    pieces_jointes: [
      { id: 'pj-1', titre: 'Contrat_GICA_Signe.pdf', nom_fichier: 'Contrat_GICA_Signe.pdf', taille_ko: 2450, date_upload: '2026-01-15' }
    ],
    created_at: '2026-01-15T10:00:00Z'
  },
  {
    id: 'ctr-002',
    numero_contrat: 'CTR-ST-2026-0012',
    titre: 'Contrat de Sous-Traitance Lot Électricité & Postes HT/BT',
    type: 'SOUS_TRAITANCE',
    partie_prenante_nom: 'SARL ELEC-BAT Biskra',
    chantier_id: 'cht-001',
    chantier_nom: 'Résidence Les Yasmine',
    date_signature: '2026-03-10',
    date_effet: '2026-03-15',
    date_echeance: '2026-11-30',
    montant_dzd: 28000000,
    statut: 'EN_RENOUVELLEMENT',
    reconduction_automatique: false,
    delai_preavis_jours: 15,
    responsable_juridique_nom: 'Maitre Reda HADJ-SAID',
    notes: 'Pénalités de retard de 0.5%/jour plafonnées à 10%. Attestation CTC exigée à chaque situation.',
    historique_modifications: [
      { id: 'h-2', date: '2026-03-10', auteur: 'Reda HADJ-SAID', action: 'Enregistrement initial', details: 'Validation du visa technique' }
    ],
    pieces_jointes: [
      { id: 'pj-2', titre: 'Contrat_ST_ElecBat.pdf', nom_fichier: 'Contrat_ST_ElecBat.pdf', taille_ko: 1890, date_upload: '2026-03-10' }
    ],
    created_at: '2026-03-10T11:00:00Z'
  },
  {
    id: 'ctr-003',
    numero_contrat: 'CTR-VEFA-CLI-0089',
    titre: 'Contrat de Vente en l’État Futur d’Achèvement (VEFA) - Appt A-302',
    type: 'CLIENT_VEFA',
    partie_prenante_nom: 'Mme Meriem BRAHIMI',
    chantier_id: 'cht-001',
    chantier_nom: 'Résidence Les Yasmine',
    date_signature: '2026-05-20',
    date_effet: '2026-05-20',
    date_echeance: '2027-06-30',
    montant_dzd: 18500000,
    statut: 'EN_VIGUEUR',
    reconduction_automatique: false,
    delai_preavis_jours: 60,
    responsable_juridique_nom: 'Maitre Reda HADJ-SAID',
    notes: 'Inscrit chez Notaire Me Cherif à Alger. Garantie d’achèvement FGCMPI délivrée.',
    historique_modifications: [
      { id: 'h-3', date: '2026-05-20', auteur: 'Reda HADJ-SAID', action: 'Acte Notarié Déposé', details: 'Première tranche 20% encaissée' }
    ],
    pieces_jointes: [
      { id: 'pj-3', titre: 'Acte_VEFA_Brahimi.pdf', nom_fichier: 'Acte_VEFA_Brahimi.pdf', taille_ko: 3120, date_upload: '2026-05-20' }
    ],
    created_at: '2026-05-20T14:00:00Z'
  }
];

export const DEMO_DOCUMENTS_FONCIERS: DocumentFoncierAdmin[] = [
  {
    id: 'fonc-001',
    type: 'ACTE_PROPRIETE_FONCIER',
    titre: 'Acte de Propriété Foncier Publié (Terrain 3500 m²)',
    reference_officielle: 'ACTE-NOT-16/2019-N°4821',
    wilaya: 'Alger (16)',
    commune: 'Dely Ibrahim',
    chantier_id: 'cht-001',
    chantier_nom: 'Résidence Les Yasmine',
    notaire_nom: 'Maitre BENAMAR Notaire à Dely Ibrahim',
    date_delivrance: '2019-09-14',
    statut: 'VALIDE',
    notes: 'Conservation Foncière d’El Biar - Volume 182 Folio 44.',
    pieces_jointes: [
      { id: 'pj-f1', titre: 'Acte_Propriete_Foncier_Yasmine.pdf', nom_fichier: 'Acte_Propriete_Foncier_Yasmine.pdf', taille_ko: 4500, date_upload: '2019-09-15' }
    ],
    created_at: '2019-09-15T09:00:00Z'
  },
  {
    id: 'fonc-002',
    type: 'PERMIS_DE_CONSTRUIRE',
    titre: 'Permis de Construire Modificatif PC-2022 (R+9)',
    reference_officielle: 'PC-APC-DI-2022-0149',
    wilaya: 'Alger (16)',
    commune: 'Dely Ibrahim',
    chantier_id: 'cht-001',
    chantier_nom: 'Résidence Les Yasmine',
    date_delivrance: '2022-04-10',
    date_validite: '2027-04-10',
    statut: 'VALIDE',
    notes: 'Délivré par le Président de l’APC de Dely Ibrahim. Approuvé CTC Centre.',
    pieces_jointes: [
      { id: 'pj-f2', titre: 'Permis_Construire_APC.pdf', nom_fichier: 'Permis_Construire_APC.pdf', taille_ko: 2800, date_upload: '2022-04-11' }
    ],
    created_at: '2022-04-11T10:00:00Z'
  },
  {
    id: 'fonc-003',
    type: 'AGREMENT_PROMOTEUR',
    titre: 'Agrément Ministériel de Promoteur Immobilier',
    reference_officielle: 'AGR-MHUV-16-2018-0412',
    wilaya: 'Alger (16)',
    commune: 'Alger Centre',
    date_delivrance: '2018-05-22',
    statut: 'VALIDE',
    notes: 'Inscrit au Tableau National des Promoteurs Immobiliers (Ministère de l’Habitat).',
    pieces_jointes: [
      { id: 'pj-f3', titre: 'Agrement_Promoteur_MHUV.pdf', nom_fichier: 'Agrement_Promoteur_MHUV.pdf', taille_ko: 1200, date_upload: '2018-05-23' }
    ],
    created_at: '2018-05-23T08:00:00Z'
  }
];

export const DEMO_DOSSIERS_LITIGES: DossierLitige[] = [
  {
    id: 'lit-001',
    numero_dossier: 'LIT-2026-003',
    titre_affaire: 'Contentieux Empiètement Limite de Propriété Voisinage',
    juridiction: 'TRIBUNAL_CIVIL',
    partie_adverse: 'Consorts BENALI (Propriétaires riverains)',
    qualite: 'DEFENDEUR',
    enjeu_financier_dzd: 4500000,
    avocat_conseil_nom: 'Maitre Sofiane CHERIF (Avocat à la Cour)',
    statut: 'AUDIENCE_PROGRAMMEE',
    date_ouverture: '2026-02-10',
    prochaine_audience_date: '2026-11-25',
    resume_faits: 'Action en référé introduite par les voisins concernant le mur de soutènement du bloc A. Rapport topographique contradictoire déposé.',
    historique_audiences: [
      { id: 'aud-1', date: '2026-04-15', objet: 'Désignation de l’expert judiciaire', resultat: 'Expert M. Belkacem désigné pour bornage' },
      { id: 'aud-2', date: '2026-09-12', objet: 'Dépôt du rapport d’expertise', resultat: 'Expertise favorable à BatiProm SPA' }
    ],
    pieces_jointes: [
      { id: 'pj-l1', titre: 'Rapport_Expertise_Judiciaire_Bornage.pdf', nom_fichier: 'Rapport_Expertise_Judiciaire_Bornage.pdf', taille_ko: 3400, date_upload: '2026-09-14' }
    ],
    created_at: '2026-02-10T09:00:00Z'
  }
];

// ==========================================
// DEMO DATA - MODULE COMMERCIAL
// ==========================================

export const DEMO_BIENS_IMMOBILIERS: BienImmobilier[] = [
  {
    id: 'bien-001',
    reference: 'RES-YAS-A-101',
    chantier_id: 'cht-001',
    chantier_nom: 'Résidence Les Yasmine',
    batiment_bloc: 'Bloc A',
    etage: '1er Étage',
    num_porte: 'A-101',
    type_bien: 'LOGEMENT_F3',
    orientation: 'SUD_OUEST',
    superficie_habitable_m2: 88,
    superficie_utile_m2: 96,
    superficie_terrasse_m2: 8,
    prix_vente_dzd: 14500000,
    prix_m2_dzd: 164772,
    statut: 'DISPONIBLE',
    historique_commercial: [
      { id: 'hc-1', date: '2026-01-10', action: 'CREATION', auteur: 'Amel KACEMI (Commerciale)', description: 'Mise en vente initiale du lot A-101 au catalogue.' }
    ],
    created_at: '2026-01-10T10:00:00Z',
    updated_at: '2026-01-10T10:00:00Z'
  },
  {
    id: 'bien-002',
    reference: 'RES-YAS-A-302',
    chantier_id: 'cht-001',
    chantier_nom: 'Résidence Les Yasmine',
    batiment_bloc: 'Bloc A',
    etage: '3ème Étage',
    num_porte: 'A-302',
    type_bien: 'LOGEMENT_F4',
    orientation: 'DOUBLE_FACADE',
    superficie_habitable_m2: 122,
    superficie_utile_m2: 135,
    superficie_terrasse_m2: 13,
    prix_vente_dzd: 18500000,
    prix_m2_dzd: 151639,
    statut: 'RESERVE',
    client_reservataire_id: 'cli-101',
    client_reservataire_nom: 'Mme Meriem BRAHIMI',
    client_reservataire_tel: '0550 12 34 56',
    date_reservation: '2026-05-15',
    historique_commercial: [
      { id: 'hc-2', date: '2026-01-10', action: 'CREATION', auteur: 'Amel KACEMI', description: 'Mise en vente initiale du lot A-302.' },
      { id: 'hc-3', date: '2026-05-10', action: 'VISITE', auteur: 'Amel KACEMI', description: 'Visite de chantier effectuée avec Mme Brahimi.' },
      { id: 'hc-4', date: '2026-05-15', action: 'RESERVATION', auteur: 'Amel KACEMI', description: 'Signature de la réservation VEFA. Versement 20% effectué (3,700,000 DZD).' }
    ],
    created_at: '2026-01-10T10:00:00Z',
    updated_at: '2026-05-15T16:00:00Z'
  },
  {
    id: 'bien-003',
    reference: 'RES-YAS-A-501',
    chantier_id: 'cht-001',
    chantier_nom: 'Résidence Les Yasmine',
    batiment_bloc: 'Bloc A',
    etage: '5ème Étage',
    num_porte: 'A-501',
    type_bien: 'PENTHOUSE',
    orientation: 'DOUBLE_FACADE',
    superficie_habitable_m2: 185,
    superficie_utile_m2: 230,
    superficie_terrasse_m2: 45,
    prix_vente_dzd: 32000000,
    prix_m2_dzd: 172972,
    statut: 'OPTION_RESERVATION',
    client_reservataire_nom: 'M. Ryad SLIMANI',
    client_reservataire_tel: '0661 98 76 54',
    date_reservation: '2026-11-02',
    historique_commercial: [
      { id: 'hc-5', date: '2026-11-02', action: 'OPTION', auteur: 'Amel KACEMI', description: 'Option posée pour 15 jours suite salon BTPH.' }
    ],
    created_at: '2026-01-10T10:00:00Z',
    updated_at: '2026-11-02T11:00:00Z'
  },
  {
    id: 'bien-004',
    reference: 'RES-YAS-LOC-02',
    chantier_id: 'cht-001',
    chantier_nom: 'Résidence Les Yasmine',
    batiment_bloc: 'RDC Commercial',
    etage: 'RDC',
    num_porte: 'M-02',
    type_bien: 'LOCAL_COMMERCIAL',
    orientation: 'NORD',
    superficie_habitable_m2: 140,
    superficie_utile_m2: 140,
    superficie_terrasse_m2: 0,
    prix_vente_dzd: 28000000,
    prix_m2_dzd: 200000,
    statut: 'VENDU',
    client_reservataire_nom: 'SARL PHARMA PLUS Dely Ibrahim',
    date_vente_vefa: '2026-03-20',
    historique_commercial: [
      { id: 'hc-6', date: '2026-03-20', action: 'CONTRAT_VEFA', auteur: 'Amel KACEMI', description: 'Vente définitive notariée. Règlement 100% effectué.' }
    ],
    created_at: '2026-01-10T10:00:00Z',
    updated_at: '2026-03-20T15:00:00Z'
  }
];

export const DEMO_CLIENTS_PROSPECTS: ClientProspect[] = [
  {
    id: 'cli-101',
    numero_fiche: 'CLI-2026-0042',
    nom: 'BRAHIMI',
    prenom: 'Meriem',
    nin: '109283746592018273',
    telephone: '0550 12 34 56',
    email: 'm.brahimi@gmail.com',
    adresse: 'Villa N°12 Bois des Cars, Dely Ibrahim',
    wilaya: 'Alger (16)',
    type: 'ACQUEREUR_RESERVATAIRE',
    budget_max_dzd: 20000000,
    typologie_recherchee: 'Logement F4 avec terrasse',
    canal_acquisition: 'PASSAGE_AGENCE',
    chantier_interet_id: 'cht-001',
    chantier_interet_nom: 'Résidence Les Yasmine',
    nb_visites: 3,
    created_at: '2026-05-02T10:00:00Z'
  },
  {
    id: 'cli-102',
    numero_fiche: 'CLI-2026-0098',
    nom: 'SLIMANI',
    prenom: 'Ryad',
    nin: '108273645192837465',
    telephone: '0661 98 76 54',
    email: 'r.slimani@yahoo.fr',
    adresse: 'Cité Hydra Bâtiment C N°4',
    wilaya: 'Alger (16)',
    type: 'PROSPECT',
    budget_max_dzd: 35000000,
    typologie_recherchee: 'Penthouse F5',
    canal_acquisition: 'SALON_IMMOBILIER',
    chantier_interet_id: 'cht-001',
    chantier_interet_nom: 'Résidence Les Yasmine',
    nb_visites: 2,
    created_at: '2026-10-28T14:00:00Z'
  }
];

export const DEMO_RESERVATIONS_VEFA: ReservationVenteVEFA[] = [
  {
    id: 'res-001',
    numero_contrat_vefa: 'VEFA-2026-YAS-0089',
    bien_id: 'bien-002',
    bien_ref: 'RES-YAS-A-302',
    chantier_id: 'cht-001',
    chantier_nom: 'Résidence Les Yasmine',
    client_id: 'cli-101',
    client_nom: 'Mme Meriem BRAHIMI',
    client_nin: '109283746592018273',
    client_tel: '0550 12 34 56',
    notaire_nom: 'Maitre CHERIF Notaire à El Biar',
    date_reservation: '2026-05-15',
    date_promesse_vefa: '2026-05-20',
    prix_total_convenu_dzd: 18500000,
    montant_encaisse_dzd: 7400000,
    solde_restant_dzd: 11100000,
    statut: 'PROMESSE_SIGNEE',
    echeancier_tranches: [
      { id: 'tr-1', libelle_tranche: 'Tranche 1 - Réservation (20%)', pct_exige: 20, montant_tranche_dzd: 3700000, date_echeance_prevue: '2026-05-20', statut: 'PAYEE', date_reglement_effectif: '2026-05-20', reference_recu_cpa: 'REC-CPA-99120' },
      { id: 'tr-2', libelle_tranche: 'Tranche 2 - Fondations & Vois (15%)', pct_exige: 15, montant_tranche_dzd: 2775000, date_echeance_prevue: '2026-08-30', statut: 'PAYEE', date_reglement_effectif: '2026-09-02', reference_recu_cpa: 'REC-CPA-10482' },
      { id: 'tr-3', libelle_tranche: 'Tranche 3 - Structure Gros Œuvre (25%)', pct_exige: 25, montant_tranche_dzd: 4625000, date_echeance_prevue: '2026-12-15', statut: 'EXIGIBLE' },
      { id: 'tr-4', libelle_tranche: 'Tranche 4 - Second-Œuvre (20%)', pct_exige: 20, montant_tranche_dzd: 3700000, date_echeance_prevue: '2027-03-31', statut: 'EN_ATTENTE' },
      { id: 'tr-5', libelle_tranche: 'Tranche 5 - Remise des Clefs (20%)', pct_exige: 20, montant_tranche_dzd: 3700000, date_echeance_prevue: '2027-06-30', statut: 'EN_ATTENTE' }
    ],
    created_at: '2026-05-15T10:00:00Z'
  }
];


