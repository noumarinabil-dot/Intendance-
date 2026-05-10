# Guide d'utilisation - SGX-Intendance

## 🎯 Démarrage rapide

### 1️⃣ Premier pas : Créer vos sites

Rendez-vous dans **Sites** et créez vos différents sites :
- Usines
- Entrepôts
- Bureaux administratifs
- Ateliers
- Etc.

**Exemple** :
- Nom : "Usine de production A"
- Adresse : "123 Rue de l'Industrie"
- Ville : "Paris"
- Code postal : "75001"
- Téléphone : "+33 1 23 45 67 89"

### 2️⃣ Deuxième pas : Enregistrer vos équipements

Allez dans **Équipements** et ajoutez tous vos équipements :

#### Équipements de levage
- Monte-charge
- Gerbeur électrique
- Transpalette
- Chariot élévateur

#### Équipements énergétiques
- Groupe électrogène

#### Équipements frigorifiques
- Armoire frigorifique
- Chambre froide

#### Équipements sociaux
- Réfrigérateur
- Fontaine d'eau
- Micro-onde

**Pour chaque équipement, renseignez** :
- Nom descriptif
- Catégorie et type
- Marque et modèle
- Numéro de série (important pour la garantie)
- Site où il se trouve
- Localisation précise (étage, zone, etc.)
- Dates d'achat et de mise en service
- État actuel
- Observations éventuelles

### 3️⃣ Troisième pas : Gérer les interventions

Dans **Interventions**, vous pouvez créer deux types d'interventions avec des exécutants différents :

#### Types d'exécutants
- **Interne** : Agents d'entretien de votre entreprise
- **Externe** : Prestataires externes ou entreprises sous contrat

#### Créer une intervention curative (réparation)
**Exemples** :
- "Changement lampe bureau 205" (Catégorie : Éclairage)
- "Porte cassée entrepôt Zone B" (Catégorie : Menuiserie)
- "Fuite d'eau toilettes étage 3" (Catégorie : Plomberie)
- "Panne électrique atelier" (Catégorie : Électricité)

**Informations à renseigner** :
- Titre court et explicite
- Description détaillée du problème
- Type : **Curatif**
- Catégorie : Électricité, Plomberie, Peinture, etc.
- Statut : Planifié, En cours, Terminé, Annulé
- **Type exécutant** : Interne ou Externe
- **Nom de l'agent ou du prestataire**
- **Nombre de personnes** nécessaires
- Site et/ou équipement concerné
- Date planifiée
- Dates de début, fin et réalisation
- Coût estimé ou réel
- Observations

#### Planifier une intervention préventive
**Exemples** :
- "Révision annuelle chariot élévateur"
- "Contrôle mensuel groupe électrogène"
- "Maintenance trimestrielle chambre froide"
- "Vérification semestrielle monte-charge"
- "Peinture rafraîchissement bureaux"

**Informations à renseigner** :
- Titre descriptif
- Description de la maintenance à effectuer
- Type : **Préventif**
- Catégorie appropriée
- **Type exécutant** : Interne ou Externe
- Nom de l'agent ou du prestataire
- Nombre de personnes nécessaires
- **Date planifiée** (obligatoire pour les préventifs)
- Dates de début et fin prévues
- Budget prévu

### 4️⃣ Consulter le planning

Le **Planning** offre une vue chronologique optimisée :
- **Interventions à venir** : toutes les interventions planifiées
- **Historique** : interventions terminées ou annulées
- Filtres par type (préventif/curatif)
- Filtres par statut
- Filtres par type d'exécutant (interne/externe)
- Affichage du nombre de personnes affectées
- Vue claire des responsables (agents ou prestataires)

### 5️⃣ Suivre l'activité

Le **Tableau de bord** vous donne :
- Nombre total de sites, équipements et interventions
- Répartition des interventions par statut
- Répartition entre maintenance préventive et curative
- État général de vos équipements
- Interventions par catégorie

## 📋 Cas d'usage typiques

### Cas 1 : Changement de lampe
1. Aller dans "Interventions"
2. Cliquer sur "+ Nouvelle Intervention"
3. Remplir :
   - Titre : "Changement lampe bureau 305"
   - Description : "Néon grillé, à remplacer"
   - Type : Curatif
   - Catégorie : Éclairage
   - Statut : Planifié
   - Site : [Sélectionner le site]
   - Technicien : "Jean Électricien"
   - Date : Aujourd'hui
4. Sauvegarder

### Cas 2 : Porte cassée
1. Nouvelle intervention
2. Remplir :
   - Titre : "Réparation porte bureau 102"
   - Description : "Serrure cassée, porte ne ferme plus"
   - Type : Curatif
   - Catégorie : Serrurerie
   - Statut : Planifié
   - Site : [Sélectionner]
3. Sauvegarder

### Cas 3 : Peinture planifiée
1. Nouvelle intervention
2. Remplir :
   - Titre : "Peinture couloirs étage 2"
   - Description : "Rafraîchissement peinture des couloirs"
   - Type : Préventif
   - Catégorie : Peinture
   - Statut : Planifié
   - Date début : 15/02/2024
   - Date fin : 20/02/2024
   - Coût : 2500 €
3. Sauvegarder

### Cas 4 : Maintenance équipement de levage (Prestataire externe)
1. Nouvelle intervention
2. Remplir :
   - Titre : "Révision annuelle chariot élévateur"
   - Description : "Maintenance préventive annuelle obligatoire"
   - Type : Préventif
   - Catégorie : Levage
   - **Type exécutant : Externe (Prestataire)**
   - **Nom du prestataire : "Service Technique Toyota"**
   - **Nombre de personnes : 2**
   - Équipement : [Sélectionner le chariot élévateur]
   - **Date planifiée : 10/02/2024**
   - Coût : 450 €
3. Sauvegarder

### Cas 5 : Intervention électrique
1. Nouvelle intervention
2. Remplir :
   - Titre : "Réparation tableau électrique atelier"
   - Description : "Disjoncteur défectueux à remplacer"
   - Type : Curatif
   - Catégorie : Électricité
   - Site : Atelier
   - Statut : En cours
3. Sauvegarder

### Cas 6 : Plomberie (Agent interne)
1. Nouvelle intervention
2. Remplir :
   - Titre : "Fuite robinet salle de pause"
   - Description : "Joint à remplacer"
   - Type : Curatif
   - Catégorie : Plomberie
   - **Type exécutant : Interne (Agent d'entretien)**
   - **Nom de l'agent : "Marc Plombier"**
   - **Nombre de personnes : 1**
   - Statut : Terminé
   - Date réalisation : Aujourd'hui
   - Coût : 45 €
3. Sauvegarder

### Cas 7 : Intervention préventive avec plusieurs personnes
1. Nouvelle intervention
2. Remplir :
   - Titre : "Peinture complète bureaux étage 2"
   - Description : "Rafraîchissement complet peinture"
   - Type : Préventif
   - Catégorie : Peinture
   - **Type exécutant : Externe (Prestataire)**
   - **Nom du prestataire : "Peintures Pro"**
   - **Nombre de personnes : 4**
   - **Date planifiée : 15/03/2024**
   - Date début : 15/03/2024
   - Date fin : 18/03/2024
   - Coût : 3500 €
3. Sauvegarder

## 💡 Bonnes pratiques

### Pour les interventions
✅ Utiliser des titres clairs et descriptifs
✅ Renseigner le site ET/OU l'équipement concerné
✅ Mettre à jour le statut régulièrement
✅ Renseigner le coût réel après intervention
✅ Ajouter des observations utiles pour l'historique

### Pour les équipements
✅ Garder les numéros de série à jour
✅ Mettre à jour l'état après chaque intervention
✅ Renseigner les dates d'achat (important pour la garantie)
✅ Préciser la localisation exacte

### Pour la maintenance préventive
✅ Planifier les interventions à l'avance
✅ Respecter les fréquences recommandées par les fabricants
✅ Créer des interventions récurrentes dans le calendrier

## 🔍 Filtrage et recherche

- Les tableaux peuvent être triés par colonne
- Utilisez les badges de couleur pour identifier rapidement les statuts
- Les interventions affichent le site ET l'équipement concerné

## 📊 Statistiques

Le tableau de bord affiche en temps réel :
- Total des ressources (sites, équipements, interventions)
- Répartition des interventions (planifiées, en cours, terminées)
- Équilibre préventif/curatif
- État du parc d'équipements

## 🆘 Support

Pour toute question ou problème, consultez la documentation ou contactez l'administrateur système.

---

**Bonne gestion de votre maintenance ! 🔧**
