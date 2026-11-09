# Documentation Technique & Guide d'Exploitation Production
## Système Intégré de Gestion BTPH & Promotion Immobilière - BatiProm Algérie

**Version de l'application :** 2026.11 (Release Candidate 1)  
**Conformité Règlementaire :** Loi 11-04 (Vente en l'État Futur d'Achèvement - VEFA), Décret BTPH, FGCMPI, Système Comptable Financier (SCF Algérie).

---

## I. Architecture & Sécurisation de la Base de Données

### 1. Architecture Modulaire
L'application repose sur une architecture SPA TypeScript hautement modulaire intégrant :
- **Client :** React + Vite + Tailwind CSS + Lucide Icons.
- **Gestionnaire d'État & Context :** `AppContext.tsx` assurant la réactivité et la distribution des données métiers.
- **Moteur de Sécurité RBAC Server-Side Simulation :** `authService.ts` & `productionSecurityService.ts`.
- **Résilence & Error Boundary :** `ErrorBoundary.tsx` capturant les exceptions d'exécution sans interruption de service.

### 2. Sécurisation & Chiffrement des Données Sensibles
- **Masquage Automatique :** Les informations bancaires sensibles (RIB 20 chiffres, numéros de comptes séquestres) et montants confidentiels de sous-traitance sont masqués pour les utilisateurs non habilités.
- **Coffre-fort Documentaire :** Isolation stricte des pièces jointes juridiques et foncières (Actes notariés, livrets fonciers, permis de construire) accessibles uniquement sur jeton d'autorisation actif.

---

## II. Stratégie de Sauvegarde et Plan de Reprise d'Activité (PRA / DRP)

### 1. Sauvegardes Automatiques & Snapshots
- **Fréquence :** Sauvegarde quotidienne automatique programmée à 02:00 (UTC+1).
- **Rétention :** 30 jours glissants sur stockage sécurisé.
- **Contrôle d'Intégrité :** Chaque snapshot génère une empreinte numérique SHA-256 unique.

### 2. Procédure de Sauvegarde Manuelle
1. Se connecter en tant qu'**Administrateur Général**.
2. Accéder au module **Administration** &rarr; Onglet **Sauvegardes & Restauration**.
3. Cliquer sur **Créer & Télécharger un Snapshot**.
4. Le système génère un fichier `.json` horodaté d'exportation complète de la base de données.

### 3. Procédure de Restauration
1. Dans l'onglet **Sauvegardes & Restauration**, cliquer sur **Restaurer depuis un fichier JSON**.
2. Sélectionner le fichier de sauvegarde `.json` à réinjecter.
3. Le moteur vérifie la structure du schéma, contrôle les clés et applique la restauration intégrale.

---

## III. Journalisation des Opérations Sensibles (Audit Trail)

Chaque action critique est automatiquement inscrite dans un journal d'audit immuable comprenant :
- **Horodatage ISO-8601** (Date et heure précises).
- **Identité de l'auteur** (Nom, Prénom, Email, Rôle).
- **Adresse IP source & Équipement**.
- **Module & Action exécutée** (Création, Modification, Suppression, Validation, Clôture).
- **Niveau de Sévérité :** `INFO`, `WARNING`, `CRITICAL`.

---

## IV. Procédures Administratives Pas-à-Pas

### Procédure 1 : Création d'un Nouveau Chantier BTPH
1. Accéder au module **Paramètres** &rarr; Onglet **Gestion des chantiers**.
2. Cliquer sur **Nouveau Chantier**.
3. Renseigner le code du chantier, la Wilaya, la Commune et les références du Permis de Construire.
4. Définir le nombre de logements (VEFA), locaux commerciaux et niveaux.
5. Désigner le Directeur de Chantier (Siège) et le Conducteur de Travaux (Terrain).
6. Créer le Compte Séquestre Bancaire dédié dans **Paramètres &rarr; Informations bancaires**.

### Procédure 2 : Création & Habilitation d'un Nouvel Utilisateur
1. Accéder au module **Administration** &rarr; Onglet **Utilisateurs**.
2. Cliquer sur **Créer un utilisateur**.
3. Saisir le Nom, Prénom, Email professionnel et Poste.
4. Sélectionner le Périmètre : `CENTRAL (Siège)` ou `CHANTIER (Terrain)`.
5. Attribuer le Rôle RBAC parmi les 11 rôles disponibles.
6. Cocher la liste exacte des chantiers auxquels l'utilisateur est affecté (Isolation multi-tenant).

---

## V. Guide d'Utilisation par Profil Métier

| Profil / Rôle | Périmètre d'Accès | Obligations Opérationnelles | Action Interdite |
| :--- | :--- | :--- | :--- |
| **Administrateur Général** | Accès 360° global | Governance système, gestion RBAC, sauvegardes | Aucune restriction |
| **Conducteur de Travaux** | Chantier(s) affecté(s) uniquement | Saisie journalière du pointage avant 08h15, suivi de l'avancement | Modification des prix de vente, clôture comptable |
| **Magasinier** | Magasin du chantier assigné | Réception physique des matériaux, émission des bons de sortie | Validation des demandes d'achat budgétaires |
| **Responsable Comptabilité** | Module Comptabilité & Fiscalité (Central) | Validation financière des achats, clôture mensuelle | Modification des feuilles de pointage terrain |
| **Responsable Juridique** | Module Juridique & Coffre-fort (Central) | Gestion des contrats clients/fournisseurs, contentieux | Modification des stocks |
| **Responsable Commercial** | Module Commercial (Central) | Suivi des réserves, contrats VEFA, échéanciers | Accès aux bulletins de paie et salaires |
| **Responsable RH** | Module RH & Paie (Central) | Traitement des dérogations de pointage, paie, contrats | Validation des bons de commande matériel |
| **Responsable Matériel** | Module Matériel & Équipements | Suivi du parc engins, contrôles techniques et assurances | Modification des comptes bancaires |

---

## VI. Bilan de Préparation au Déploiement Production

### Éléments Prêts pour la Production (100% Validés)
- [x] Moteur d'authentification et de gestion de sessions sécurisées.
- [x] Matrice d'habilitation RBAC à 7 permissions indépendantes.
- [x] Isolation hermétique des données inter-chantiers.
- [x] Journalisation immuable des événements sensibles.
- [x] Système de sauvegardes et restauration par snapshot JSON/SQL.
- [x] Interface multilingue Français / Arabe avec prise en charge du mode RTL.
- [x] Module de clôture comptable mensuelle automatisée avec verrouillage.
- [x] Workflows complets des Achats, Stocks, Pointages et Dérogations.
- [x] Composant d'interception globale des erreurs (`ErrorBoundary`).

### Éléments Nécessitant une Intervention Externe (Hors Code Applicatif)
1. **Réservation du Nom de Domaine Officiel** (ex: `app.batiprom.dz`).
2. **Installation du Certificat SSL/TLS (HTTPS)** sur l'hôte de production.
3. **Provisionnement du Serveur Cloud SQL (PostgreSQL/MySQL)** pour la persistance permanente hors mémoire.
4. **Configuration du Serveur SMTP** pour l'envoi effectif des emails de notifications.

> **Remarque Importante de Gouvernance :** Conformément aux consignes de sécurité, aucun déploiement automatique en production ne sera effectué sans la validation explicite et formelle de l'Administrateur Général.
