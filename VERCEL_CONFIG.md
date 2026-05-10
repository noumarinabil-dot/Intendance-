# ⚙️ Configuration Vercel pour SGX-Intendance

## 📋 Paramètres de déploiement corrects

### ✅ Configuration via l'interface Vercel

Lors de l'import du projet depuis GitHub :

| Paramètre | Valeur | Note |
|-----------|--------|------|
| **Framework Preset** | Next.js | Détecté automatiquement |
| **Root Directory** | *(vide)* ou `./` | ⚠️ **NE PAS** mettre `src/` |
| **Build Command** | *(vide)* | Utilise `npm run build` automatiquement |
| **Output Directory** | *(vide)* | Utilise `.next` automatiquement |
| **Install Command** | *(vide)* | Utilise `npm install` automatiquement |

### 🔧 Variables d'environnement

| Variable | Valeur | Environnement |
|----------|--------|---------------|
| `DATABASE_URL` | Votre chaîne de connexion PostgreSQL | Production |

**Exemple DATABASE_URL (Neon)** :
```
postgresql://user:password@ep-xxxxx.eu-central-1.aws.neon.tech/dbname?sslmode=require
```

---

## 🚫 Erreurs courantes à éviter

### ❌ MAUVAIS
```
Root Directory: src/
```
**Erreur** : `Couldn't find any pages or app directory`

### ✅ CORRECT
```
Root Directory: (vide) ou ./
```
**Raison** : Notre structure est `src/app/`, pas `app/` à la racine

---

## 📁 Structure du projet

```
sgx-intendance/          ← Root du projet (.)
├── src/
│   ├── app/             ← Application Next.js
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── api/
│   └── db/
├── package.json
├── next.config.ts
└── tsconfig.json
```

Vercel doit être pointé vers la racine (`./`), pas vers `src/`.

---

## ⚡ Configuration via Vercel CLI

```bash
# Installer
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Questions importantes :
# ? In which directory is your code located? 
# → Appuyez sur Entrée (ou tapez ./)

# ? Want to override settings?
# → No (n)

# Ajouter DATABASE_URL
vercel env add DATABASE_URL production
# Collez votre chaîne de connexion

# Déployer en production
vercel --prod
```

---

## 🔍 Vérifications post-déploiement

### 1. Build réussi ✅
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
```

### 2. Tester l'API
```bash
curl https://votre-app.vercel.app/api/health
# Doit retourner: {"ok":true}
```

### 3. Initialiser la DB
```bash
vercel env pull .env.production
npx drizzle-kit push
```

### 4. Tester l'application
- Ouvrir l'URL Vercel
- Créer un site
- Créer un équipement
- Créer une intervention

---

## 🐛 Dépannage

### Erreur: "Couldn't find any pages or app directory"

**Cause** : Root Directory mal configuré

**Solution** :
1. Aller dans Project Settings > General
2. Root Directory → Laisser vide
3. Redéployer

### Erreur: Module not found '@/...'

**Cause** : Problème de résolution des paths

**Solution** : Vérifier `tsconfig.json` :
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Build échoue mais fonctionne localement

**Solution** :
```bash
# Vérifier les versions
node --version  # Doit être 18+
npm --version

# Reconstruire node_modules
rm -rf node_modules package-lock.json
npm install
npm run build

# Si ça fonctionne, pusher sur GitHub
git add .
git commit -m "fix: dependencies"
git push
```

---

## 📊 Paramètres recommandés

### Node.js Version
- **Recommandé** : 18.x ou 20.x
- Défini dans Project Settings > General > Node.js Version

### Build & Development Settings
```
Framework: Next.js
Node.js Version: 20.x
Build Command: (défaut)
Output Directory: (défaut)
Install Command: (défaut)
Development Command: (défaut)
```

### Environment Variables
```
Production:
  DATABASE_URL = postgresql://...

Preview:
  DATABASE_URL = postgresql://... (même ou différent)

Development:
  DATABASE_URL = postgresql://... (local ou distant)
```

---

## 🎯 Checklist de déploiement

Avant de déployer :

- [ ] Code poussé sur GitHub
- [ ] Base de données créée (Neon/Supabase/Vercel Postgres)
- [ ] `DATABASE_URL` copié

Sur Vercel :

- [ ] Projet importé depuis GitHub
- [ ] Framework détecté : Next.js
- [ ] Root Directory : vide ou `./`
- [ ] `DATABASE_URL` ajouté dans Environment Variables
- [ ] Déployé avec succès
- [ ] `/api/health` répond `{"ok":true}`
- [ ] Schéma DB appliqué (`npx drizzle-kit push`)
- [ ] Application testée et fonctionnelle

---

## 📞 Ressources

- [Documentation Vercel](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

**Configuration correcte = Déploiement réussi ! 🚀**
