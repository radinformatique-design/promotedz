import { Vehicule, Entretien as Maintenance, PieceRemplacable } from '../types/database.ts';

// En mémoire pour le moment (mock)
let vehicules: Vehicule[] = [
  { 
    id: 'v1', 
    entreprise_id: 'ent-001',
    num_interne: 'ENG-001', 
    immatriculation: '12345-101-16', 
    marque: 'CAT', 
    modele: 'Excavatrice 320', 
    annee: 2022, 
    statut: 'ACTIF', 
    kilometrage: 12000, 
    heures_fonctionnement: 5000, 
    date_prochaine_vidange: '2026-12-01', 
    date_prochain_controle_technique: '2027-01-01', 
    date_fin_assurance: '2027-06-01',
    created_at: new Date().toISOString()
  }
];

export const materielService = {
  getAllVehicules: () => vehicules,
  getVehiculeById: (id: string) => vehicules.find(v => v.id === id),
  
  // Fonctions de gestion
  ajouterVehicule: (vehicule: Vehicule) => {
    vehicules.push(vehicule);
    return vehicule;
  },
  
  majStatut: (id: string, statut: Vehicule['statut']) => {
    const v = vehicules.find(v => v.id === id);
    if (v) v.statut = statut;
    return v;
  },
  
  // Dashboard alerts
  getAlertes: () => {
    const aujourdhui = new Date();
    return vehicules.filter(v => {
      const vidange = v.date_prochaine_vidange ? new Date(v.date_prochaine_vidange) : null;
      const ct = v.date_prochain_controle_technique ? new Date(v.date_prochain_controle_technique) : null;
      const assurance = v.date_fin_assurance ? new Date(v.date_fin_assurance) : null;
      
      return (vidange && vidange < aujourdhui) || (ct && ct < aujourdhui) || (assurance && assurance < aujourdhui);
    });
  }
};
