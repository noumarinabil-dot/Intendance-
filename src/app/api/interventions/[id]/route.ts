import { db } from '@/db';
import { interventions } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const [interventionMiseAJour] = await db
      .update(interventions)
      .set({
        titre: body.titre,
        description: body.description,
        typeIntervention: body.typeIntervention,
        categorieIntervention: body.categorieIntervention,
        statut: body.statut,
        equipementId: body.equipementId ? parseInt(body.equipementId) : null,
        siteId: body.siteId ? parseInt(body.siteId) : null,
        technicien: body.technicien,
        typeExecutant: body.typeExecutant,
        nomPrestataire: body.nomPrestataire,
        nombrePersonnes: body.nombrePersonnes ? parseInt(body.nombrePersonnes) : null,
        datePlanifiee: body.datePlanifiee ? new Date(body.datePlanifiee) : null,
        dateDebut: body.dateDebut ? new Date(body.dateDebut) : null,
        dateFin: body.dateFin ? new Date(body.dateFin) : null,
        dateRealisation: body.dateRealisation ? new Date(body.dateRealisation) : null,
        cout: body.cout ? parseInt(body.cout) : null,
        observations: body.observations,
        updatedAt: new Date(),
      })
      .where(eq(interventions.id, parseInt(id)))
      .returning();

    if (!interventionMiseAJour) {
      return NextResponse.json({ error: 'Intervention non trouvée' }, { status: 404 });
    }

    return NextResponse.json(interventionMiseAJour);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'intervention:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.delete(interventions).where(eq(interventions.id, parseInt(id)));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'intervention:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
