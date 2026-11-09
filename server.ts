import express, { Request, Response, NextFunction } from 'express';
import { createServer as createViteServer } from 'vite';
import { authService } from './src/services/authService.ts';
import { ModuleCode, PermissionAction } from './src/types/database.ts';
import { materielService } from './src/services/materielService.ts';
import { DEMO_CHANTIERS } from './src/data/demoData.ts';

interface AuthenticatedRequest extends Request {
  user?: ReturnType<typeof authService.getAuthenticatedUser>;
  sessionToken?: string;
}

const app = express();
app.use(express.json());

// ==========================================
// MIDDLEWARES DE SÉCURITÉ SERVEUR (RBAC & SESSIONS)
// ==========================================

const requireAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Non authentifié. Token de session manquant.',
      code: 'AUTH_REQUIRED'
    });
  }

  const token = authHeader.split(' ')[1];
  const user = authService.getAuthenticatedUser();

  if (!user || user.statut !== 'ACTIF') {
    return res.status(401).json({
      error: 'Session expirée ou utilisateur inactif.',
      code: 'SESSION_INVALID'
    });
  }

  req.user = user;
  req.sessionToken = token;
  next();
};

const requirePermission = (module: ModuleCode, action: PermissionAction = 'CONSULTER') => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = req.user || authService.getAuthenticatedUser();
    const targetChantierId = (req.query.chantier_id as string) || (req.body?.chantier_id as string);

    // Vérification côté serveur stricte
    const result = authService.verifyAccess(user, module, action, targetChantierId);

    if (!result.allowed) {
      console.warn(`[SECURITY ALERT] Tentative d'accès non autorisé par ${user?.email} sur ${module}:${action}. Règle : ${result.ruleViolated}`);
      return res.status(result.statusCode).json({
        error: result.reason,
        code: result.ruleViolated,
        module,
        action
      });
    }

    next();
  };
};

// ==========================================
// ROUTES AUTHENTIFICATION & SESSIONS
// ==========================================

app.post('/api/auth/login', async (req: Request, res: Response) => {
  const { email, password, deviceInfo } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis.' });
  }

  const result = await authService.login(email, password, deviceInfo);
  if (!result.success) {
    return res.status(401).json({ error: result.error });
  }

  return res.json({
    user: result.user,
    token: result.token,
    message: 'Authentification réussie.'
  });
});

app.post('/api/auth/logout', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  authService.logout();
  return res.json({ message: 'Session terminée avec succès.' });
});

app.get('/api/auth/me', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  return res.json({ user: req.user });
});

app.post('/api/auth/reset-password', (req: Request, res: Response) => {
  const { email, newPassword } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Adresse email requise.' });
  }

  const result = authService.resetPassword(email, newPassword);
  if (!result.success) {
    return res.status(404).json({ error: result.message });
  }

  return res.json(result);
});

app.get('/api/auth/sessions', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const sessions = authService.getSessionsForUser(req.user!.id);
  return res.json({ sessions });
});

app.post('/api/auth/sessions/:id/revoke', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const success = authService.revokeSession(req.params.id);
  if (!success) {
    return res.status(404).json({ error: 'Session introuvable.' });
  }
  return res.json({ message: 'Session révoquée avec succès.' });
});

// ==========================================
// VÉRIFICATION DE SÉCURITÉ CÔTÉ SERVEUR (RÈGLE 8 & 9)
// ==========================================

app.post('/api/security/verify-access', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const { module, action, chantier_id } = req.body;
  if (!module || !action) {
    return res.status(400).json({ error: 'Module et action requis.' });
  }

  const result = authService.verifyAccess(req.user!, module as ModuleCode, action as PermissionAction, chantier_id);
  return res.status(result.statusCode).json(result);
});

// ==========================================
// GESTION DES UTILISATEURS (ADMINISTRATION)
// ==========================================

app.get('/api/users', requireAuth, requirePermission('ADMINISTRATION', 'CONSULTER'), (req: AuthenticatedRequest, res: Response) => {
  const users = authService.getAllUsers();
  return res.json({ users });
});

app.post('/api/users', requireAuth, requirePermission('ADMINISTRATION', 'AJOUTER'), (req: AuthenticatedRequest, res: Response) => {
  try {
    const newUser = authService.createUser(req.body);
    return res.status(201).json({ user: newUser, message: 'Compte utilisateur créé avec succès.' });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

app.put('/api/users/:id', requireAuth, requirePermission('ADMINISTRATION', 'MODIFIER'), (req: AuthenticatedRequest, res: Response) => {
  try {
    const updatedUser = authService.updateUser(req.params.id, req.body);
    return res.json({ user: updatedUser, message: 'Utilisateur mis à jour.' });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

app.delete('/api/users/:id', requireAuth, requirePermission('ADMINISTRATION', 'SUPPRIMER'), (req: AuthenticatedRequest, res: Response) => {
  const result = authService.deleteUserControlled(req.params.id);
  if (!result.success) {
    return res.status(400).json({ error: result.message });
  }
  return res.json(result);
});

// ==========================================
// RÔLES ET MATRICE DES PERMISSIONS RBAC
// ==========================================

app.get('/api/roles', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  return res.json({ roles: authService.getAllRoles() });
});

app.get('/api/permissions', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  return res.json({ permissions: authService.getAllPermissions() });
});

app.get('/api/rbac/matrix', requireAuth, requirePermission('ADMINISTRATION', 'CONSULTER'), (req: AuthenticatedRequest, res: Response) => {
  return res.json({
    rolePermissions: authService.getRolePermissions(),
    roles: authService.getAllRoles(),
    permissions: authService.getAllPermissions()
  });
});

app.put('/api/rbac/matrix', requireAuth, requirePermission('ADMINISTRATION', 'MODIFIER'), (req: AuthenticatedRequest, res: Response) => {
  const { rolePermissions } = req.body;
  if (!Array.isArray(rolePermissions)) {
    return res.status(400).json({ error: 'Format de matrice invalide.' });
  }

  authService.saveConfigurableMatrix(rolePermissions);
  return res.json({ message: 'Matrice de permissions RBAC mise à jour et appliquée sur le serveur.' });
});

// ==========================================
// CHANTIERS CLOISONNÉS PAR UTILISATEUR
// ==========================================

app.get('/api/chantiers', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const user = req.user!;
  
  // Si administrateur ou central autorisé, retourne tous les chantiers
  if (user.type === 'CENTRAL') {
    return res.json({ chantiers: DEMO_CHANTIERS });
  }

  // RÈGLE 4 : Le conducteur de travaux / métreur / magasinier ne voit QUE son chantier
  const allowedChantiers = DEMO_CHANTIERS.filter(c => user.chantiers_assignes.includes(c.id));
  return res.json({ chantiers: allowedChantiers });
});

// ==========================================
// RESSOURCES HUMAINES ET POINTAGE (API SÉCURISÉE)
// ==========================================

app.get('/api/rh/employes', requireAuth, requirePermission('RH', 'CONSULTER'), (_req: AuthenticatedRequest, res: Response) => {
  return res.json({ message: 'Accès autorisé aux dossiers du personnel RH central.' });
});

app.post('/api/rh/employes', requireAuth, requirePermission('RH', 'AJOUTER'), (_req: AuthenticatedRequest, res: Response) => {
  return res.status(201).json({ message: 'Dossier employé créé et affecté au chantier.' });
});

app.post('/api/rh/derogations/:id/traiter', requireAuth, requirePermission('RH', 'VALIDER'), (req: AuthenticatedRequest, res: Response) => {
  const { decision } = req.body;
  return res.json({ message: `Dérogation de pointage traitée (${decision}) par le Responsable RH.` });
});

// ==========================================
// ACHATS ET APPROVISIONNEMENTS (CIRCUIT DIRECT CHANTIER)
// ==========================================

// 1. Création d'une Demande d'Achat par le Conducteur de travaux
app.post('/api/appro/da', requireAuth, requirePermission('APPROVISIONNEMENTS', 'AJOUTER'), (req: AuthenticatedRequest, res: Response) => {
  const { chantier_id, designation_produit, quantite_demandee } = req.body;
  if (!chantier_id || !designation_produit || !quantite_demandee) {
    return res.status(400).json({ error: 'Chantier, produit et quantité requis.' });
  }

  // Cloisonnement : l'utilisateur de chantier doit être assigné à ce chantier
  if (req.user!.type === 'CHANTIER' && !req.user!.chantiers_assignes.includes(chantier_id)) {
    return res.status(403).json({
      error: 'Interdit : Vous ne pouvez émettre des DA que pour vos chantiers assignés.',
      code: 'REGLE_4_SITE_USER_OUT_OF_SCOPE'
    });
  }

  return res.status(201).json({
    message: 'Demande d’achat enregistrée et transmise automatiquement à la Comptabilité.',
    statut: 'EN_ATTENTE_COMPTABILITE'
  });
});

// 2. Contrôle et validation comptable de la Demande d'Achat
app.post('/api/appro/da/:id/valider-compta', requireAuth, requirePermission('APPROVISIONNEMENTS', 'VALIDER'), (req: AuthenticatedRequest, res: Response) => {
  const { decision, demandeur_id } = req.body;

  // RÈGLE OBLIGATOIRE : Le conducteur ne doit pas pouvoir valider sa propre demande d'achat
  if (req.user!.id === demandeur_id) {
    return res.status(403).json({
      error: 'Règle stricte violée : Le conducteur ne peut pas valider sa propre demande d’achat.',
      code: 'REGLE_NO_SELF_APPROVAL'
    });
  }

  // Seule la comptabilité ou l'administrateur valide à cette étape
  const roleCode = authService.getAllRoles().find(r => r.id === req.user!.role_id)?.code;
  if (roleCode !== 'RESPONSABLE_COMPTABILITE' && roleCode !== 'ADMINISTRATEUR') {
    return res.status(403).json({
      error: 'Seul le Responsable Comptabilité est autorisé à valider budgétairement une demande d’achat.',
      code: 'REGLE_COMPTA_APPROVAL_ONLY'
    });
  }

  return res.json({
    message: `Demande d’achat ${decision === 'VALIDER' ? 'validée par la comptabilité et transmise au service approvisionnements' : 'refusée par la comptabilité'}.`,
    nouveau_statut: decision === 'VALIDER' ? 'VALIDEE' : 'REFUSEE'
  });
});

// 3. Émission du Bon de Commande vers le Magasin du Chantier
app.post('/api/appro/bc', requireAuth, requirePermission('APPROVISIONNEMENTS', 'AJOUTER'), (req: AuthenticatedRequest, res: Response) => {
  const roleCode = authService.getAllRoles().find(r => r.id === req.user!.role_id)?.code;

  // RÈGLE OBLIGATOIRE : La comptabilité ne doit pas pouvoir effectuer les opérations réservées au service approvisionnements
  if (roleCode === 'RESPONSABLE_COMPTABILITE') {
    return res.status(403).json({
      error: 'Règle stricte violée : La comptabilité ne peut pas émettre de bon de commande. Cette opération relève du service approvisionnements.',
      code: 'REGLE_COMPTA_BLOCKED_FROM_PROCUREMENT_OPS'
    });
  }

  const { fournisseur_id, chantier_destinataire_id, quantite_commandee } = req.body;
  if (!fournisseur_id || !chantier_destinataire_id || !quantite_commandee) {
    return res.status(400).json({ error: 'Fournisseur, chantier destinataire et quantité requis.' });
  }

  return res.status(201).json({
    message: 'Bon de commande émis avec succès pour livraison directe au magasin du chantier.',
    statut: 'COMMANDEE'
  });
});

// 4. Réception et contrôle des marchandises au magasin du chantier par le magasinier
app.post('/api/appro/receptions', requireAuth, requirePermission('APPROVISIONNEMENTS', 'AJOUTER'), (req: AuthenticatedRequest, res: Response) => {
  const { chantier_id, conformite_qualite } = req.body;

  // Cloisonnement magasinier : uniquement son chantier
  if (req.user!.type === 'CHANTIER' && !req.user!.chantiers_assignes.includes(chantier_id)) {
    return res.status(403).json({
      error: 'Règle stricte violée : Le magasinier ne peut réceptionner que pour le magasin de son chantier.',
      code: 'REGLE_5_MAGASINIER_CHALLENGE'
    });
  }

  return res.status(201).json({
    message: 'Réception magasin chantier enregistrée avec visa et contrôle de conformité.',
    statut: conformite_qualite === 'NON_CONFORME' ? 'REFUSE' : 'RECEPTIONNE'
  });
});

// ==========================================
// GESTION DU MATÉRIEL ET PARC AUTOMOBILE
// ==========================================

app.get('/api/materiel/parc', requireAuth, requirePermission('MATERIEL', 'CONSULTER'), (_req: AuthenticatedRequest, res: Response) => {
  return res.json({ vehicules: materielService.getAllVehicules() });
});

app.get('/api/materiel/alertes', requireAuth, requirePermission('MATERIEL', 'CONSULTER'), (_req: AuthenticatedRequest, res: Response) => {
  return res.json({ alertes: materielService.getAlertes() });
});


// ==========================================
// SERVEUR DEV VITE INTEGRATION
// ==========================================

async function start() {
  const port = 3000;

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`[BatiProm ERP] Serveur démarré avec succès sur http://0.0.0.0:${port}`);
    console.log(`[BatiProm ERP] Contrôleur RBAC et Sécurité active.`);
  });
}

start().catch(err => {
  console.error('Erreur démarrage serveur :', err);
});
