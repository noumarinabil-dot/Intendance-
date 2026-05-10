# 📦 Configuration GitHub et Vercel

Guide complet pour publier SGX-Intendance sur GitHub et le déployer sur Vercel.

## 📋 Fichiers préparés

Tous les fichiers nécessaires sont déjà créés :

- ✅ `.gitignore` - Fichiers à ignorer
- ✅ `.env.example` - Template des variables d'environnement
- ✅ `vercel.json` - Configuration Vercel
- ✅ `README_GITHUB.md` - README pour GitHub
- ✅ `LICENSE` - Licence MIT
- ✅ `CONTRIBUTING.md` - Guide de contribution
- ✅ `.github/workflows/ci.yml` - CI/CD GitHub Actions
- ✅ Scripts de déploiement
- ✅ Documentation complète

## 🚀 Étape 1 : Préparer le repository GitHub

### 1.1 Créer le repository sur GitHub

1. Allez sur [github.com](https://github.com)
2. Cliquez sur "New repository"
3. Remplissez :
   - **Repository name** : `sgx-intendance`
   - **Description** : "Application de gestion de la maintenance des sites et équipements"
   - **Visibility** : Public ou Private (selon votre choix)
   - ⚠️ **NE PAS** cocher "Initialize with README" (on a déjà les fichiers)
4. Cliquez sur "Create repository"

### 1.2 Renommer README pour GitHub

```bash
# Renommer README_GITHUB.md en README.md
mv README_GITHUB.md README_original.md
cp README.md README_technique.md
mv README_GITHUB.md README.md
```

Ou gardez les deux et ajoutez un lien dans le README principal.

## 🔧 Étape 2 : Initialiser Git et pousser

### 2.1 Initialiser Git (si pas déjà fait)

```bash
cd sgx-intendance
git init
```

### 2.2 Configurer Git (première fois seulement)

```bash
git config --global user.name "Votre Nom"
git config --global user.email "votre.email@example.com"
```

### 2.3 Ajouter tous les fichiers

```bash
# Vérifier les fichiers qui seront ajoutés
git status

# Ajouter tous les fichiers
git add .

# Vérifier qu'aucun fichier sensible n'est ajouté
git status

# IMPORTANT : Vérifier que .env n'est PAS dans la liste
```

### 2.4 Créer le premier commit

```bash
git commit -m "Initial commit - SGX-Intendance v1.0.0

- Application complète de gestion de maintenance
- Gestion des sites, équipements et interventions
- Planning avec support interne/externe
- Interface en français
- Documentation complète
- Prêt pour déploiement Vercel"
```

### 2.5 Lier au repository GitHub

Remplacez `VOTRE-USERNAME` par votre nom d'utilisateur GitHub :

```bash
git remote add origin https://github.com/VOTRE-USERNAME/sgx-intendance.git
```

### 2.6 Pousser vers GitHub

```bash
# Renommer la branche en 'main'
git branch -M main

# Pousser vers GitHub
git push -u origin main
```

Si vous avez une erreur d'authentification :
- Utilisez un Personal Access Token (PAT)
- Ou configurez SSH

## 🌐 Étape 3 : Déployer sur Vercel

### Option A : Via l'interface Vercel (Recommandé)

1. **Créer une base de données**

   **Neon (Recommandé - Gratuit) :**
   - Allez sur [neon.tech](https://neon.tech)
   - Créez un compte
   - Nouveau projet : "sgx-intendance"
   - Région : Europe
   - Copiez le `DATABASE_URL`

   **Ou Vercel Postgres :**
   - Sur Vercel > Storage > Create Database
   - Type : Postgres
   - Nom : sgx-intendance-db
   - Copiez le `DATABASE_URL`

2. **Déployer sur Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - "Add New..." > "Project"
   - "Import Git Repository"
   - Sélectionnez `sgx-intendance`
   - Framework : Next.js (détecté automatiquement)
   - **Environment Variables** :
     - Name: `DATABASE_URL`
     - Value: Votre URL de base de données
   - Cliquez "Deploy"

3. **Initialiser la base de données**
   ```bash
   # Installer Vercel CLI
   npm i -g vercel
   
   # Se connecter
   vercel login
   
   # Lier le projet
   vercel link
   
   # Télécharger les variables d'environnement
   vercel env pull .env.production
   
   # Appliquer le schéma
   npx drizzle-kit push
   ```

### Option B : Via Vercel CLI

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer (suivre les instructions)
vercel

# Questions à répondre :
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? sgx-intendance
# - Directory? ./
# - Override settings? No

# Ajouter DATABASE_URL
vercel env add DATABASE_URL production

# Redéployer
vercel --prod
```

## 📊 Étape 4 : Vérifier le déploiement

1. **Tester l'application**
   - Ouvrez l'URL Vercel
   - Vérifiez que la page d'accueil s'affiche
   - Testez `/api/health`

2. **Créer des données de test**
   - Créez un site
   - Ajoutez un équipement
   - Planifiez une intervention

3. **Vérifier toutes les pages**
   - Tableau de bord
   - Planning
   - Interventions
   - Équipements
   - Sites

## 🔄 Étape 5 : Workflow de développement

### Faire des modifications

```bash
# 1. Créer une branche pour la fonctionnalité
git checkout -b feature/nouvelle-fonctionnalite

# 2. Faire les modifications dans le code

# 3. Tester localement
npm run dev
npm run typecheck
npm run build

# 4. Committer
git add .
git commit -m "feat: description de la fonctionnalité"

# 5. Pousser vers GitHub
git push origin feature/nouvelle-fonctionnalite

# 6. Sur GitHub : créer une Pull Request

# 7. Après merge : Vercel déploie automatiquement !
```

### Déploiement automatique

Vercel déploie automatiquement :
- ✅ Chaque push sur `main` → Production
- ✅ Chaque Pull Request → Preview
- ✅ Chaque branche → Preview unique

## 🛡️ Étape 6 : Sécurité

### Variables d'environnement

⚠️ **IMPORTANT** : Ne jamais commiter `.env` !

Le `.gitignore` est configuré pour ignorer :
- `.env`
- `.env.local`
- `.env*.local`

### Secrets GitHub

Pour les GitHub Actions, ajoutez dans Settings > Secrets :
- `DATABASE_URL` (pour les tests si besoin)

## 📝 Étape 7 : Documentation GitHub

### Personnaliser le README

Éditez `README.md` et remplacez :
- `votre-username` par votre username GitHub
- Ajoutez des screenshots
- Personnalisez selon vos besoins

### Ajouter un badge de statut

Dans `README.md`, ajoutez :

```markdown
![CI](https://github.com/VOTRE-USERNAME/sgx-intendance/workflows/CI/badge.svg)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/VOTRE-USERNAME/sgx-intendance)
```

### Activer GitHub Pages (optionnel)

Pour héberger la documentation :
1. Settings > Pages
2. Source : Deploy from a branch
3. Branch : main, /docs
4. Créez un dossier `docs/` avec votre documentation

## 🎨 Étape 8 : Améliorations optionnelles

### 1. Ajouter des screenshots

```bash
# Créer un dossier
mkdir -p .github/screenshots

# Prendre des captures d'écran de l'app
# Les ajouter dans .github/screenshots/

# Référencer dans README.md
```

### 2. Ajouter des issues templates

Créez `.github/ISSUE_TEMPLATE/bug_report.md` et `feature_request.md`

### 3. Ajouter un CHANGELOG

Créez `CHANGELOG.md` pour suivre les versions

### 4. Configurer Dependabot

Créez `.github/dependabot.yml` pour les mises à jour automatiques

## ✅ Checklist finale

Avant de publier :

- [ ] `.env` n'est PAS commité
- [ ] `README.md` est à jour
- [ ] Variables d'environnement configurées sur Vercel
- [ ] Base de données créée et schéma appliqué
- [ ] Application testée sur Vercel
- [ ] Documentation complète
- [ ] Licence ajoutée
- [ ] CI/CD fonctionne
- [ ] Toutes les pages sont accessibles
- [ ] Données de test créées

## 🎯 Commandes de référence rapide

```bash
# Git
git status                              # Voir l'état
git add .                               # Ajouter tous les fichiers
git commit -m "message"                 # Commiter
git push                                # Pousser vers GitHub
git pull                                # Récupérer les changements

# Vercel
vercel                                  # Déployer
vercel --prod                           # Déployer en production
vercel env ls                           # Lister les variables d'env
vercel logs                             # Voir les logs
vercel domains                          # Gérer les domaines

# Base de données
npm run db:push                         # Appliquer le schéma
npm run db:studio                       # Interface graphique

# Build
npm run dev                             # Développement
npm run build                           # Build
npm run typecheck                       # Vérifier TypeScript
```

## 🆘 Problèmes courants

### Git push rejeté

```bash
# Forcer le push (ATTENTION : uniquement si sûr)
git push -f origin main
```

### Erreur Vercel "Build failed"

1. Vérifier les logs sur Vercel
2. Tester le build localement : `npm run build`
3. Vérifier que DATABASE_URL est défini

### Tables manquantes

```bash
# Appliquer le schéma
vercel env pull .env.production
npx drizzle-kit push
```

## 📚 Ressources

- [Documentation Git](https://git-scm.com/doc)
- [Documentation GitHub](https://docs.github.com)
- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Next.js](https://nextjs.org/docs)

---

**Votre application est maintenant prête pour GitHub et Vercel ! 🎉**

Pour toute question, ouvrez une issue sur GitHub.
