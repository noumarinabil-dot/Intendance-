# 🏢 SGX-Intendance

> Application complète de gestion de la maintenance des sites et équipements

[English Documentation](./README.md) | [التوثيق بالعربية](./DEPLOIEMENT_VERCEL_AR.md)

## 🚀 Démarrage ultra-rapide

### 1️⃣ Créer base de données (2 min)

Neon (gratuit) : [neon.tech](https://neon.tech) → Nouveau projet → Copier `DATABASE_URL`

### 2️⃣ Déployer sur Vercel (3 min)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/votre-username/sgx-intendance)

⚠️ **IMPORTANT** : Root Directory = laisser VIDE (pas `src/`)

→ Ajouter `DATABASE_URL` → Deploy

### 3️⃣ Initialiser DB (1 min)

```bash
npm i -g vercel
vercel login
vercel link
vercel env pull .env.production
npx drizzle-kit push
```

### ✅ C'est prêt ! Ouvrez votre URL Vercel

---

## 📚 Documentation complète

| Document | Description |
|----------|-------------|
| [QUICK_START.md](./QUICK_START.md) | ⚡ Démarrage en 5 minutes |
| [DEPLOIEMENT_VERCEL.md](./DEPLOIEMENT_VERCEL.md) | 🚀 Guide déploiement complet (FR) |
| [DEPLOIEMENT_VERCEL_AR.md](./DEPLOIEMENT_VERCEL_AR.md) | 🚀 دليل النشر الكامل (AR) |
| [GITHUB_SETUP.md](./GITHUB_SETUP.md) | 📦 Configuration GitHub |
| [GUIDE_UTILISATION.md](./GUIDE_UTILISATION.md) | 📖 Guide utilisateur |
| [CHECKLIST_DEPLOIEMENT.md](./CHECKLIST_DEPLOIEMENT.md) | ✅ Checklist complète |
| [README.md](./README.md) | 📘 Documentation technique |

---

## ✨ Fonctionnalités principales

### 🏗️ Gestion complète
- **Sites** : Usines, entrepôts, bureaux
- **Équipements** : Levage, énergie, froid, équipements sociaux
- **Interventions** : Préventif et curatif

### 📅 Planning intelligent
- Vue chronologique
- Interventions à venir et historique
- Filtres par type, statut, exécutant

### 👥 Exécutants
- **Interne** : Agents d'entretien
- **Externe** : Prestataires et sous-traitants
- Nombre de personnes par intervention

### 📊 Tableaux de bord
- Statistiques en temps réel
- État des équipements
- Répartition des interventions

---

## 🛠️ Technologies

- **Next.js 16** - Framework React
- **TypeScript** - Typage fort
- **PostgreSQL** - Base de données
- **Drizzle ORM** - ORM moderne
- **Tailwind CSS** - Styling
- **Vercel** - Hébergement

---

## 📦 Installation locale

```bash
# Cloner
git clone https://github.com/votre-username/sgx-intendance.git
cd sgx-intendance

# Installer
npm install

# Configurer
cp .env.example .env
# Éditer .env avec votre DATABASE_URL

# Initialiser DB
npm run db:push

# Démarrer
npm run dev
```

→ Ouvrir http://localhost:3000

---

## 🎯 Cas d'usage

### Intervention préventive
```
Type: Préventif
Catégorie: Levage
Exécutant: Externe
Prestataire: Toyota Service
Personnes: 2
Date planifiée: 15/03/2024
```

### Intervention curative
```
Type: Curatif
Catégorie: Électricité
Exécutant: Interne
Agent: Jean Dupont
Personnes: 1
```

---

## 🌐 Langues

- 🇫🇷 Interface française
- 📚 Documentation FR/AR
- 🌍 Extensible multilingue

---

## 📞 Support

- 📖 [Documentation](./README.md)
- 🐛 [Issues GitHub](https://github.com/votre-username/sgx-intendance/issues)
- 💬 [Discussions](https://github.com/votre-username/sgx-intendance/discussions)

---

## 📄 Licence

MIT © 2024 SGX-Intendance

---

## 🎉 Prêt à déployer !

1. **GitHub** : Suivre [GITHUB_SETUP.md](./GITHUB_SETUP.md)
2. **Vercel** : Suivre [DEPLOIEMENT_VERCEL.md](./DEPLOIEMENT_VERCEL.md)
3. **Utilisation** : Lire [GUIDE_UTILISATION.md](./GUIDE_UTILISATION.md)

**Fait avec ❤️ pour une meilleure gestion de la maintenance**
