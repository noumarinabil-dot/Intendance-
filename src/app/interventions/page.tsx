'use client';

import { useEffect, useState } from 'react';

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

interface Site {
  id: number;
  nom: string;
}

interface Equipement {
  id: number;
  nom: string;
}

export default function InterventionsPage() {
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [sites, setSites] = useState<Site[]>([]);
  const [equipements, setEquipements] = useState<Equipement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    typeIntervention: 'curatif',
    categorieIntervention: 'electricite',
    statut: 'planifie',
    equipementId: '',
    siteId: '',
    technicien: '',
    typeExecutant: 'interne',
    nomPrestataire: '',
    nombrePersonnes: '1',
    datePlanifiee: '',
    dateDebut: '',
    dateFin: '',
    dateRealisation: '',
    cout: '',
    observations: '',
  });

  useEffect(() => {
    fetchInterventions();
    fetchSites();
    fetchEquipements();
  }, []);

  const fetchInterventions = async () => {
    try {
      const response = await fetch('/api/interventions');
      const data = await response.json();
      setInterventions(data);
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

  const fetchEquipements = async () => {
    try {
      const response = await fetch('/api/equipements');
      const data = await response.json();
      setEquipements(data);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/interventions/${editingId}` : '/api/interventions';
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchInterventions();
        resetForm();
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleEdit = (intervention: Intervention) => {
    setFormData({
      titre: intervention.titre,
      description: intervention.description,
      typeIntervention: intervention.typeIntervention,
      categorieIntervention: intervention.categorieIntervention,
      statut: intervention.statut,
      equipementId: intervention.equipementId?.toString() || '',
      siteId: intervention.siteId?.toString() || '',
      technicien: intervention.technicien || '',
      typeExecutant: intervention.typeExecutant || 'interne',
      nomPrestataire: intervention.nomPrestataire || '',
      nombrePersonnes: intervention.nombrePersonnes?.toString() || '1',
      datePlanifiee: intervention.datePlanifiee ? intervention.datePlanifiee.split('T')[0] : '',
      dateDebut: intervention.dateDebut ? intervention.dateDebut.split('T')[0] : '',
      dateFin: intervention.dateFin ? intervention.dateFin.split('T')[0] : '',
      dateRealisation: intervention.dateRealisation ? intervention.dateRealisation.split('T')[0] : '',
      cout: intervention.cout ? (intervention.cout / 100).toString() : '',
      observations: intervention.observations || '',
    });
    setEditingId(intervention.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette intervention ?')) return;
    
    try {
      await fetch(`/api/interventions/${id}`, { method: 'DELETE' });
      fetchInterventions();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      titre: '',
      description: '',
      typeIntervention: 'curatif',
      categorieIntervention: 'electricite',
      statut: 'planifie',
      equipementId: '',
      siteId: '',
      technicien: '',
      typeExecutant: 'interne',
      nomPrestataire: '',
      nombrePersonnes: '1',
      datePlanifiee: '',
      dateDebut: '',
      dateFin: '',
      dateRealisation: '',
      cout: '',
      observations: '',
    });
    setEditingId(null);
    setShowForm(false);
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

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gestion des Interventions</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          {showForm ? '✕ Fermer' : '+ Nouvelle Intervention'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? 'Modifier l\'intervention' : 'Nouvelle intervention'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre *
              </label>
              <input
                type="text"
                required
                value={formData.titre}
                onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Ex: Changement lampe bureau 101"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Décrivez l'intervention en détail..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type *
                </label>
                <select
                  required
                  value={formData.typeIntervention}
                  onChange={(e) => setFormData({ ...formData, typeIntervention: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="preventif">Préventif</option>
                  <option value="curatif">Curatif</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catégorie *
                </label>
                <select
                  required
                  value={formData.categorieIntervention}
                  onChange={(e) => setFormData({ ...formData, categorieIntervention: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="electricite">Électricité</option>
                  <option value="plomberie">Plomberie</option>
                  <option value="peinture">Peinture</option>
                  <option value="menuiserie">Menuiserie</option>
                  <option value="serrurerie">Serrurerie</option>
                  <option value="eclairage">Éclairage</option>
                  <option value="levage">Levage</option>
                  <option value="climatisation">Climatisation</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Statut *
                </label>
                <select
                  required
                  value={formData.statut}
                  onChange={(e) => setFormData({ ...formData, statut: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="planifie">Planifié</option>
                  <option value="en_cours">En cours</option>
                  <option value="termine">Terminé</option>
                  <option value="annule">Annulé</option>
                </select>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                  Équipement
                </label>
                <select
                  value={formData.equipementId}
                  onChange={(e) => setFormData({ ...formData, equipementId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">-- Sélectionner un équipement --</option>
                  {equipements.map((equipement) => (
                    <option key={equipement.id} value={equipement.id}>
                      {equipement.nom}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type exécutant *
                </label>
                <select
                  required
                  value={formData.typeExecutant}
                  onChange={(e) => setFormData({ ...formData, typeExecutant: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="interne">Interne (Agent d&apos;entretien)</option>
                  <option value="externe">Externe (Prestataire)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {formData.typeExecutant === 'externe' ? 'Nom du prestataire' : 'Nom de l\'agent'}
                </label>
                <input
                  type="text"
                  value={formData.typeExecutant === 'externe' ? formData.nomPrestataire : formData.technicien}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    ...(formData.typeExecutant === 'externe' 
                      ? { nomPrestataire: e.target.value } 
                      : { technicien: e.target.value })
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder={formData.typeExecutant === 'externe' ? 'Ex: Société ABC' : 'Ex: Jean Dupont'}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de personnes
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.nombrePersonnes}
                  onChange={(e) => setFormData({ ...formData, nombrePersonnes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Coût (€)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.cout}
                  onChange={(e) => setFormData({ ...formData, cout: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date planifiée {formData.typeIntervention === 'preventif' && '*'}
                </label>
                <input
                  type="date"
                  required={formData.typeIntervention === 'preventif'}
                  value={formData.datePlanifiee}
                  onChange={(e) => setFormData({ ...formData, datePlanifiee: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date début
                </label>
                <input
                  type="date"
                  value={formData.dateDebut}
                  onChange={(e) => setFormData({ ...formData, dateDebut: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date fin
                </label>
                <input
                  type="date"
                  value={formData.dateFin}
                  onChange={(e) => setFormData({ ...formData, dateFin: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date réalisation
                </label>
                <input
                  type="date"
                  value={formData.dateRealisation}
                  onChange={(e) => setFormData({ ...formData, dateRealisation: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
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
                  Titre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Site/Équipement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Technicien
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {interventions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    Aucune intervention enregistrée
                  </td>
                </tr>
              ) : (
                interventions.map((intervention) => (
                  <tr key={intervention.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      <div className="max-w-xs">
                        <div className="font-semibold">{intervention.titre}</div>
                        <div className="text-sm text-gray-500 truncate">
                          {intervention.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getTypeBadge(intervention.typeIntervention)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {intervention.categorieIntervention}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      <div className="text-sm">
                        {intervention.siteName && (
                          <div>🏢 {intervention.siteName}</div>
                        )}
                        {intervention.equipementName && (
                          <div>⚙️ {intervention.equipementName}</div>
                        )}
                        {!intervention.siteName && !intervention.equipementName && '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatutBadge(intervention.statut)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {intervention.technicien || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(intervention)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        ✏️ Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(intervention.id)}
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
