import { db } from '@/db';
import { interventions, equipements, sites } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const allInterventions = await db
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
      .orderBy(desc(interventions.createdAt));

    return NextResponse.json(allInterventions);
  } catch (error) {
    console.error('Erreur lors de la récupération des interventions:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const [nouvelleIntervention] = await db
      .insert(interventions)
      .values({
        titre: body.titre,
        description: body.description,
        typeIntervention: body.typeIntervention,
        categorieIntervention: body.categorieIntervention,
        statut: body.statut || 'planifie',
        equipementId: body.equipementId ? parseInt(body.equipementId) : null,
        siteId: body.siteId ? parseInt(body.siteId) : null,
        technicien: body.technicien,
        typeExecutant: body.typeExecutant || 'interne',
        nomPrestataire: body.nomPrestataire,
        nombrePersonnes: body.nombrePersonnes ? parseInt(body.nombrePersonnes) : 1,
        datePlanifiee: body.datePlanifiee ? new Date(body.datePlanifiee) : null,
        dateDebut: body.dateDebut ? new Date(body.dateDebut) : null,
        dateFin: body.dateFin ? new Date(body.dateFin) : null,
        dateRealisation: body.dateRealisation ? new Date(body.dateRealisation) : null,
        cout: body.cout ? parseInt(body.cout) : null,
        observations: body.observations,
        updatedAt: new Date(),
      })
      .returning();

    return NextResponse.json(nouvelleIntervention, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création de l\'intervention:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
