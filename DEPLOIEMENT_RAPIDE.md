# ⚡ Déploiement rapide - 10 minutes chrono

## 🎯 Objectif
Déployer SGX-Intendance sur Vercel en 10 minutes.

---

## ⏱️ Étape 1 : Base de données (2 min)

1. Aller sur **[neon.tech](https://neon.tech)**
2. S'inscrire (gratuit)
3. Nouveau projet : `sgx-intendance`
4. Région : **Europe**
5. **Copier** le `DATABASE_URL`

---

## ⏱️ Étape 2 : GitHub (3 min)

```bash
# Initialiser Git
git init
git add .
git commit -m "Initial commit - SGX-Intendance"

# Créer un repository sur GitHub : sgx-intendance

# Lier et pousser
git remote add origin https://github.com/VOTRE-USERNAME/sgx-intendance.git
git branch -M main
git push -u origin main
```

---

## ⏱️ Étape 3 : Vercel (2 min)

1. Aller sur **[vercel.com](https://vercel.com)**
2. "Add New..." > "Project"
3. Importer `sgx-intendance`
4. **⚠️ Root Directory : LAISSER VIDE !**
5. Ajouter variable : `DATABASE_URL` = votre URL Neon
6. "Deploy"

---

## ⏱️ Étape 4 : Initialiser DB (2 min)

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter et lier
vercel login
vercel link

# Télécharger variables et appliquer schéma
vercel env pull .env.production
npx drizzle-kit push
```

---

## ⏱️ Étape 5 : Tester (1 min)

1. Ouvrir l'URL Vercel
2. Créer un site
3. Créer un équipement
4. Créer une intervention

---

## ✅ C'est terminé !

Votre application est en ligne ! 🎉

---

## 🆘 Problème ?

### Erreur: "Couldn't find any pages or app directory"

**Solution** : Root Directory doit être VIDE sur Vercel

Voir [SOLUTION_VERCEL.md](./SOLUTION_VERCEL.md)

### Erreur: Tables manquantes

**Solution** :
```bash
vercel env pull .env.production
npx drizzle-kit push
```

### Erreur: Connexion DB

**Solution** : Vérifier que `DATABASE_URL` contient `?sslmode=require` pour Neon

---

## 📚 Documentation complète

- [SOLUTION_VERCEL.md](./SOLUTION_VERCEL.md) - Solution erreur Vercel
- [VERCEL_CONFIG.md](./VERCEL_CONFIG.md) - Configuration Vercel
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Résolution de problèmes
- [DEPLOIEMENT_VERCEL.md](./DEPLOIEMENT_VERCEL.md) - Guide complet

---

**Temps total : ~10 minutes** ⏱️

**Bon déploiement ! 🚀**
