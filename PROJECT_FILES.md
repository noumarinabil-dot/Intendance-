# 📂 Structure complète du projet SGX-Intendance

## Fichiers de configuration

```
sgx-intendance/
├── .gitignore                          # Fichiers ignorés par Git
├── .env.example                        # Template variables d'environnement
├── package.json                        # Dépendances et scripts npm
├── tsconfig.json                       # Configuration TypeScript
├── next.config.ts                      # Configuration Next.js
├── tailwind.config.ts                  # Configuration Tailwind CSS
├── postcss.config.mjs                  # Configuration PostCSS
├── eslint.config.mjs                   # Configuration ESLint
├── drizzle.config.json                 # Configuration Drizzle ORM
└── vercel.json                         # Configuration Vercel
```

## Documentation

```
├── README.md                           # Documentation technique principale
├── README_GITHUB.md                    # README pour GitHub
├── GUIDE_UTILISATION.md               # Guide utilisateur complet
├── DEPLOIEMENT_VERCEL.md              # Guide déploiement Vercel (FR)
├── DEPLOIEMENT_VERCEL_AR.md           # Guide déploiement Vercel (AR)
├── GITHUB_SETUP.md                     # Guide configuration GitHub
├── GITHUB_SETUP_AR.md                  # Guide configuration GitHub (AR)
├── QUICK_START.md                      # Démarrage rapide
├── NOUVELLES_FONCTIONNALITES.md       # Documentation nouvelles fonctionnalités
├── CONTRIBUTING.md                     # Guide de contribution
├── LICENSE                             # Licence MIT
└── PROJECT_FILES.md                    # Ce fichier
```

## Application Source

```
src/
├── app/
│   ├── layout.tsx                      # Layout principal avec navigation
│   ├── page.tsx                        # Dashboard (page d'accueil)
│   ├── globals.css                     # Styles globaux Tailwind
│   │
│   ├── api/                            # Routes API
│   │   ├── health/
│   │   │   └── route.ts               # Health check endpoint
│   │   ├── sites/
│   │   │   ├── route.ts               # GET/POST sites
│   │   │   └── [id]/
│   │   │       └── route.ts           # PUT/DELETE site par ID
│   │   ├── equipements/
│   │   │   ├── route.ts               # GET/POST équipements
│   │   │   └── [id]/
│   │   │       └── route.ts           # PUT/DELETE équipement par ID
│   │   ├── interventions/
│   │   │   ├── route.ts               # GET/POST interventions
│   │   │   └── [id]/
│   │   │       └── route.ts           # PUT/DELETE intervention par ID
│   │   ├── planning/
│   │   │   └── route.ts               # GET planning avec filtres
│   │   └── stats/
│   │       └── route.ts               # GET statistiques dashboard
│   │
│   ├── sites/
│   │   └── page.tsx                   # Page gestion des sites
│   ├── equipements/
│   │   └── page.tsx                   # Page gestion des équipements
│   ├── interventions/
│   │   └── page.tsx                   # Page gestion des interventions
│   └── planning/
│       └── page.tsx                   # Page planning chronologique
│
└── db/
    ├── index.ts                       # Configuration connexion DB
    └── schema.ts                      # Schéma Drizzle (tables, enums, types)
```

## Scripts

```
scripts/
└── init-production-db.sh              # Script initialisation DB production
```

## GitHub

```
.github/
└── workflows/
    └── ci.yml                         # GitHub Actions CI/CD
```

## Fichiers générés (non committé)

```
.next/                                 # Build Next.js (ignoré)
node_modules/                          # Dépendances npm (ignoré)
.env                                   # Variables d'environnement (ignoré)
.vercel/                               # Configuration Vercel locale (ignoré)
```

## Base de données

### Tables PostgreSQL (créées par Drizzle)

```sql
-- Sites
sites (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  adresse TEXT,
  ville VARCHAR(100),
  code_postal VARCHAR(20),
  telephone VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
)

-- Équipements
equipements (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  categorie ENUM ('levage', 'energie', 'froid', 'social', 'autre'),
  type ENUM (...types d'équipements...),
  marque VARCHAR(100),
  modele VARCHAR(100),
  numero_serie VARCHAR(100),
  site_id INTEGER REFERENCES sites(id),
  localisation TEXT,
  date_achat TIMESTAMP,
  date_mise_en_service TIMESTAMP,
  etat ENUM ('excellent', 'bon', 'moyen', 'mauvais', 'hors_service'),
  observations TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
)

-- Interventions
interventions (
  id SERIAL PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  type_intervention ENUM ('preventif', 'curatif'),
  categorie_intervention ENUM ('electricite', 'plomberie', ...),
  statut ENUM ('planifie', 'en_cours', 'termine', 'annule'),
  equipement_id INTEGER REFERENCES equipements(id),
  site_id INTEGER REFERENCES sites(id),
  technicien VARCHAR(255),
  type_executant ENUM ('interne', 'externe'),
  nom_prestataire VARCHAR(255),
  nombre_personnes INTEGER DEFAULT 1,
  date_planifiee TIMESTAMP,
  date_debut TIMESTAMP,
  date_fin TIMESTAMP,
  date_realisation TIMESTAMP,
  cout INTEGER,
  observations TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
)
```

## Routes de l'application

### Pages

- `/` - Tableau de bord
- `/planning` - Planning des interventions
- `/interventions` - Gestion des interventions
- `/equipements` - Gestion des équipements
- `/sites` - Gestion des sites

### API

- `GET /api/health` - Health check
- `GET /api/stats` - Statistiques dashboard
- `GET /api/planning` - Planning avec filtres
- `GET /api/sites` - Liste des sites
- `POST /api/sites` - Créer un site
- `PUT /api/sites/[id]` - Modifier un site
- `DELETE /api/sites/[id]` - Supprimer un site
- `GET /api/equipements` - Liste des équipements
- `POST /api/equipements` - Créer un équipement
- `PUT /api/equipements/[id]` - Modifier un équipement
- `DELETE /api/equipements/[id]` - Supprimer un équipement
- `GET /api/interventions` - Liste des interventions
- `POST /api/interventions` - Créer une intervention
- `PUT /api/interventions/[id]` - Modifier une intervention
- `DELETE /api/interventions/[id]` - Supprimer une intervention

## Technologies utilisées

### Core
- Next.js 16.2.5 (App Router)
- TypeScript 5.9.3
- React 19.2.6

### Base de données
- PostgreSQL (latest)
- Drizzle ORM 0.45.2
- drizzle-kit 0.31.10
- pg 8.20.0

### Styling
- Tailwind CSS 4.1.17
- PostCSS 8.5.8

### Dev Tools
- ESLint 9.39.4
- TypeScript Compiler

### Déploiement
- Vercel (plateforme)
- Neon/Supabase (base de données)

## Scripts NPM disponibles

```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm start            # Serveur de production
npm run lint         # Linter ESLint
npm run typecheck    # Vérification TypeScript
npm run typegen      # Génération types Next.js
npm run db:push      # Appliquer schéma DB
npm run db:studio    # Interface graphique DB
npm run db:init      # Initialiser DB production
```

## Variables d'environnement requises

```env
DATABASE_URL=postgresql://user:password@host:5432/database
```

## Taille approximative du projet

```
Code source:          ~50 KB
Documentation:        ~150 KB
node_modules:         ~500 MB (non committé)
Build (.next):        ~20 MB (non committé)
Base de données:      Varie selon les données
```

## Compatibilité

- **Node.js**: 18.x ou supérieur
- **Navigateurs**: Tous les navigateurs modernes
- **PostgreSQL**: 12.x ou supérieur
- **Vercel**: Compatible avec tous les plans

---

**Total: ~40 fichiers sources + documentation complète**
