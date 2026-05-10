# 🚀 Quick Start - SGX-Intendance

Guide de démarrage rapide pour lancer l'application en 5 minutes.

## Option 1 : Déploiement Vercel (Recommandé)

### 1. Créer une base de données Neon (Gratuit)

1. Allez sur [neon.tech](https://neon.tech)
2. Inscrivez-vous gratuitement
3. Créez un nouveau projet "sgx-intendance"
4. Copiez le `DATABASE_URL`

### 2. Déployer sur Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/votre-username/sgx-intendance)

1. Cliquez sur le bouton ci-dessus
2. Connectez votre compte GitHub
3. Dans les variables d'environnement, ajoutez :
   - `DATABASE_URL` : votre URL Neon
4. Cliquez sur "Deploy"
5. Attendez 2-3 minutes ⏰

### 3. Initialiser la base de données

Une fois déployé :

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Aller dans le projet
cd sgx-intendance

# Lier au projet Vercel
vercel link

# Télécharger les variables d'environnement
vercel env pull .env.production

# Appliquer le schéma
npx drizzle-kit push
```

### 4. C'est prêt ! ✅

Votre application est accessible sur : `https://votre-app.vercel.app`

---

## Option 2 : Installation locale

### 1. Prérequis

- Node.js 18+ installé
- PostgreSQL installé et démarré

### 2. Installation

```bash
# Cloner le repo
git clone https://github.com/votre-username/sgx-intendance.git
cd sgx-intendance

# Installer les dépendances
npm install

# Copier .env
cp .env.example .env
```

### 3. Configuration

Éditez `.env` :

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/sgx_intendance
```

### 4. Initialiser la base de données

```bash
# Créer la base de données
createdb sgx_intendance

# Appliquer le schéma
npm run db:push
```

### 5. Démarrer

```bash
# Mode développement
npm run dev
```

Ouvrez http://localhost:3000 🎉

---

## Premiers pas dans l'application

### 1. Créer un site

1. Allez dans "Sites"
2. Cliquez sur "+ Nouveau Site"
3. Remplissez les informations
4. Sauvegardez

### 2. Ajouter un équipement

1. Allez dans "Équipements"
2. Cliquez sur "+ Nouvel Équipement"
3. Choisissez le type (monte-charge, chariot élévateur, etc.)
4. Associez à un site
5. Sauvegardez

### 3. Planifier une intervention

1. Allez dans "Interventions"
2. Cliquez sur "+ Nouvelle Intervention"
3. Remplissez :
   - Titre : "Maintenance préventive chariot"
   - Type : Préventif
   - Catégorie : Levage
   - Type exécutant : Externe ou Interne
   - Date planifiée
4. Sauvegardez

### 4. Consulter le planning

1. Allez dans "Planning"
2. Voyez toutes vos interventions planifiées
3. Utilisez les filtres pour trier

---

## Commandes utiles

```bash
# Développement
npm run dev              # Démarrer en mode dev
npm run build            # Build de production
npm start                # Démarrer en prod

# Base de données
npm run db:push          # Appliquer le schéma
npm run db:studio        # Interface graphique DB

# Qualité du code
npm run typecheck        # Vérifier TypeScript
npm run lint             # Linter
npm run typegen          # Générer types Next.js
```

---

## Données de démonstration

Pour ajouter des données de test rapidement :

```bash
# Se connecter à la base de données
psql $DATABASE_URL

# Copier-coller le SQL de création de données
# Voir les fichiers d'exemple dans le repo
```

Ou créez-les manuellement via l'interface !

---

## Besoin d'aide ?

- 📚 [Documentation complète](./README.md)
- 📖 [Guide utilisateur](./GUIDE_UTILISATION.md)
- 🚀 [Guide déploiement Vercel](./DEPLOIEMENT_VERCEL.md)
- 🐛 [Signaler un bug](https://github.com/votre-username/sgx-intendance/issues)

---

## Next Steps

- [ ] Créer 3-5 sites
- [ ] Ajouter 10-15 équipements
- [ ] Planifier 5-10 interventions
- [ ] Explorer le dashboard
- [ ] Consulter le planning
- [ ] Personnaliser selon vos besoins

**Bon courage avec votre gestion de maintenance ! 💪**
