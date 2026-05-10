'use client';

import { useEffect, useState } from 'react';

interface Equipement {
  id: number;
  nom: string;
  categorie: string;
  type: string;
  marque: string | null;
  modele: string | null;
  numeroSerie: string | null;
  siteId: number | null;
  siteName: string | null;
  localisation: string | null;
  dateAchat: string | null;
  dateMiseEnService: string | null;
  etat: string;
  observations: string | null;
}

interface Site {
  id: number;
  nom: string;
}

export default function EquipementsPage() {
  const [equipements, setEquipements] = useState<Equipement[]>([]);
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    nom: '',
    categorie: 'levage',
    type: 'monte_charge',
    marque: '',
    modele: '',
    numeroSerie: '',
    siteId: '',
    localisation: '',
    dateAchat: '',
    dateMiseEnService: '',
    etat: 'bon',
    observations: '',
  });

  useEffect(() => {
    fetchEquipements();
    fetchSites();
  }, []);

  const fetchEquipements = async () => {
    try {
      const response = await fetch('/api/equipements');
      const data = await response.json();
      setEquipements(data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSites = async () => {
    try {
      const response = await fetch('/api/sites');
      const data = await response.json();
      setSites(data);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/equipements/${editingId}` : '/api/equipements';
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchEquipements();
        resetForm();
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleEdit = (equipement: Equipement) => {
    setFormData({
      nom: equipement.nom,
      categorie: equipement.categorie,
      type: equipement.type,
      marque: equipement.marque || '',
      modele: equipement.modele || '',
      numeroSerie: equipement.numeroSerie || '',
      siteId: equipement.siteId?.toString() || '',
      localisation: equipement.localisation || '',
      dateAchat: equipement.dateAchat ? equipement.dateAchat.split('T')[0] : '',
      dateMiseEnService: equipement.dateMiseEnService ? equipement.dateMiseEnService.split('T')[0] : '',
      etat: equipement.etat,
      observations: equipement.observations || '',
    });
    setEditingId(equipement.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet équipement ?')) return;
    
    try {
      await fetch(`/api/equipements/${id}`, { method: 'DELETE' });
      fetchEquipements();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      nom: '',
      categorie: 'levage',
      type: 'monte_charge',
      marque: '',
      modele: '',
      numeroSerie: '',
      siteId: '',
      localisation: '',
      dateAchat: '',
      dateMiseEnService: '',
      etat: 'bon',
      observations: '',
    });
    setEditingId(null);
    setShowForm(false);
  };

  const getEtatBadge = (etat: string) => {
    const colors: Record<string, string> = {
      excellent: 'bg-green-100 text-green-800',
      bon: 'bg-blue-100 text-blue-800',
      moyen: 'bg-yellow-100 text-yellow-800',
      mauvais: 'bg-orange-100 text-orange-800',
      hors_service: 'bg-red-100 text-red-800',
    };
    const labels: Record<string, string> = {
      excellent: 'Excellent',
      bon: 'Bon',
      moyen: 'Moyen',
      mauvais: 'Mauvais',
      hors_service: 'Hors service',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[etat]}`}>
        {labels[etat]}
      </span>
    );
  };

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gestion des Équipements</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          {showForm ? '✕ Fermer' : '+ Nouvel Équipement'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? 'Modifier l\'équipement' : 'Nouvel équipement'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de l&apos;équipement *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catégorie *
                </label>
                <select
                  required
                  value={formData.categorie}
                  onChange={(e) => setFormData({ ...formData, categorie: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="levage">Levage</option>
                  <option value="energie">Énergie</option>
                  <option value="froid">Froid</option>
                  <option value="social">Social</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type *
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="monte_charge">Monte-charge</option>
                  <option value="gerbeur_electrique">Gerbeur électrique</option>
                  <option value="transpalette">Transpalette</option>
                  <option value="chariot_elevateur">Chariot élévateur</option>
                  <option value="groupe_electrogene">Groupe électrogène</option>
                  <option value="armoire_frigorifique">Armoire frigorifique</option>
                  <option value="chambre_froide">Chambre froide</option>
                  <option value="refrigerateur">Réfrigérateur</option>
                  <option value="fontaine_eau">Fontaine d&apos;eau</option>
                  <option value="micro_onde">Micro-onde</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  État *
                </label>
                <select
                  required
                  value={formData.etat}
                  onChange={(e) => setFormData({ ...formData, etat: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="excellent">Excellent</option>
                  <option value="bon">Bon</option>
                  <option value="moyen">Moyen</option>
                  <option value="mauvais">Mauvais</option>
                  <option value="hors_service">Hors service</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Marque
                </label>
                <input
                  type="text"
                  value={formData.marque}
                  onChange={(e) => setFormData({ ...formData, marque: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Modèle
                </label>
                <input
                  type="text"
                  value={formData.modele}
                  onChange={(e) => setFormData({ ...formData, modele: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Numéro de série
                </label>
                <input
                  type="text"
                  value={formData.numeroSerie}
                  onChange={(e) => setFormData({ ...formData, numeroSerie: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Site
                </label>
                <select
                  value={formData.siteId}
                  onChange={(e) => setFormData({ ...formData, siteId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">-- Sélectionner un site --</option>
                  {sites.map((site) => (
                    <option key={site.id} value={site.id}>
                      {site.nom}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Localisation
                </label>
                <input
                  type="text"
                  value={formData.localisation}
                  onChange={(e) => setFormData({ ...formData, localisation: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date d&apos;achat
                </label>
                <input
                  type="date"
                  value={formData.dateAchat}
                  onChange={(e) => setFormData({ ...formData, dateAchat: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date de mise en service
                </label>
                <input
                  type="date"
                  value={formData.dateMiseEnService}
                  onChange={(e) => setFormData({ ...formData, dateMiseEnService: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Observations
              </label>
              <textarea
                value={formData.observations}
                onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
              >
                {editingId ? 'Mettre à jour' : 'Créer'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Site
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Localisation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  État
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {equipements.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Aucun équipement enregistré
                  </td>
                </tr>
              ) : (
                equipements.map((equipement) => (
                  <tr key={equipement.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {equipement.nom}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {equipement.type.replace(/_/g, ' ')}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {equipement.siteName || '-'}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {equipement.localisation || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getEtatBadge(equipement.etat)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(equipement)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        ✏️ Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(equipement.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        🗑️ Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
