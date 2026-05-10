import { db } from '@/db';
import { interventions, equipements, sites } from '@/db/schema';
import { eq, gte, desc, and } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateDebut = searchParams.get('dateDebut');
    const dateFin = searchParams.get('dateFin');

    let query = db
      .select({
        id: interventions.id,
        titre: interventions.titre,
        description: interventions.description,
        typeIntervention: interventions.typeIntervention,
        categorieIntervention: interventions.categorieIntervention,
        statut: interventions.statut,
        equipementId: interventions.equipementId,
        equipementName: equipements.nom,
        siteId: interventions.siteId,
        siteName: sites.nom,
        technicien: interventions.technicien,
        typeExecutant: interventions.typeExecutant,
        nomPrestataire: interventions.nomPrestataire,
        nombrePersonnes: interventions.nombrePersonnes,
        datePlanifiee: interventions.datePlanifiee,
        dateDebut: interventions.dateDebut,
        dateFin: interventions.dateFin,
        dateRealisation: interventions.dateRealisation,
        cout: interventions.cout,
        observations: interventions.observations,
        createdAt: interventions.createdAt,
        updatedAt: interventions.updatedAt,
      })
      .from(interventions)
      .leftJoin(equipements, eq(interventions.equipementId, equipements.id))
      .leftJoin(sites, eq(interventions.siteId, sites.id))
      .$dynamic();

    // Filtrer par date si spécifié
    const conditions = [];
    
    if (dateDebut) {
      conditions.push(gte(interventions.datePlanifiee, new Date(dateDebut)));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const planning = await query.orderBy(desc(interventions.datePlanifiee));

    return NextResponse.json(planning);
  } catch (error) {
    console.error('Erreur lors de la récupération du planning:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
