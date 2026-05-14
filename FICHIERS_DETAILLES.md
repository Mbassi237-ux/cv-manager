# Détail de chaque fichier

Ce document explique à quoi sert chaque fichier ou dossier du projet, qui doit principalement le toucher, et pourquoi il existe. L’objectif est d’éviter les doublons, les modifications inutiles et les conflits Git entre binômes.

## Racine du projet

### `index.html`
Rôle: page d’entrée de l’application.
Utilité: fournit la structure HTML initiale, le conteneur principal et le point d’ancrage du rendu TypeScript.
Qui le touche: binôme 1.
Ce qu’il ne doit pas contenir: logique métier, stockage, règles de validation.

### `package.json`
Rôle: décrit les dépendances, scripts et métadonnées du projet.
Utilité: permet de lancer le build, les tests et les scripts de développement.
Qui le touche: binôme 1 pour le socle, binôme 4 si les scripts de test évoluent.
Risque principal: casser les scripts communs si deux personnes modifient les commandes en même temps.

### `tsconfig.json`
Rôle: configuration TypeScript.
Utilité: définit les règles de compilation, le niveau de strictness et les chemins de sortie.
Qui le touche: binôme 1 au départ, puis seulement si la structure de compilation change.
Risque principal: une mauvaise option peut casser toute la compilation.

### `.gitignore`
Rôle: liste les fichiers à exclure du dépôt.
Utilité: évite de versionner les artefacts de build, dépendances, caches et fichiers temporaires.
Qui le touche: binôme 1 ou binôme 4 selon les outils ajoutés.
Risque principal: oublier d’ignorer un artefact généré par le build.

### `README.md`
Rôle: document de travail principal du projet.
Utilité: explique la répartition des tâches, les règles Git et l’ordre de développement.
Qui le touche: binôme 1 ou binôme 4 selon les mises à jour de méthode.
Risque principal: devenir obsolète si le plan d’équipe change et n’est pas mis à jour.

### `ARBORESCENCE.md`
Rôle: liste simplifiée de la structure des fichiers.
Utilité: donne une vue rapide de l’organisation du dépôt sans entrer dans le détail métier.
Qui le touche: binôme 1.
Risque principal: redondance si elle n’est plus synchronisée avec le vrai contenu.

## Styles

### `styles/main.css`
Rôle: styles globaux de l’application.
Utilité: définit la mise en page, le responsive et la cohérence visuelle.
Qui le touche: binôme 1 et binôme 3, avec coordination.
Risque principal: écraser les styles d’un autre composant si les règles sont trop générales.

## Source TypeScript

### `src/main.ts`
Rôle: point de démarrage de l’application.
Utilité: initialise la page, assemble les composants et déclenche le chargement des données.
Qui le touche: binôme 1.
Risque principal: ajouter trop de logique ici et rendre le démarrage difficile à maintenir.

### `src/models/Member.ts`
Rôle: modèle central d’un membre.
Utilité: décrit les champs communs à toute l’application et sert de contrat entre les services et l’interface.
Qui le touche: binôme 2 en priorité, binôme 3 et binôme 4 indirectement via leurs usages.
Risque principal: multiplier les variantes du même type dans plusieurs fichiers.

### `src/services/IndexedDBService.ts`
Rôle: couche technique d’accès à IndexedDB.
Utilité: gère l’ouverture de la base, les transactions et les opérations CRUD.
Qui le touche: binôme 2.
Risque principal: mélanger dans ce fichier de la logique métier ou de l’affichage.

### `src/services/MemberService.ts`
Rôle: logique métier autour des membres.
Utilité: transforme les données, orchestre les opérations utiles au projet et centralise les règles applicatives.
Qui le touche: binôme 2.
Risque principal: laisser la logique métier se disperser dans les composants UI.

## Composants

### `src/components/Header.ts`
Rôle: bandeau supérieur et navigation de base.
Utilité: affiche le titre, les repères de navigation ou les actions globales.
Qui le touche: binôme 3.
Risque principal: y mettre de la logique de données.

### `src/components/MemberList.ts`
Rôle: liste ou grille des membres.
Utilité: affiche les cartes et organise la vue d’ensemble.
Qui le touche: binôme 3.
Risque principal: coupler directement la liste au stockage.

### `src/components/MemberCard.ts`
Rôle: carte visuelle d’un membre.
Utilité: résume les informations essentielles d’un CV.
Qui le touche: binôme 3.
Risque principal: dupliquer du markup complexe dans plusieurs endroits.

### `src/components/CvViewer.ts`
Rôle: vue détaillée d’un CV.
Utilité: présente toutes les informations d’un membre de manière lisible.
Qui le touche: binôme 3.
Risque principal: y mélanger l’édition ou la validation.

### `src/components/BioVideoSection.ts`
Rôle: section dédiée à la bio et à la vidéo.
Utilité: gère l’alignement des contenus textuels et multimédias.
Qui le touche: binôme 3.
Risque principal: casser le responsive si la structure est trop rigide.

### `src/components/CvEditor.ts`
Rôle: formulaire de modification d’un CV.
Utilité: permet de modifier les données affichées dans l’application.
Qui le touche: binôme 4.
Risque principal: mélanger le rendu du formulaire avec la validation ou le stockage.

## Utilitaires

### `src/utils/Validator.ts`
Rôle: validation des champs.
Utilité: vérifie les entrées avant sauvegarde ou affichage.
Qui le touche: binôme 4.
Risque principal: disperser les règles de validation dans plusieurs fichiers.

### `src/utils/FileHandler.ts`
Rôle: gestion des fichiers joints.
Utilité: prépare les images, vidéos et audio avant utilisation dans l’application.
Qui le touche: binôme 4.
Risque principal: manipuler les fichiers sans politique claire de format ou de taille.

## Dossiers de ressources

### `assets/images/`
Rôle: stocker les images des membres.
Utilité: centralise les photos ou illustrations liées aux CV.
Qui le touche: binôme 4 pour les ajouts, binôme 3 pour la consommation dans l’UI.
Risque principal: ajouter des fichiers lourds ou mal nommés.

### `assets/videos/`
Rôle: stocker les vidéos de présentation.
Utilité: conserve les médias utilisés dans la section bio-vidéo.
Qui le touche: binôme 4 pour l’ajout, binôme 3 pour l’affichage.
Risque principal: poids excessif des fichiers et compatibilité navigateur.

### `assets/audio/`
Rôle: stocker les fichiers audio éventuels.
Utilité: garde les ressources sonores du projet si elles sont nécessaires.
Qui le touche: binôme 4.
Risque principal: laisser des fichiers non utilisés ou non référencés.

## Tests

### `tests/smoke.test.ts`
Rôle: test minimal de non-régression.
Utilité: vérifie que le projet démarre et que les fonctions essentielles répondent.
Qui le touche: binôme 4.
Risque principal: écrire un test trop fragile qui bloque tout le reste.

## Dossiers créés pour la structure

### `src/`
Rôle: contient tout le code TypeScript source.
Utilité: sépare le code applicatif des ressources et de la documentation.

### `src/components/`
Rôle: composants d’interface.
Utilité: découpe l’UI en blocs réutilisables.

### `src/services/`
Rôle: accès aux données et logique de service.
Utilité: concentre les interactions avec IndexedDB et les règles métier associées.

### `src/models/`
Rôle: types et structures de données.
Utilité: définit les contrats partagés.

### `src/utils/`
Rôle: fonctions de support.
Utilité: regroupe les validations et traitements transverses.

### `tests/`
Rôle: tests du projet.
Utilité: protège les fonctions essentielles contre les régressions.

### `assets/`
Rôle: médias du projet.
Utilité: stocke les contenus visuels et sonores.