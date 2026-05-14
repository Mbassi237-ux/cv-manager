# CvRefait

Projet TypeScript sans framework, avec stockage natif en IndexedDB, organisé pour être développé proprement par 8 personnes réparties en 4 binômes.

## Rôle du dépôt

Ce dépôt doit servir de base commune. Le but n’est pas seulement de faire fonctionner l’application, mais de permettre à plusieurs personnes d’écrire du code en parallèle sans casser le travail des autres.

## Règles communes

- Pas de framework.
- Une responsabilité claire par fichier.
- Les types sont la source de vérité.
- Les services gèrent la donnée, les composants gèrent l’affichage, les utilitaires gèrent les validations et transformations.
- Toute modification d’un contrat partagé doit être annoncée avant fusion.
- Aucun binôme ne doit réécrire le travail d’un autre sans coordination.

## Répartition du travail par binôme

### Binôme 1: personnes 1 et 2
Ce binôme pose le socle technique et visuel. Il prépare l’entrée de l’application et tout ce qui permet aux autres équipes de travailler sur une base stable.

Travail exact:
- créer et stabiliser `index.html`;
- créer et maintenir `src/main.ts`;
- créer et maintenir `styles/main.css`;
- poser la structure générale de la page;
- définir les grandes zones visuelles;
- préparer l’intégration globale des composants;
- garantir que le projet démarre sans erreur.

Ce binôme doit éviter:
- de toucher à la persistance IndexedDB sans nécessité;
- de modifier le modèle métier sans coordination;
- d’ajouter de la logique applicative profonde dans la couche d’entrée.

Livrable attendu:
- une base d’application propre, lisible et stable;
- une structure visuelle prête à recevoir les composants métiers;
- un point d’entrée simple pour les autres équipes.

### Binôme 2: personnes 3 et 4
Ce binôme est responsable de la donnée. Il définit comment les CV sont représentés et comment ils sont stockés localement.

Travail exact:
- définir `src/models/Member.ts`;
- créer `src/services/IndexedDBService.ts`;
- créer `src/services/MemberService.ts`;
- définir le schéma IndexedDB;
- gérer les opérations de lecture, ajout, mise à jour et suppression;
- préserver la cohérence des objets manipulés par toute l’application.

Ce binôme doit éviter:
- de dupliquer le type Member dans d’autres fichiers;
- de mettre de la logique UI dans les services;
- de casser le contrat des données sans prévenir les autres binômes.

Livrable attendu:
- un modèle de données clair;
- un service de persistance fiable;
- une API interne stable pour les composants d’affichage et d’édition.

### Binôme 3: personnes 5 et 6
Ce binôme gère l’affichage des CV. Il transforme les données en interfaces lisibles, propres et responsive.

Travail exact:
- créer `src/components/Header.ts`;
- créer `src/components/MemberList.ts`;
- créer `src/components/MemberCard.ts`;
- créer `src/components/CvViewer.ts`;
- créer `src/components/BioVideoSection.ts`;
- assurer la navigation visuelle entre liste, détail et section vidéo;
- garantir la lisibilité sur mobile, tablette et desktop.

Ce binôme doit éviter:
- d’écrire la logique de stockage;
- de modifier le modèle métier sans accord;
- d’introduire des dépendances inutiles dans les composants.

Livrable attendu:
- une interface claire pour consulter les CV;
- une organisation visuelle cohérente;
- des composants réutilisables et faciles à maintenir.

### Binôme 4: personnes 7 et 8
Ce binôme gère l’édition, les validations, les fichiers associés et la qualité finale.

Travail exact:
- créer `src/components/CvEditor.ts`;
- créer et maintenir `src/utils/Validator.ts`;
- créer et maintenir `src/utils/FileHandler.ts`;
- écrire `tests/smoke.test.ts`;
- vérifier les cas limites;
- relire l’intégration générale;
- s’assurer que les changements ne cassent pas l’existant.

Ce binôme doit éviter:
- de casser les composants d’affichage;
- de changer le schéma de données sans coordination;
- d’embarquer des règles métier dispersées dans plusieurs fichiers.

Livrable attendu:
- un formulaire de modification fiable;
- une validation cohérente;
- un minimum de tests pour sécuriser les manipulations.

## Comment travailler sur Git sans casser le code

- Une branche par binôme et par sujet.
- Un seul responsable d’écriture par fichier à la fois.
- Les modifications de contrat doivent commencer par `src/models/Member.ts` puis être répercutées dans les services et l’UI.
- Les binômes doivent faire un pull ou un rebase avant chaque session de travail.
- Les commits doivent être petits, ciblés et descriptifs.
- Quand deux binômes ont besoin du même fichier, un seul modifie et l’autre vérifie.
- Les conflits doivent être résolus par le binôme propriétaire du fichier concerné.
- Les refontes larges ne doivent jamais être mélangées à une correction mineure.

## Ordre de construction conseillé

1. Stabiliser le socle du projet.
2. Stabiliser les types et le stockage.
3. Brancher l’affichage principal.
4. Brancher l’édition et les validations.
5. Ajouter les tests minimaux.
6. Vérifier le responsive.
7. Relire, nettoyer et harmoniser.

## Critères de qualité

- Un fichier doit avoir un seul rôle principal.
- Les composants visuels ne doivent pas contenir de logique de persistance.
- Les services ne doivent pas manipuler le DOM.
- Les champs partagés doivent rester identiques dans tout le projet.
- Les noms doivent rester cohérents du début à la fin.

## Définition de terminé

Le projet est prêt quand:
- chaque binôme a livré sa partie;
- les contrats de données sont stables;
- IndexedDB fonctionne correctement;
- l’affichage ne produit plus d’erreurs;
- le responsive est validé;
- les tests minimaux passent;
- aucun fichier partagé n’a été modifié sans coordination.
