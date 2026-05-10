# 🔧 Résolution des problèmes - SGX-Intendance

## Erreur Vercel: "Couldn't find any `pages` or `app` directory"

### Problème
```
Build error occurred
Error: > Couldn't find any `pages` or `app` directory. Please create one under the project root
```

### Solution 1: Configuration Vercel via l'interface

Lors du déploiement sur Vercel :

1. Dans **Build & Development Settings** :
   - Framework Preset: **Next.js** (détection automatique)
   - Build Command: Laisser vide (utilise `npm run build` par défaut)
   - Output Directory: Laisser vide (utilise `.next` par défaut)
   - Install Command: Laisser vide (utilise `npm install` par défaut)

2. **Root Directory** :
   - ⚠️ **IMPORTANT** : Laisser vide ou mettre `./`
   - Ne PAS mettre `src/` car notre structure est `src/app/`, pas `app/` à la racine

3. Variables d'environnement :
   - Ajouter `DATABASE_URL`

### Solution 2: Via package.json

Le `package.json` doit avoir ces scripts (déjà configurés) :

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

### Solution 3: Vérifier la structure du projet

La structure doit être :

```
projet/
├── src/
│   └── app/          ← Répertoire app ici
│       ├── layout.tsx
│       ├── page.tsx
│       └── ...
├── package.json
├── next.config.ts
└── tsconfig.json
```

**PAS** :
```
projet/
├── app/              ← NE PAS avoir app à la racine
│   └── ...
```

### Solution 4: Redéployer depuis zéro

Si le problème persiste :

1. **Supprimer le projet sur Vercel**
2. **Recréer le projet** :
   - Import depuis GitHub
   - Laisser Vercel détecter Next.js automatiquement
   - Ne PAS modifier les paramètres de build
   - Ajouter seulement `DATABASE_URL`

### Solution 5: Via Vercel CLI

```bash
# Supprimer .vercel si existe
rm -rf .vercel

# Redéployer
vercel

# Questions à répondre :
# - Set up and deploy? Yes
# - Which scope? Votre compte
# - Link to existing project? No
# - Project name? sgx-intendance
# - In which directory is your code located? ./   (← IMPORTANT)
# - Override settings? No

# Ajouter DATABASE_URL
vercel env add DATABASE_URL production

# Redéployer
vercel --prod
```

---

## Erreur: "Module not found" ou import errors

### Problème
```
Module not found: Can't resolve '@/...'
```

### Solution

Vérifier `tsconfig.json` :

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

---

## Erreur: Base de données

### Problème
```
Error connecting to database
```

### Solutions

1. **Vérifier DATABASE_URL** :
   ```bash
   vercel env ls
   ```

2. **Format correct pour Neon** :
   ```
   postgresql://user:password@ep-xxxxx.eu-central-1.aws.neon.tech/dbname?sslmode=require
   ```

3. **Vérifier SSL** :
   - Neon requiert `?sslmode=require`
   - Supabase requiert `?sslmode=require`
   - Vercel Postgres gère automatiquement

4. **Tester la connexion** :
   ```bash
   psql "votre_database_url"
   ```

---

## Erreur: Tables manquantes

### Problème
```
relation "sites" does not exist
```

### Solution

Appliquer le schéma :

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Lier au projet
vercel link

# Télécharger les variables d'environnement
vercel env pull .env.production

# Appliquer le schéma
npx drizzle-kit push
```

---

## Erreur: Build réussit mais page blanche

### Problème
L'application se build mais affiche une page blanche

### Solutions

1. **Vérifier les logs Vercel** :
   - Aller dans Deployments > Function Logs
   - Chercher les erreurs

2. **Vérifier la console du navigateur** :
   - F12 > Console
   - Chercher les erreurs JavaScript

3. **Vérifier DATABASE_URL** :
   - L'API fonctionne-t-elle ? `/api/health`
   - Si non, vérifier la connexion DB

---

## Erreur TypeScript en production

### Problème
```
Type error: ...
```

### Solution

```bash
# Tester localement
npm run typecheck

# Si erreur, corriger le code
# Si pas d'erreur locale, vérifier la version Node.js sur Vercel
```

---

## Performance lente

### Solutions

1. **Activer Edge Runtime** (optionnel) :
   
   Dans `src/app/api/*/route.ts` :
   ```typescript
   export const runtime = 'edge';
   ```

2. **Optimiser les images** :
   - Utiliser Next.js Image component
   - Compresser les images

3. **Vérifier la base de données** :
   - Index sur les colonnes fréquemment recherchées
   - Limiter les `SELECT *`

---

## Vercel CLI ne fonctionne pas

### Solutions

1. **Réinstaller** :
   ```bash
   npm uninstall -g vercel
   npm install -g vercel@latest
   ```

2. **Vérifier la connexion** :
   ```bash
   vercel whoami
   ```

3. **Se reconnecter** :
   ```bash
   vercel logout
   vercel login
   ```

---

## Variables d'environnement non appliquées

### Solutions

1. **Redéployer après ajout** :
   ```bash
   vercel --prod
   ```

2. **Vérifier l'environnement** :
   - Production vs Preview vs Development

3. **Télécharger localement** :
   ```bash
   vercel env pull .env.production
   cat .env.production
   ```

---

## Aide supplémentaire

### Logs Vercel

```bash
# Voir les logs en temps réel
vercel logs

# Logs d'un déploiement spécifique
vercel logs [deployment-url]
```

### Commandes utiles

```bash
# Informations sur le projet
vercel inspect

# Lister les déploiements
vercel ls

# Supprimer un déploiement
vercel rm [deployment-url]

# Promouvoir un déploiement en production
vercel promote [deployment-url]
```

### Support

- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Next.js](https://nextjs.org/docs)
- [Support Vercel](https://vercel.com/support)

---

## Checklist de dépannage

Avant de chercher de l'aide :

- [ ] `npm run build` fonctionne localement
- [ ] `npm run typecheck` passe
- [ ] `DATABASE_URL` est défini sur Vercel
- [ ] La structure du projet est correcte (`src/app/`)
- [ ] Le schéma DB est appliqué (`npx drizzle-kit push`)
- [ ] Les logs Vercel ont été consultés
- [ ] La console navigateur a été vérifiée
- [ ] L'endpoint `/api/health` fonctionne

---

**Si le problème persiste, ouvrez une issue sur GitHub avec :**
- Message d'erreur complet
- Logs Vercel
- Commandes exécutées
- Version Node.js
