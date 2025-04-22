---
title: SignIt
description: Un traducteur de langue des signes capable de lire lalphabet
---

![Logo SignIt](signit-interface/src/assets/logo/logo.png)

# SignIt

## Introduction

SignIt est un traducteur de langue des signes capable de lire l'alphabet. Ce projet a été développé en React et utilise un modèle de machine learning pour la reconnaissance des gestes. Il s'agit d'un projet de fin d'études pour le Msc Pro à Epitech, réalisé par une équipe de 8 collaborateurs.

## Fonctionnalités

- Traduction de l'alphabet en langue des signes.
- Interface utilisateur intuitive avec React.
- Modèle de machine learning pour la reconnaissance des gestes.
- Capture vidéo en temps réel via la webcam.
- Affichage des gestes détectés et de leur précision.

## Technologies Utilisées

- React
- MediaPipe pour la reconnaissance des gestes
- TensorFlow pour l'entraînement du modèle de machine learning
- pnpm pour la gestion des dépendances

## Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/votre-repo/signit.git
   ```
2. Installez les dépendances :
   ```bash
   cd signit-interface
   pnpm install
   ```

## Utilisation

1. Lancez l'application :
   ```bash
   pnpm start
   ```
2. Ouvrez votre navigateur et accédez à `http://localhost:3000`.

## Contribution

Pour contribuer à ce projet, suivez ces étapes :

1. Fork le dépôt.
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/votre-fonctionnalite`).
3. Commit vos changements (`git commit -am 'Ajout de votre fonctionnalité'`).
4. Push vers la branche (`git push origin feature/votre-fonctionnalite`).
5. Créez une Pull Request.

## Licence

Ce projet est sous licence MIT.
