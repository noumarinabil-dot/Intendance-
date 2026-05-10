# Nouvelles Fonctionnalités - SGX-Intendance

## 🆕 Fonctionnalités ajoutées

### 1. Planning des interventions

Une nouvelle page **Planning** (accessible depuis le menu principal) qui offre :

#### Vue chronologique optimisée
- **Interventions à venir** : Affichage de toutes les interventions planifiées prochainement
- **Historique** : Liste des interventions passées, terminées ou annulées
- Séparation claire entre les deux sections pour une meilleure lisibilité

#### Filtres avancés
- Filtrer par **type** : Préventif, Curatif ou Tous
- Filtrer par **statut** : Planifié, En cours, Terminé, Annulé ou Tous
- Filtrer par **type d'exécutant** : Interne, Externe ou Tous

#### Informations affichées
- Date planifiée mise en évidence
- Titre et description de l'intervention
- Type d'intervention (badge coloré)
- Type d'exécutant (badge coloré)
- Nom du responsable (agent ou prestataire)
- Nombre de personnes affectées
- Statut de l'intervention

### 2. Type d'exécutant

Possibilité de distinguer les interventions selon leur mode d'exécution :

#### Interne (Agent d'entretien)
- Interventions réalisées par vos propres agents d'entretien
- Saisie du nom de l'agent responsable
- Idéal pour les petites interventions quotidiennes

#### Externe (Prestataire)
- Interventions confiées à des entreprises externes
- Saisie du nom du prestataire ou de l'entreprise
- Utile pour les interventions spécialisées ou sous contrat

### 3. Nombre de personnes

Nouveau champ permettant d'indiquer :
- Le nombre d'agents affectés à l'intervention (interne)
- Le nombre de personnes envoyées par le prestataire (externe)
- Par défaut : 1 personne
- Utile pour la planification des ressources

### 4. Date planifiée

Pour les interventions préventives :
- **Obligatoire** pour toute intervention de type préventif
- Permet une meilleure planification
- Utilisée dans le planning pour l'affichage chronologique
- Distinction entre date planifiée et dates réelles d'exécution

## 📊 Améliorations de l'interface

### Formulaire d'intervention amélioré

Le formulaire de création/modification d'intervention inclut maintenant :

1. **Sélection du type d'exécutant**
   - Menu déroulant : Interne ou Externe
   - Change dynamiquement le label du champ suivant

2. **Champ responsable dynamique**
   - Si Interne : "Nom de l'agent"
   - Si Externe : "Nom du prestataire"

3. **Nombre de personnes**
   - Champ numérique avec minimum 1
   - Valeur par défaut : 1

4. **Date planifiée**
   - Champ date standard
   - Obligatoire uniquement pour les interventions préventives
   - Apparaît avec un astérisque (*) quand requis

### Page Planning

Interface dédiée avec :
- En-tête avec compteur d'interventions à venir
- Section historique avec son propre compteur
- Badges colorés pour identification rapide :
  - 🔵 Bleu = Interne
  - 🟣 Violet = Externe
  - 🟠 Orange = Curatif
  - 🟣 Violet = Préventif
- Icônes pour meilleure lisibilité :
  - 👥 Nombre de personnes
  - 🏢 Site
  - ⚙️ Équipement
  - 📅 Date planifiée

## 🎯 Cas d'usage

### Intervention interne simple
```
Type exécutant : Interne
Nom de l'agent : Jean Dupont
Nombre de personnes : 1
```

### Intervention externe avec équipe
```
Type exécutant : Externe
Nom du prestataire : Société Maintenance Pro
Nombre de personnes : 3
```

### Maintenance préventive planifiée
```
Type : Préventif
Date planifiée : 15/03/2024 (obligatoire)
Type exécutant : Externe
Nom du prestataire : Toyota Service
Nombre de personnes : 2
```

## 🔧 API et Base de données

### Nouveaux champs dans la table `interventions`

- `type_executant` : ENUM('interne', 'externe')
- `nom_prestataire` : VARCHAR(255) - Pour les prestataires externes
- `nombre_personnes` : INTEGER - Défaut : 1
- `date_planifiee` : TIMESTAMP - Date de planification de l'intervention

### Nouvelle route API

- `GET /api/planning` : Récupère toutes les interventions avec tri par date planifiée
- Supporte les filtres par date (paramètre `dateDebut`)

## 📈 Avantages

### Pour la gestion quotidienne
- ✅ Vision claire des interventions à venir
- ✅ Distinction entre travaux internes et externes
- ✅ Planification optimisée des ressources humaines
- ✅ Suivi du nombre d'intervenants nécessaires

### Pour la planification
- ✅ Calendrier des maintenances préventives
- ✅ Anticipation des coûts (internes vs externes)
- ✅ Meilleure organisation des équipes

### Pour le reporting
- ✅ Statistiques sur l'utilisation d'agents internes vs prestataires
- ✅ Historique complet avec détails d'exécution
- ✅ Analyse des coûts par type d'exécutant

## 🚀 Utilisation rapide

1. **Accéder au Planning** : Cliquer sur "Planning" dans le menu
2. **Filtrer les interventions** : Utiliser les filtres en haut de page
3. **Créer une intervention planifiée** :
   - Aller dans "Interventions"
   - Cliquer sur "+ Nouvelle Intervention"
   - Sélectionner le type d'exécutant
   - Remplir les informations
   - Pour préventif : **la date planifiée est obligatoire**
4. **Consulter le planning** : Retour sur la page Planning pour voir la nouvelle intervention

## 💡 Bonnes pratiques

### Pour les interventions préventives
- ✅ Toujours renseigner la date planifiée
- ✅ Indiquer le nombre de personnes pour la planification
- ✅ Préciser si c'est interne ou externe
- ✅ Créer les interventions à l'avance pour une meilleure organisation

### Pour les prestataires externes
- ✅ Utiliser des noms cohérents (ex: toujours "Toyota Service")
- ✅ Indiquer le nombre de techniciens envoyés
- ✅ Renseigner le coût pour le suivi budgétaire

### Pour les agents internes
- ✅ Utiliser les vrais noms des agents
- ✅ Permet de suivre la charge de travail par agent
- ✅ Facilite la formation et le suivi des compétences

---

**Toutes ces fonctionnalités sont maintenant disponibles dans l'application SGX-Intendance !** 🎉
