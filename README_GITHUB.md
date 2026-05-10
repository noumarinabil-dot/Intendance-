# 🏢 SGX-Intendance

Application complète de gestion de la maintenance des sites et équipements.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)

## ✨ Fonctionnalités

### 📊 Tableau de bord
- Vue d'ensemble avec statistiques en temps réel
- Répartition des interventions par statut et type
- État du parc d'équipements
- Indicateurs clés de performance

### 🏗️ Gestion des sites
- Création et gestion des différents sites
- Informations complètes (adresse, contacts, etc.)
- Suivi par site

### ⚙️ Gestion des équipements

**Équipements de levage:**
- Monte-charge
- Gerbeur électrique
- Transpalette
- Chariot élévateur

**Équipements énergétiques:**
- Groupe électrogène

**Équipements frigorifiques:**
- Armoire frigorifique
- Chambre froide

**Équipements sociaux:**
- Réfrigérateur
- Fontaine d'eau
- Micro-onde

### 🔧 Gestion des interventions

**Types d'interventions:**
- **Préventif** : Maintenance planifiée
- **Curatif** : Réparations

**Catégories:**
- Électricité
- Plomberie
- Peinture
- Menuiserie
- Serrurerie
- Éclairage
- Levage
- Climatisation

**Types d'exécutants:**
- **Interne** : Agents d'entretien
- **Externe** : Prestataires

### 📅 Planning
- Vue chronologique des interventions
- Filtres multiples (type, statut, exécutant)
- Séparation interventions à venir / historique
- Suivi du nombre de personnes affectées

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+
- PostgreSQL
- npm ou yarn

### Installation

```bash
# Cloner le repository
git clone https://github.com/votre-username/sgx-intendance.git
cd sgx-intendance

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env

# Éditer .env et ajouter votre DATABASE_URL
nano .env
```

### Configuration de la base de données

```bash
# Appliquer le schéma
npx drizzle-kit push
```

### Démarrage

```bash
# Mode développement
npm run dev

# Build de production
npm run build

# Démarrage en production
npm start
```

L'application sera accessible sur `http://localhost:3000`

## 📦 Déploiement sur Vercel

### Déploiement rapide

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/votre-username/sgx-intendance)

### Déploiement manuel

1. **Créer une base de données PostgreSQL**
   - Utilisez [Neon](https://neon.tech) (gratuit)
   - Ou [Vercel Postgres](https://vercel.com/storage/postgres)
   - Ou [Supabase](https://supabase.com)

2. **Déployer sur Vercel**
   ```bash
   npm i -g vercel
   vercel login
   vercel
   ```

3. **Configurer les variables d'environnement**
   - `DATABASE_URL` : Votre chaîne de connexion PostgreSQL

4. **Appliquer le schéma**
   ```bash
   npx drizzle-kit push
   ```

Voir [DEPLOIEMENT_VERCEL.md](./DEPLOIEMENT_VERCEL.md) pour le guide complet.

## 🛠️ Technologies utilisées

- **Framework** : [Next.js 16](https://nextjs.org) (App Router)
- **Langage** : [TypeScript](https://www.typescriptlang.org)
- **Base de données** : [PostgreSQL](https://www.postgresql.org)
- **ORM** : [Drizzle ORM](https://orm.drizzle.team)
- **Styling** : [Tailwind CSS](https://tailwindcss.com)
- **Hébergement** : [Vercel](https://vercel.com)

## 📁 Structure du projet

```
sgx-intendance/
├── src/
│   ├── app/
│   │   ├── api/              # Routes API
│   │   │   ├── equipements/
│   │   │   ├── interventions/
│   │   │   ├── sites/
│   │   │   ├── planning/
│   │   │   └── stats/
│   │   ├── equipements/      # Pages équipements
│   │   ├── interventions/    # Pages interventions
│   │   ├── planning/         # Page planning
│   │   ├── sites/            # Pages sites
│   │   ├── layout.tsx        # Layout principal
│   │   └── page.tsx          # Dashboard
│   └── db/
│       ├── index.ts          # Configuration DB
│       └── schema.ts         # Schéma Drizzle
├── public/                   # Fichiers statiques
├── .env.example             # Variables d'environnement
├── drizzle.config.json      # Config Drizzle
├── next.config.ts           # Config Next.js
├── tailwind.config.ts       # Config Tailwind
└── tsconfig.json            # Config TypeScript
```

## 📚 Documentation

- [README.md](./README.md) - Documentation technique
- [GUIDE_UTILISATION.md](./GUIDE_UTILISATION.md) - Guide utilisateur
- [DEPLOIEMENT_VERCEL.md](./DEPLOIEMENT_VERCEL.md) - Guide de déploiement
- [DEPLOIEMENT_VERCEL_AR.md](./DEPLOIEMENT_VERCEL_AR.md) - دليل النشر بالعربية
- [NOUVELLES_FONCTIONNALITES.md](./NOUVELLES_FONCTIONNALITES.md) - Nouvelles fonctionnalités

## 🤝 Contribution

Les contributions sont les bienvenues !

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Scripts disponibles

```bash
npm run dev          # Démarrer en mode développement
npm run build        # Build de production
npm start            # Démarrer le serveur de production
npm run typecheck    # Vérification TypeScript
npm run typegen      # Générer les types Next.js
```

## 🔒 Variables d'environnement

Créez un fichier `.env` à la racine :

```env
DATABASE_URL=postgresql://user:password@host:5432/database
```

Voir `.env.example` pour plus de détails.

## 📊 Base de données

L'application utilise PostgreSQL avec Drizzle ORM.

**Tables principales :**
- `sites` - Gestion des sites
- `equipements` - Inventaire des équipements
- `interventions` - Historique et planification

**Commandes utiles :**
```bash
npx drizzle-kit push      # Appliquer le schéma
npx drizzle-kit studio    # Interface graphique DB
```

## 🌐 Langues supportées

- 🇫🇷 Français (interface complète)
- 🇸🇦 العربية (documentation)

## 📄 Licence

Ce projet est sous licence MIT.

## 👨‍💻 Auteur

SGX-Intendance - Système de Gestion de Maintenance

## 🙏 Remerciements

- Next.js Team
- Drizzle Team
- Vercel
- Tous les contributeurs open source

---

**Fait avec ❤️ pour une meilleure gestion de la maintenance**

## 📞 Support

Pour toute question ou problème :
- Ouvrez une [issue](https://github.com/votre-username/sgx-intendance/issues)
- Consultez la [documentation](./README.md)

## 🎯 Roadmap

- [ ] Export Excel/PDF des rapports
- [ ] Notifications par email
- [ ] Application mobile
- [ ] Module de gestion des contrats
- [ ] Tableau de bord analytique avancé
- [ ] Multi-utilisateurs avec authentification
- [ ] Historique des modifications
- [ ] Pièces jointes (photos, documents)

---

⭐ Si ce projet vous aide, n'hésitez pas à lui donner une étoile !
