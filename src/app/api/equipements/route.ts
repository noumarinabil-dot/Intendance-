import { db } from '@/db';
import { equipements, sites } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const allEquipements = await db
      .select({
        id: equipements.id,
        nom: equipements.nom,
        categorie: equipements.categorie,
        type: equipements.type,
        marque: equipements.marque,
        modele: equipements.modele,
        numeroSerie: equipements.numeroSerie,
        siteId: equipements.siteId,
        siteName: sites.nom,
        localisation: equipements.localisation,
        dateAchat: equipements.dateAchat,
        dateMiseEnService: equipements.dateMiseEnService,
        etat: equipements.etat,
        observations: equipements.observations,
        createdAt: equipements.createdAt,
        updatedAt: equipements.updatedAt,
      })
      .from(equipements)
      .leftJoin(sites, eq(equipements.siteId, sites.id))
      .orderBy(desc(equipements.createdAt));

    return NextResponse.json(allEquipements);
  } catch (error) {
    console.error('Erreur lors de la récupération des équipements:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const [nouvelEquipement] = await db
      .insert(equipements)
      .values({
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
        etat: body.etat || 'bon',
        observations: body.observations,
        updatedAt: new Date(),
      })
      .returning();

    return NextResponse.json(nouvelEquipement, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création de l\'équipement:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
