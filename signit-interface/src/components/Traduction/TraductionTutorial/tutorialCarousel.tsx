// Pictures imports
import tutorialImage1 from '../../../assets/tutorialPictures/tutorial-1.png';
import tutorialImage2 from '../../../assets/tutorialPictures/tutorial-2.png';
import tutorialImage3 from '../../../assets/tutorialPictures/tutorial-3.png';

export interface TutorialCarouselInterface {
    title: string;
    picture: string;
    description: string;
}

export const tutorialCarousel: TutorialCarouselInterface[] = [
    {
        title: "Étape 1 sur 4 - Accès à la caméra",
        picture: tutorialImage1,
        description: "Pour utiliser notre application vous devez impérativement accepter l'accès à votre caméra.<br />Sachez qu'aucun enregistrement n'est effectué lors de l'usage de l'application",
    },
    {
        title: "Étape 2 sur 4 - Mise en place",
        picture: tutorialImage2,
        description: "Une fois les accès à la caméra acceptés, vous devriez voir votre retour vidéo.<br />Descendez sur la page jusqu'à voir le bouton 'Commencer' et avoir votre retour vidéo en plein écran.<br />Quand vous êtes prêt à démarrer, appuyer sur le bouton 'Commencer'",
    },
    {
        title: "Étape 3 sur 4 - Utilisation des commandes",
        picture: tutorialImage3,
        description: "Plusieurs commandes sont à votre disposition tout au long de votre utilisation de l'application.<br />En haut à droite vous pouvez afficher/masquer la matrice qui est affichée en bas à gauche.<br />En bas à droite le sélecteur vous permet d'obtenir un schéma de chaque signe afin de pouvoir le reproduire directement.<br />L'interpretation de votre signe se situe en haut de votre écran.<br />Finalement vous pouvez stopper la caméra via le bouton 'Arrêter'",
    },
    {
        title: "Étape 4 sur 4 - Vous êtes prêt !",
        picture: tutorialImage3,
        description: "Vous êtes désormais prêt à profiter de notre application. À vos signes !",
    },
];

export default tutorialCarousel;
