# SGX-Intendance

Application de gestion de la maintenance des sites et équipements.

## 📋 Description

SGX-Intendance est une application complète de gestion de la maintenance qui permet de :

- **Gérer les sites** : Enregistrer et suivre tous vos sites (usines, entrepôts, bureaux, etc.)
- **Gérer les équipements** : Suivre l'inventaire complet des équipements avec leur état
- **Gérer les interventions** : Planifier et suivre toutes les interventions de maintenance

## 🏗️ Types d'équipements gérés

### Appareils de levage
- Monte-charge
- Gerbeur électrique
- Transpalette
- Chariot élévateur

### Équipements énergétiques
- Groupe électrogène

### Équipements frigorifiques
- Armoire frigorifique
- Chambre froide

### Équipements sociaux
- Réfrigérateur
- Fontaine d'eau
- Micro-onde

## 🔧 Types d'interventions

### Par catégorie
- Électricité
- Plomberie
- Peinture
- Menuiserie
- Serrurerie
- Éclairage (changement de lampes)
- Levage
- Climatisation

### Par type
- **Préventif** : Maintenance planifiée et régulière
- **Curatif** : Réparations suite à une panne ou un dysfonctionnement

## 🚀 Fonctionnalités

### Tableau de bord
- Vue d'ensemble avec statistiques
- Nombre total de sites, équipements et interventions
- Répartition des interventions par statut, type et catégorie
- État des équipements

### Gestion des sites
- Création, modification et suppression de sites
- Informations complètes (nom, adresse, ville, code postal, téléphone)

### Gestion des équipements
- Création, modification et suppression d'équipements
- Informations détaillées :
  - Nom, catégorie, type
  - Marque, modèle, numéro de série
  - Site et localisation
  - Dates d'achat et de mise en service
  - État (excellent, bon, moyen, mauvais, hors service)
  - Observations
- Filtrage et recherche

### Gestion des interventions
- Création, modification et suppression d'interventions
- Informations complètes :
  - Titre et description détaillée
  - Type (préventif/curatif)
  - Catégorie (électricité, plomberie, etc.)
  - Statut (planifié, en cours, terminé, annulé)
  - Site et/ou équipement concerné
  - **Type d'exécutant** : Interne (agent d'entretien) ou Externe (prestataire)
  - Nom du responsable (agent ou prestataire)
  - Nombre de personnes affectées
  - Date planifiée (obligatoire pour les interventions préventives)
  - Dates (début, fin, réalisation)
  - Coût
  - Observations
- Suivi de l'état d'avancement

### Planning des interventions
- Vue chronologique des interventions planifiées
- Séparation entre interventions à venir et historique
- Filtres par type, statut et exécutant
- Affichage du nombre de personnes affectées
- Distinction visuelle entre interventions internes et externes
- Planning optimisé pour les interventions préventives

## 🛠️ Technologies utilisées

- **Framework** : Next.js 16 (App Router)
- **Base de données** : PostgreSQL
- **ORM** : Drizzle ORM
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **Déploiement** : Production-ready

## 📦 Installation et démarrage

### Prérequis
- Node.js 18+
- PostgreSQL

### Installation
```bash
npm install
```

### Configuration
Créer un fichier `.env` avec :
```
DATABASE_URL=postgresql://user:password@host:5432/database
```

### Initialisation de la base de données
```bash
npx drizzle-kit push
```

### Démarrage en développement
```bash
npm run dev
```

### Build pour la production
```bash
npm run build
npm start
```

L'application sera accessible sur `http://localhost:3000`

## 📊 Structure de la base de données

### Tables principales

**sites**
- Informations sur les différents sites/locaux

**equipements**
- Inventaire complet des équipements avec leur état et localisation

**interventions**
- Historique et planification de toutes les interventions de maintenance

## 🎯 Utilisation

1. **Commencer par créer vos sites** dans l'onglet "Sites"
2. **Enregistrer vos équipements** dans l'onglet "Équipements"
3. **Planifier et suivre les interventions** dans l'onglet "Interventions"
4. **Consulter le tableau de bord** pour avoir une vue d'ensemble

## 📝 Exemples d'interventions

- Changement de lampes dans un bureau
- Réparation d'une porte cassée
- Travaux de peinture
- Intervention électrique
- Réparation plomberie
- Maintenance préventive d'équipements de levage
- Contrôle de groupe électrogène
- Maintenance de chambre froide

## 🔐 Sécurité

- Validation des données côté serveur
- Protection des routes API
- Gestion sécurisée de la base de données

## 📄 Licence

© 2024 SGX-Intendance - Tous droits réservés
