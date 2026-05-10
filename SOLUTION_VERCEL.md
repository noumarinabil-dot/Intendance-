# ✅ Solution pour l'erreur Vercel "Couldn't find any pages or app directory"

## 🔴 L'erreur

```
Build error occurred
Error: > Couldn't find any `pages` or `app` directory. 
Please create one under the project root
```

## ✅ LA SOLUTION

### Configuration Vercel correcte

Lors du déploiement sur Vercel, **NE PAS** modifier le **Root Directory** !

#### ✅ CORRECT

```
Root Directory: (laisser vide)
```

ou

```
Root Directory: ./
```

#### ❌ INCORRECT

```
Root Directory: src/          ← NE PAS FAIRE !
Root Directory: src/app/      ← NE PAS FAIRE !
```

---

## 📖 Explication

Notre structure de projet est :

```
sgx-intendance/
├── src/
│   └── app/              ← Application Next.js ici
│       ├── layout.tsx
│       ├── page.tsx
│       └── api/
├── package.json          ← Vercel lit les scripts ici
├── next.config.ts        ← Configuration Next.js ici
└── tsconfig.json         ← Mapping des paths ici
```

**Vercel doit pointer vers la racine du projet (`./`)**, pas vers `src/`.

Next.js sait automatiquement chercher dans `src/app/` grâce à sa configuration par défaut.

---

## 🚀 Instructions de déploiement

### Via l'interface Vercel

1. **Import du projet**
   - Aller sur [vercel.com](https://vercel.com)
   - "Add New..." > "Project"
   - Importer `sgx-intendance` depuis GitHub

2. **Configuration** (très important !)
   - **Framework Preset** : Next.js ✅ (auto-détecté)
   - **Root Directory** : **LAISSER VIDE** ⚠️
   - **Build Command** : LAISSER VIDE
   - **Output Directory** : LAISSER VIDE
   - **Install Command** : LAISSER VIDE

3. **Variables d'environnement**
   - Ajouter `DATABASE_URL`
   - Coller votre chaîne de connexion PostgreSQL

4. **Déployer**
   - Cliquer sur "Deploy"
   - Attendre 2-3 minutes

### Via Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# À la question: "In which directory is your code located?"
# Réponse: Appuyer sur Entrée (ou taper ./)

# À la question: "Want to override settings?"
# Réponse: n (Non)

# Ajouter DATABASE_URL
vercel env add DATABASE_URL production
# Coller votre URL de base de données

# Déployer en production
vercel --prod
```

---

## 🔍 Vérification

Après le déploiement :

1. **Vérifier que le build a réussi**
   - Logs Vercel doivent montrer : ✓ Compiled successfully

2. **Tester l'API**
   ```bash
   curl https://votre-app.vercel.app/api/health
   # Doit retourner: {"ok":true}
   ```

3. **Initialiser la base de données**
   ```bash
   vercel env pull .env.production
   npx drizzle-kit push
   ```

4. **Tester l'application**
   - Ouvrir l'URL Vercel dans le navigateur
   - Vérifier que la page d'accueil s'affiche
   - Créer un site de test
   - Créer un équipement de test
   - Créer une intervention de test

---

## 🎯 Points clés à retenir

1. ✅ **Root Directory** : TOUJOURS laisser vide ou mettre `./`
2. ✅ **Ne pas toucher** aux Build/Output/Install Commands
3. ✅ **Laisser Vercel** détecter automatiquement Next.js
4. ✅ **Ajouter seulement** `DATABASE_URL` dans les variables d'environnement

---

## 🐛 Si le problème persiste

### Option 1 : Supprimer et recréer le projet

1. Supprimer le projet sur Vercel
2. Recréer avec les bons paramètres ci-dessus

### Option 2 : Modifier les paramètres

1. Aller dans Project Settings > General
2. Root Directory → Vider le champ
3. Save
4. Redéployer : Deployments > ... > Redeploy

### Option 3 : Vérifier le repository GitHub

```bash
# S'assurer que la structure est correcte
ls -la src/app/

# Doit afficher :
# layout.tsx
# page.tsx
# api/
# equipements/
# interventions/
# planning/
# sites/
```

---

## 📚 Documentation complète

Pour plus d'informations :

- [VERCEL_CONFIG.md](./VERCEL_CONFIG.md) - Configuration détaillée
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Tous les problèmes et solutions
- [DEPLOIEMENT_VERCEL.md](./DEPLOIEMENT_VERCEL.md) - Guide complet de déploiement

---

## ✅ Résumé en une ligne

**Laisser le Root Directory VIDE lors du déploiement sur Vercel !**

C'est tout ! 🎉
