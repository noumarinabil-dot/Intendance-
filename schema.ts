import { pgTable, serial, varchar, text, timestamp, integer, pgEnum } from 'drizzle-orm/pg-core';

// Enums
export const categorieEquipementEnum = pgEnum('categorie_equipement', [
  'levage', // Appareils de levage
  'energie', // Groupe électrogène
  'froid', // Armoire frigorifique, chambre froide
  'social', // Réfrigérateur, fontaine, micro-onde
  'autre'
]);

export const typeEquipementEnum = pgEnum('type_equipement', [
  'monte_charge',
  'gerbeur_electrique',
  'transpalette',
  'chariot_elevateur',
  'groupe_electrogene',
  'armoire_frigorifique',
  'chambre_froide',
  'refrigerateur',
  'fontaine_eau',
  'micro_onde',
  'autre'
]);

export const categorieInterventionEnum = pgEnum('categorie_intervention', [
  'electricite',
  'plomberie',
  'peinture',
  'menuiserie',
  'serrurerie',
  'eclairage',
  'levage',
  'climatisation',
  'autre'
]);

export const typeInterventionEnum = pgEnum('type_intervention', [
  'preventif',
  'curatif'
]);

export const statutInterventionEnum = pgEnum('statut_intervention', [
  'planifie',
  'en_cours',
  'termine',
  'annule'
]);

export const typeExecutantEnum = pgEnum('type_executant', [
  'interne',
  'externe'
]);

export const etatEquipementEnum = pgEnum('etat_equipement', [
  'excellent',
  'bon',
  'moyen',
  'mauvais',
  'hors_service'
]);

// Tables
export const sites = pgTable('sites', {
  id: serial('id').primaryKey(),
  nom: varchar('nom', { length: 255 }).notNull(),
  adresse: text('adresse'),
  ville: varchar('ville', { length: 100 }),
  codePostal: varchar('code_postal', { length: 20 }),
  telephone: varchar('telephone', { length: 20 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const equipements = pgTable('equipements', {
  id: serial('id').primaryKey(),
  nom: varchar('nom', { length: 255 }).notNull(),
  categorie: categorieEquipementEnum('categorie').notNull(),
  type: typeEquipementEnum('type').notNull(),
  marque: varchar('marque', { length: 100 }),
  modele: varchar('modele', { length: 100 }),
  numeroSerie: varchar('numero_serie', { length: 100 }),
  siteId: integer('site_id').references(() => sites.id),
  localisation: text('localisation'),
  dateAchat: timestamp('date_achat'),
  dateMiseEnService: timestamp('date_mise_en_service'),
  etat: etatEquipementEnum('etat').default('bon').notNull(),
  observations: text('observations'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const interventions = pgTable('interventions', {
  id: serial('id').primaryKey(),
  titre: varchar('titre', { length: 255 }).notNull(),
  description: text('description').notNull(),
  typeIntervention: typeInterventionEnum('type_intervention').notNull(),
  categorieIntervention: categorieInterventionEnum('categorie_intervention').notNull(),
  statut: statutInterventionEnum('statut').default('planifie').notNull(),
  equipementId: integer('equipement_id').references(() => equipements.id),
  siteId: integer('site_id').references(() => sites.id),
  technicien: varchar('technicien', { length: 255 }),
  typeExecutant: typeExecutantEnum('type_executant').default('interne'),
  nomPrestataire: varchar('nom_prestataire', { length: 255 }),
  nombrePersonnes: integer('nombre_personnes').default(1),
  datePlanifiee: timestamp('date_planifiee'),
  dateDebut: timestamp('date_debut'),
  dateFin: timestamp('date_fin'),
  dateRealisation: timestamp('date_realisation'),
  cout: integer('cout'), // en centimes
  observations: text('observations'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Types TypeScript
export type Site = typeof sites.$inferSelect;
export type NewSite = typeof sites.$inferInsert;

export type Equipement = typeof equipements.$inferSelect;
export type NewEquipement = typeof equipements.$inferInsert;

export type Intervention = typeof interventions.$inferSelect;
export type NewIntervention = typeof interventions.$inferInsert;
