# ✅ Checklist de déploiement - SGX-Intendance

## Avant de commencer

### Prérequis
- [ ] Compte GitHub créé
- [ ] Compte Vercel créé (ou à créer)
- [ ] Git installé sur votre machine
- [ ] Node.js 18+ installé

## Étape 1: Configuration locale

### Vérifications
- [ ] Le projet compile sans erreur : `npm run build`
- [ ] TypeScript passe : `npm run typecheck`
- [ ] L'application démarre : `npm run dev`
- [ ] Fichier `.env` est dans `.gitignore`
- [ ] Fichier `.env.example` existe

### Fichiers à vérifier
- [ ] `.gitignore` est présent
- [ ] `package.json` a le bon nom "sgx-intendance"
- [ ] `vercel.json` est configuré
- [ ] Documentation complète présente

## Étape 2: Préparation de la base de données

### Choix du fournisseur
- [ ] **Neon** (recommandé - gratuit)
- [ ] **Vercel Postgres**
- [ ] **Supabase**

### Configuration
- [ ] Base de données créée
- [ ] Région Europe sélectionnée
- [ ] `DATABASE_URL` copiée
- [ ] Connexion testée

## Étape 3: Configuration GitHub

### Création du repository
- [ ] Repository GitHub créé
- [ ] Nom: `sgx-intendance`
- [ ] Description ajoutée
- [ ] Visibilité définie (public/privé)
- [ ] **PAS** de README initial (on a déjà les fichiers)

### Configuration Git locale
```bash
- [ ] git init
- [ ] git config user.name "Votre Nom"
- [ ] git config user.email "votre@email.com"
```

### Premier commit
```bash
- [ ] git add .
- [ ] Vérifier que .env n'est PAS listé
- [ ] git commit -m "Initial commit"
- [ ] git remote add origin https://github.com/USERNAME/sgx-intendance.git
- [ ] git branch -M main
- [ ] git push -u origin main
```

## Étape 4: Déploiement Vercel

### Configuration initiale
- [ ] Se connecter à [vercel.com](https://vercel.com)
- [ ] "Add New..." > "Project"
- [ ] Importer repository GitHub
- [ ] Framework détecté : Next.js ✓

### Variables d'environnement
- [ ] Ajouter `DATABASE_URL`
- [ ] Valeur : votre chaîne de connexion PostgreSQL
- [ ] Environnement : Production

### Déploiement
- [ ] Cliquer "Deploy"
- [ ] Attendre la fin du build (2-3 minutes)
- [ ] URL de production générée

## Étape 5: Initialisation de la base de données

### Via Vercel CLI
```bash
- [ ] npm i -g vercel
- [ ] vercel login
- [ ] vercel link
- [ ] vercel env pull .env.production
- [ ] npx drizzle-kit push
```

### Vérifications
- [ ] Tables créées dans PostgreSQL
- [ ] Schéma correct (sites, equipements, interventions)
- [ ] Enums créés

## Étape 6: Tests post-déploiement

### Tests de base
- [ ] Ouvrir l'URL Vercel
- [ ] Page d'accueil s'affiche ✓
- [ ] Tester `/api/health` → `{"ok":true}`
- [ ] Navigation entre les pages fonctionne

### Tests fonctionnels
- [ ] Créer un site
- [ ] Créer un équipement
- [ ] Créer une intervention
- [ ] Voir le planning
- [ ] Voir les statistiques du dashboard

### Tests des filtres
- [ ] Filtres du planning fonctionnent
- [ ] Type d'exécutant (interne/externe) fonctionne
- [ ] Nombre de personnes s'affiche

## Étape 7: Données de démonstration (optionnel)

### Ajout de données
- [ ] Connecter à la base de données
- [ ] Exécuter les scripts SQL de données de test
- [ ] Ou créer manuellement via l'interface

### Vérification
- [ ] 3+ sites créés
- [ ] 5+ équipements créés
- [ ] 8+ interventions créées
- [ ] Mix préventif/curatif
- [ ] Mix interne/externe

## Étape 8: Configuration avancée (optionnel)

### Domaine personnalisé
- [ ] Ajouter un domaine dans Vercel
- [ ] Configurer DNS
- [ ] Certificat SSL automatique

### Analytics
- [ ] Activer Vercel Analytics
- [ ] Configurer Speed Insights
- [ ] Surveiller les performances

### Monitoring
- [ ] Configurer les alertes
- [ ] Vérifier les logs régulièrement
- [ ] Surveiller l'utilisation de la base de données

## Étape 9: Documentation

### README
- [ ] Remplacer `VOTRE-USERNAME` par votre username GitHub
- [ ] Ajouter des screenshots (optionnel)
- [ ] Mettre à jour les liens

### Badges
- [ ] Badge CI/CD GitHub Actions
- [ ] Badge "Deploy to Vercel"
- [ ] Badge de version

## Étape 10: Sécurité et maintenance

### Sécurité
- [ ] `.env` jamais committé
- [ ] Secrets GitHub configurés (si CI/CD)
- [ ] Accès base de données restreint
- [ ] HTTPS activé (automatique sur Vercel)

### Maintenance
- [ ] Sauvegardes base de données planifiées
- [ ] Surveillance des erreurs
- [ ] Mises à jour de dépendances
- [ ] Tests réguliers

## Checklist finale

### Fonctionnalités
- [ ] ✅ Dashboard avec statistiques
- [ ] ✅ Gestion des sites (CRUD)
- [ ] ✅ Gestion des équipements (CRUD)
- [ ] ✅ Gestion des interventions (CRUD)
- [ ] ✅ Planning chronologique
- [ ] ✅ Filtres multiples
- [ ] ✅ Type exécutant (interne/externe)
- [ ] ✅ Nombre de personnes
- [ ] ✅ Dates planifiées

### Performance
- [ ] Build réussi sans erreur
- [ ] TypeScript sans erreur
- [ ] Temps de chargement < 3s
- [ ] Responsive design fonctionne

### Documentation
- [ ] README complet
- [ ] Guide utilisateur
- [ ] Guide déploiement
- [ ] Guide contribution
- [ ] Licence ajoutée

## 🎉 Déploiement réussi !

Si toutes les cases sont cochées, votre application est prête !

### Prochaines étapes

1. **Partager l'application**
   - [ ] Envoyer le lien aux utilisateurs
   - [ ] Former les utilisateurs
   - [ ] Créer des comptes de test

2. **Améliorer**
   - [ ] Ajouter des fonctionnalités
   - [ ] Améliorer le design
   - [ ] Optimiser les performances

3. **Maintenir**
   - [ ] Surveiller les erreurs
   - [ ] Mettre à jour régulièrement
   - [ ] Sauvegarder les données

---

## 🆘 En cas de problème

### Build échoue
1. Vérifier les logs Vercel
2. Tester `npm run build` localement
3. Vérifier les variables d'environnement

### Base de données
1. Vérifier `DATABASE_URL`
2. Tester la connexion
3. Réappliquer le schéma : `npx drizzle-kit push`

### Git push refusé
1. Vérifier les conflits
2. `git pull origin main`
3. Résoudre les conflits
4. `git push`

---

**Bon déploiement ! 🚀**

Date de déploiement : __________
URL de production : __________
Base de données : __________
