# Guide de contribution

Merci de votre intérêt pour contribuer à SGX-Intendance ! 🎉

## Comment contribuer

### Signaler un bug

1. Vérifiez que le bug n'a pas déjà été signalé dans les [Issues](https://github.com/votre-username/sgx-intendance/issues)
2. Créez une nouvelle issue avec le template "Bug Report"
3. Incluez :
   - Description claire du problème
   - Étapes pour reproduire
   - Comportement attendu vs réel
   - Captures d'écran si applicable
   - Votre environnement (OS, navigateur, version Node.js)

### Proposer une fonctionnalité

1. Créez une issue avec le template "Feature Request"
2. Décrivez clairement la fonctionnalité
3. Expliquez pourquoi elle serait utile
4. Proposez une implémentation si possible

### Soumettre des changements

1. **Fork** le repository
2. **Clone** votre fork
   ```bash
   git clone https://github.com/votre-username/sgx-intendance.git
   ```
3. **Créez une branche** pour votre fonctionnalité
   ```bash
   git checkout -b feature/ma-fonctionnalite
   ```
4. **Faites vos changements**
   - Suivez les conventions de code
   - Ajoutez des tests si applicable
   - Mettez à jour la documentation

5. **Committez vos changements**
   ```bash
   git commit -m "feat: ajout de ma fonctionnalité"
   ```
   
   Utilisez les préfixes conventionnels :
   - `feat:` - Nouvelle fonctionnalité
   - `fix:` - Correction de bug
   - `docs:` - Documentation
   - `style:` - Formatage, point-virgules, etc.
   - `refactor:` - Refactoring du code
   - `test:` - Ajout de tests
   - `chore:` - Maintenance

6. **Poussez vers votre fork**
   ```bash
   git push origin feature/ma-fonctionnalite
   ```

7. **Créez une Pull Request**
   - Allez sur le repository original
   - Cliquez sur "New Pull Request"
   - Sélectionnez votre branche
   - Décrivez vos changements

## Conventions de code

### TypeScript

- Utilisez TypeScript pour tout nouveau code
- Définissez des types explicites
- Évitez `any`, utilisez `unknown` si nécessaire

### Formatting

- Utilisez les paramètres ESLint du projet
- Indentation : 2 espaces
- Point-virgule : optionnel mais cohérent
- Quotes : simples pour JS, doubles pour JSX

### Nommage

- **Composants** : PascalCase (`InterventionForm.tsx`)
- **Fonctions** : camelCase (`fetchInterventions()`)
- **Constants** : UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Fichiers** : kebab-case ou PascalCase

### Structure des fichiers

```
src/
├── app/
│   ├── api/           # Routes API
│   ├── [page]/        # Pages
│   ├── layout.tsx
│   └── page.tsx
└── db/
    ├── index.ts
    └── schema.ts
```

## Tests

Avant de soumettre :

```bash
# Vérification TypeScript
npm run typecheck

# Linting
npm run lint

# Build
npm run build
```

## Base de données

### Modifications du schéma

1. Modifiez `src/db/schema.ts`
2. Testez localement :
   ```bash
   npm run db:push
   ```
3. Documentez les changements

### Migrations

Les migrations sont gérées via Drizzle Kit. Pour les changements majeurs :
1. Créez une migration
2. Testez la migration
3. Documentez dans la PR

## Documentation

- Mettez à jour README.md si nécessaire
- Documentez les nouvelles fonctionnalités
- Ajoutez des commentaires pour le code complexe
- Mettez à jour GUIDE_UTILISATION.md pour les changements UI

## Style de commit

Nous suivons [Conventional Commits](https://www.conventionalcommits.org/) :

```
type(scope): subject

body

footer
```

Exemples :
```
feat(interventions): ajout du filtre par date
fix(planning): correction affichage dates
docs(readme): mise à jour instructions déploiement
```

## Process de revue

1. Au moins une revue est requise
2. Tous les tests doivent passer
3. Pas de conflits avec main
4. Documentation mise à jour

## Questions ?

- Ouvrez une [Discussion](https://github.com/votre-username/sgx-intendance/discussions)
- Posez vos questions dans les issues

## Code of Conduct

- Soyez respectueux
- Acceptez les critiques constructives
- Concentrez-vous sur ce qui est meilleur pour la communauté

## Licence

En contribuant, vous acceptez que vos contributions soient sous licence MIT.

---

**Merci pour votre contribution ! 🙏**
