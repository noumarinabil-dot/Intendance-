import { db } from '@/db';
import { sites } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const allSites = await db.select().from(sites).orderBy(desc(sites.createdAt));
    return NextResponse.json(allSites);
  } catch (error) {
    console.error('Erreur lors de la récupération des sites:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const [nouveauSite] = await db
      .insert(sites)
      .values({
        nom: body.nom,
        adresse: body.adresse,
        ville: body.ville,
        codePostal: body.codePostal,
        telephone: body.telephone,
        updatedAt: new Date(),
      })
      .returning();

    return NextResponse.json(nouveauSite, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création du site:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
