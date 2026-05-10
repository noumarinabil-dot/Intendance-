import { db } from '@/db';
import { equipements } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const [equipementMisAJour] = await db
      .update(equipements)
      .set({
        nom: body.nom,
        categorie: body.categorie,
        type: body.type,
        marque: body.marque,
        modele: body.modele,
        numeroSerie: body.numeroSerie,
        siteId: body.siteId ? parseInt(body.siteId) : null,
        localisation: body.localisation,
        dateAchat: body.dateAchat ? new Date(body.dateAchat) : null,
        dateMiseEnService: body.dateMiseEnService ? new Date(body.dateMiseEnService) : null,
        etat: body.etat,
        observations: body.observations,
        updatedAt: new Date(),
      })
      .where(eq(equipements.id, parseInt(id)))
      .returning();

    if (!equipementMisAJour) {
      return NextResponse.json({ error: 'Équipement non trouvé' }, { status: 404 });
    }

    return NextResponse.json(equipementMisAJour);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'équipement:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.delete(equipements).where(eq(equipements.id, parseInt(id)));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'équipement:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
