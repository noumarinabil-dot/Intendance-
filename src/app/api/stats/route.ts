import { db } from '@/db';
import { interventions, equipements, sites } from '@/db/schema';
import { eq, count, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Compte total des équipements
    const totalEquipements = await db.select({ count: count() }).from(equipements);
    
    // Compte total des sites
    const totalSites = await db.select({ count: count() }).from(sites);
    
    // Compte total des interventions
    const totalInterventions = await db.select({ count: count() }).from(interventions);
    
    // Interventions par statut
    const interventionsParStatut = await db
      .select({
        statut: interventions.statut,
        count: count(),
      })
      .from(interventions)
      .groupBy(interventions.statut);
    
    // Interventions par type
    const interventionsParType = await db
      .select({
        type: interventions.typeIntervention,
        count: count(),
      })
      .from(interventions)
      .groupBy(interventions.typeIntervention);
    
    // Équipements par état
    const equipementsParEtat = await db
      .select({
        etat: equipements.etat,
        count: count(),
      })
      .from(equipements)
      .groupBy(equipements.etat);
    
    // Interventions par catégorie
    const interventionsParCategorie = await db
      .select({
        categorie: interventions.categorieIntervention,
        count: count(),
      })
      .from(interventions)
      .groupBy(interventions.categorieIntervention);

    return NextResponse.json({
      totalEquipements: totalEquipements[0]?.count || 0,
      totalSites: totalSites[0]?.count || 0,
      totalInterventions: totalInterventions[0]?.count || 0,
      interventionsParStatut,
      interventionsParType,
      equipementsParEtat,
      interventionsParCategorie,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
