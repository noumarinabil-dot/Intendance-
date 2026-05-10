'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Intervention {
  id: number;
  titre: string;
  description: string;
  typeIntervention: string;
  categorieIntervention: string;
  statut: string;
  equipementId: number | null;
  equipementName: string | null;
  siteId: number | null;
  siteName: string | null;
  technicien: string | null;
  typeExecutant: string | null;
  nomPrestataire: string | null;
  nombrePersonnes: number | null;
  datePlanifiee: string | null;
  dateDebut: string | null;
  dateFin: string | null;
  dateRealisation: string | null;
  cout: number | null;
  observations: string | null;
}

export default function PlanningPage() {
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<'all' | 'preventif' | 'curatif'>('all');
  const [filterStatut, setFilterStatut] = useState<string>('all');
  const [filterExecutant, setFilterExecutant] = useState<string>('all');

  useEffect(() => {
    fetchPlanning();
  }, []);

  const fetchPlanning = async () => {
    try {
      const response = await fetch('/api/planning');
      const data = await response.json();
      setInterventions(data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatutBadge = (statut: string) => {
    const colors: Record<string, string> = {
      planifie: 'bg-blue-100 text-blue-800',
      en_cours: 'bg-yellow-100 text-yellow-800',
      termine: 'bg-green-100 text-green-800',
      annule: 'bg-red-100 text-red-800',
    };
    const labels: Record<string, string> = {
      planifie: 'Planifié',
      en_cours: 'En cours',
      termine: 'Terminé',
      annule: 'Annulé',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[statut]}`}>
        {labels[statut]}
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      preventif: 'bg-purple-100 text-purple-800',
      curatif: 'bg-orange-100 text-orange-800',
    };
    const labels: Record<string, string> = {
      preventif: 'Préventif',
      curatif: 'Curatif',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[type]}`}>
        {labels[type]}
      </span>
    );
  };

  const getExecutantBadge = (type: string | null) => {
    if (!type) return <span className="text-gray-400">-</span>;
    const colors: Record<string, string> = {
      interne: 'bg-teal-100 text-teal-800',
      externe: 'bg-indigo-100 text-indigo-800',
    };
    const labels: Record<string, string> = {
      interne: 'Interne',
      externe: 'Externe',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[type]}`}>
        {labels[type]}
      </span>
    );
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const isUpcoming = (dateString: string | null) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  const filteredInterventions = interventions.filter((intervention) => {
    if (filterType !== 'all' && intervention.typeIntervention !== filterType) return false;
    if (filterStatut !== 'all' && intervention.statut !== filterStatut) return false;
    if (filterExecutant !== 'all' && intervention.typeExecutant !== filterExecutant) return false;
    return true;
  });

  // Séparer les interventions futures et passées
  const upcomingInterventions = filteredInterventions.filter((i) => 
    isUpcoming(i.datePlanifiee) && i.statut !== 'termine' && i.statut !== 'annule'
  );
  const pastInterventions = filteredInterventions.filter((i) => 
    !isUpcoming(i.datePlanifiee) || i.statut === 'termine' || i.statut === 'annule'
  );

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Planning des Interventions</h1>
          <p className="text-gray-600 mt-1">Vue chronologique des interventions planifiées</p>
        </div>
        <Link
          href="/interventions"
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          + Nouvelle Intervention
        </Link>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as 'all' | 'preventif' | 'curatif')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">Tous les types</option>
              <option value="preventif">Préventif</option>
              <option value="curatif">Curatif</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
            <select
              value={filterStatut}
              onChange={(e) => setFilterStatut(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">Tous les statuts</option>
              <option value="planifie">Planifié</option>
              <option value="en_cours">En cours</option>
              <option value="termine">Terminé</option>
              <option value="annule">Annulé</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Exécutant</label>
            <select
              value={filterExecutant}
              onChange={(e) => setFilterExecutant(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">Tous les exécutants</option>
              <option value="interne">Interne</option>
              <option value="externe">Externe</option>
            </select>
          </div>
        </div>
      </div>

      {/* Interventions à venir */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
            📅
          </span>
          Interventions à venir ({upcomingInterventions.length})
        </h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {upcomingInterventions.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Aucune intervention planifiée prochainement
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date planifiée
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Intervention
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Exécutant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Responsable
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Personnes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {upcomingInterventions.map((intervention) => (
                    <tr key={intervention.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-semibold text-blue-600">
                        {formatDate(intervention.datePlanifiee)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <div className="font-semibold text-gray-900">{intervention.titre}</div>
                          <div className="text-sm text-gray-500">
                            {intervention.siteName && `🏢 ${intervention.siteName}`}
                            {intervention.siteName && intervention.equipementName && ' • '}
                            {intervention.equipementName && `⚙️ ${intervention.equipementName}`}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getTypeBadge(intervention.typeIntervention)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getExecutantBadge(intervention.typeExecutant)}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {intervention.typeExecutant === 'externe' 
                          ? intervention.nomPrestataire 
                          : intervention.technicien || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="bg-gray-100 px-2 py-1 rounded-full text-sm">
                          👥 {intervention.nombrePersonnes || 1}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatutBadge(intervention.statut)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Historique */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="bg-gray-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
            📋
          </span>
          Historique ({pastInterventions.length})
        </h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {pastInterventions.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Aucun historique disponible
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Intervention
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Exécutant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Responsable
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pastInterventions.map((intervention) => (
                    <tr key={intervention.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {formatDate(intervention.dateRealisation || intervention.datePlanifiee)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <div className="font-semibold text-gray-900">{intervention.titre}</div>
                          <div className="text-sm text-gray-500">
                            {intervention.siteName && `🏢 ${intervention.siteName}`}
                            {intervention.siteName && intervention.equipementName && ' • '}
                            {intervention.equipementName && `⚙️ ${intervention.equipementName}`}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getTypeBadge(intervention.typeIntervention)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getExecutantBadge(intervention.typeExecutant)}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {intervention.typeExecutant === 'externe' 
                          ? intervention.nomPrestataire 
                          : intervention.technicien || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatutBadge(intervention.statut)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
