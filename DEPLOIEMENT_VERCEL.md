# Guide de déploiement sur Vercel

## 📋 Prérequis

1. Compte GitHub
2. Compte Vercel (gratuit sur [vercel.com](https://vercel.com))
3. Base de données PostgreSQL (Neon, Supabase, ou Vercel Postgres)

## 🚀 Étapes de déploiement

### 1. Préparer la base de données

#### Option A : Vercel Postgres (Recommandé)

1. Allez sur [vercel.com](https://vercel.com)
2. Connectez-vous à votre compte
3. Allez dans l'onglet "Storage"
4. Cliquez sur "Create Database"
5. Sélectionnez "Postgres"
6. Choisissez votre région (Europe de préférence)
7. Nommez votre base de données : `sgx-intendance-db`
8. Copiez le `DATABASE_URL` fourni

#### Option B : Neon (Gratuit et simple)

1. Allez sur [neon.tech](https://neon.tech)
2. Créez un compte gratuit
3. Créez un nouveau projet
4. Nommez-le : `sgx-intendance`
5. Sélectionnez la région Europe
6. Copiez la chaîne de connexion (Connection String)
7. Format : `postgresql://user:password@ep-xxxxx.eu-central-1.aws.neon.tech/dbname?sslmode=require`

#### Option C : Supabase (Gratuit)

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un compte gratuit
3. Créez un nouveau projet
4. Nommez-le : `sgx-intendance`
5. Choisissez un mot de passe sécurisé
6. Sélectionnez la région Europe
7. Dans Settings > Database, copiez le "Connection string" en mode "URI"

### 2. Pousser le code sur GitHub

```bash
# Initialisez Git (si ce n'est pas déjà fait)
git init

# Ajoutez tous les fichiers
git add .

# Créez le premier commit
git commit -m "Initial commit - SGX-Intendance"

# Créez un nouveau repository sur GitHub
# Puis liez-le à votre projet local
git remote add origin https://github.com/VOTRE-USERNAME/sgx-intendance.git

# Poussez le code
git branch -M main
git push -u origin main
```

### 3. Déployer sur Vercel

#### Via l'interface Web (Recommandé)

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur "Add New..." > "Project"
3. Importez votre repository GitHub `sgx-intendance`
4. Vercel détectera automatiquement Next.js
5. **Configuration importante** :
   - **Root Directory** : Laisser vide ou mettre `./` (PAS `src/`)
   - **Framework Preset** : Next.js (auto-détecté)
   - **Build Command** : Laisser vide (utilise le package.json)
   - **Output Directory** : Laisser vide
6. Configurez les variables d'environnement :
   - Cliquez sur "Environment Variables"
   - Ajoutez : `DATABASE_URL` = votre chaîne de connexion
7. Cliquez sur "Deploy"

⚠️ **Important** : Notre structure est `src/app/` donc le Root Directory doit rester vide !

#### Via Vercel CLI

```bash
# Installez Vercel CLI
npm i -g vercel

# Connectez-vous
vercel login

# Déployez
vercel

# Suivez les instructions
# Question: In which directory is your code located?
# Réponse: ./  (ou appuyez juste sur Entrée)
# Liez le projet à votre repository GitHub
# Ajoutez la variable d'environnement DATABASE_URL
```

### 4. Initialiser la base de données

Une fois le déploiement réussi :

#### Option 1 : Via le terminal Vercel

1. Dans votre projet Vercel, allez dans "Deployments"
2. Cliquez sur les "..." de votre dernier déploiement
3. Sélectionnez "View Function Logs"
4. Ou utilisez Vercel CLI :

```bash
vercel env pull .env.production
npm run build
npx drizzle-kit push
```

#### Option 2 : Appliquer le schéma manuellement

Connectez-vous à votre base de données PostgreSQL et exécutez les commandes suivantes :

```sql
-- Le schéma sera automatiquement créé au premier déploiement
-- Si besoin, vous pouvez exécuter drizzle-kit push localement avec DATABASE_URL de production
```

#### Option 3 : Via un script de migration

Créez un fichier `scripts/init-db.ts` et utilisez GitHub Actions ou Vercel pour l'exécuter une fois.

### 5. Vérifier le déploiement

1. Ouvrez l'URL fournie par Vercel (ex: `sgx-intendance.vercel.app`)
2. Vérifiez que la page d'accueil s'affiche
3. Testez l'API : `https://votre-app.vercel.app/api/health`
4. Créez un site, un équipement, une intervention pour tester

### 6. Configuration DNS personnalisé (Optionnel)

Si vous avez un nom de domaine :

1. Dans Vercel, allez dans "Settings" > "Domains"
2. Ajoutez votre domaine personnalisé
3. Configurez les DNS selon les instructions Vercel

## 🔧 Configuration des variables d'environnement

Dans Vercel, ajoutez ces variables :

| Variable | Valeur | Description |
|----------|--------|-------------|
| `DATABASE_URL` | `postgresql://...` | Chaîne de connexion PostgreSQL |

## 📊 Scripts utiles

```bash
# Générer les types TypeScript pour les routes
npm run typegen

# Vérifier les types TypeScript
npm run typecheck

# Build de production en local
npm run build

# Démarrer en production en local
npm start

# Pousser le schéma vers la base de données
npx drizzle-kit push

# Ouvrir Drizzle Studio (interface graphique DB)
npx drizzle-kit studio
```

## 🔄 Déploiements automatiques

Vercel déploie automatiquement à chaque push sur la branche `main` :

```bash
# Faire des modifications
git add .
git commit -m "Description des changements"
git push

# Vercel déploie automatiquement !
```

## 🐛 Résolution des problèmes

### Erreur de connexion à la base de données

- Vérifiez que `DATABASE_URL` est bien configurée dans Vercel
- Assurez-vous que l'URL contient `?sslmode=require` pour Neon
- Vérifiez que votre IP est autorisée (certains fournisseurs limitent les connexions)

### Erreur de build

```bash
# Testez le build en local
npm run build

# Si ça fonctionne localement, vérifiez les logs Vercel
vercel logs
```

### Tables manquantes

```bash
# Connectez-vous à la base de données et appliquez le schéma
npx drizzle-kit push
```

## 📝 Commandes Git utiles

```bash
# Vérifier le statut
git status

# Voir les modifications
git diff

# Ajouter tous les fichiers modifiés
git add .

# Commit avec message
git commit -m "Votre message"

# Pousser vers GitHub
git push

# Voir l'historique
git log

# Créer une nouvelle branche
git checkout -b nom-de-branche

# Fusionner une branche
git checkout main
git merge nom-de-branche
```

## 🎯 Checklist avant déploiement

- [ ] Base de données PostgreSQL créée
- [ ] `DATABASE_URL` copiée
- [ ] Code poussé sur GitHub
- [ ] Projet créé sur Vercel
- [ ] Variable d'environnement `DATABASE_URL` configurée
- [ ] Déploiement réussi
- [ ] Schéma de base de données appliqué
- [ ] Application testée et fonctionnelle

## 🌟 Bonnes pratiques

1. **Ne jamais commiter `.env`** - Utilisez `.env.example` comme modèle
2. **Utilisez des branches** pour les nouvelles fonctionnalités
3. **Testez localement** avant de pousser
4. **Sauvegardez la base de données** régulièrement
5. **Surveillez les logs** Vercel pour détecter les erreurs

## 📞 Support

- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Drizzle ORM](https://orm.drizzle.team)
- [Documentation Neon](https://neon.tech/docs/introduction)

---

**Votre application SGX-Intendance est maintenant prête pour Vercel !** 🚀
