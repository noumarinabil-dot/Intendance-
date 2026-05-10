#!/bin/bash

# Script pour initialiser la base de données en production
# Usage: ./scripts/init-production-db.sh

echo "🚀 Initialisation de la base de données de production..."

# Vérifier que DATABASE_URL est défini
if [ -z "$DATABASE_URL" ]; then
    echo "❌ Erreur: DATABASE_URL n'est pas défini"
    echo "Veuillez définir DATABASE_URL dans vos variables d'environnement"
    exit 1
fi

echo "✅ DATABASE_URL trouvé"

# Appliquer le schéma Drizzle
echo "📊 Application du schéma de base de données..."
npx drizzle-kit push

if [ $? -eq 0 ]; then
    echo "✅ Schéma appliqué avec succès"
else
    echo "❌ Erreur lors de l'application du schéma"
    exit 1
fi

echo ""
echo "✨ Base de données initialisée avec succès !"
echo "🎉 Votre application SGX-Intendance est prête !"
echo ""
echo "📝 Prochaines étapes :"
echo "   1. Accédez à votre application"
echo "   2. Créez vos premiers sites"
echo "   3. Ajoutez vos équipements"
echo "   4. Planifiez vos interventions"
