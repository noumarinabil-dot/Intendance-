'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Stats {
  totalEquipements: number;
  totalSites: number;
  totalInterventions: number;
  interventionsParStatut: Array<{ statut: string; count: number }>;
  interventionsParType: Array<{ type: string; count: number }>;
  equipementsParEtat: Array<{ etat: string; count: number }>;
  interventionsParCategorie: Array<{ categorie: string; count: number }>;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatutLabel = (statut: string) => {
    const labels: Record<string, string> = {
      planifie: 'Planifié',
      en_cours: 'En cours',
      termine: 'Terminé',
      annule: 'Annulé',
    };
    return labels[statut] || statut;
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      preventif: 'Préventif',
      curatif: 'Curatif',
    };
    return labels[type] || type;
  };

  const getEtatLabel = (etat: string) => {
    const labels: Record<string, string> = {
      excellent: 'Excellent',
      bon: 'Bon',
      moyen: 'Moyen',
      mauvais: 'Mauvais',
      hors_service: 'Hors service',
    };
    return labels[etat] || etat;
  };

  const getCategorieLabel = (categorie: string) => {
    const labels: Record<string, string> = {
      electricite: 'Électricité',
      plomberie: 'Plomberie',
      peinture: 'Peinture',
      menuiserie: 'Menuiserie',
      serrurerie: 'Serrurerie',
      eclairage: 'Éclairage',
      levage: 'Levage',
      climatisation: 'Climatisation',
      autre: 'Autre',
    };
    return labels[categorie] || categorie;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Chargement...</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">Erreur de chargement des données</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Tableau de bord</h1>
        <p className="text-gray-600">Vue d&apos;ensemble de la maintenance</p>
      </div>

      {/* Cartes de statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Sites</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{stats.totalSites}</p>
            </div>
            <div className="text-blue-500 text-4xl">🏢</div>
          </div>
          <Link href="/sites" className="text-blue-600 text-sm mt-4 inline-block hover:underline">
            Voir les sites →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Équipements</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{stats.totalEquipements}</p>
            </div>
            <div className="text-green-500 text-4xl">⚙️</div>
          </div>
          <Link href="/equipements" className="text-green-600 text-sm mt-4 inline-block hover:underline">
            Voir les équipements →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Interventions</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{stats.totalInterventions}</p>
            </div>
            <div className="text-purple-500 text-4xl">🔧</div>
          </div>
          <Link href="/interventions" className="text-purple-600 text-sm mt-4 inline-block hover:underline">
            Voir les interventions →
          </Link>
        </div>
      </div>

      {/* Statistiques détaillées */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Interventions par statut */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Interventions par statut</h2>
          {stats.interventionsParStatut.length > 0 ? (
            <div className="space-y-3">
              {stats.interventionsParStatut.map((item) => (
                <div key={item.statut} className="flex items-center justify-between">
                  <span className="text-gray-700">{getStatutLabel(item.statut)}</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Aucune intervention</p>
          )}
        </div>

        {/* Interventions par type */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Interventions par type</h2>
          {stats.interventionsParType.length > 0 ? (
            <div className="space-y-3">
              {stats.interventionsParType.map((item) => (
                <div key={item.type} className="flex items-center justify-between">
                  <span className="text-gray-700">{getTypeLabel(item.type)}</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Aucune intervention</p>
          )}
        </div>

        {/* Équipements par état */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">État des équipements</h2>
          {stats.equipementsParEtat.length > 0 ? (
            <div className="space-y-3">
              {stats.equipementsParEtat.map((item) => (
                <div key={item.etat} className="flex items-center justify-between">
                  <span className="text-gray-700">{getEtatLabel(item.etat)}</span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-semibold">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Aucun équipement</p>
          )}
        </div>

        {/* Interventions par catégorie */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Interventions par catégorie</h2>
          {stats.interventionsParCategorie.length > 0 ? (
            <div className="space-y-3">
              {stats.interventionsParCategorie.map((item) => (
                <div key={item.categorie} className="flex items-center justify-between">
                  <span className="text-gray-700">{getCategorieLabel(item.categorie)}</span>
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-semibold">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Aucune intervention</p>
          )}
        </div>
      </div>
    </div>
  );
}
