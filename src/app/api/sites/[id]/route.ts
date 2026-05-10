import { db } from '@/db';
import { sites } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const [siteMisAJour] = await db
      .update(sites)
      .set({
        nom: body.nom,
        adresse: body.adresse,
        ville: body.ville,
        codePostal: body.codePostal,
        telephone: body.telephone,
        updatedAt: new Date(),
      })
      .where(eq(sites.id, parseInt(id)))
      .returning();

    if (!siteMisAJour) {
      return NextResponse.json({ error: 'Site non trouvé' }, { status: 404 });
    }

    return NextResponse.json(siteMisAJour);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du site:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.delete(sites).where(eq(sites.id, parseInt(id)));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur lors de la suppression du site:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
