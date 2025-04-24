import React, { useState } from 'react';

/**
 * Props interface for the CGU component
 * @property {Function} onClose - Callback function to handle closing the CGU
 */
interface Props {
    onClose: () => void;
}

/**
 * CGU Component
 * 
 * This component displays the terms and conditions of the application.
 * It provides a clean interface for users to read and accept the terms.
 * 
 * @param {Props} props - Component props containing onClose callback
 * @returns {JSX.Element} The rendered CGU component
 */
const CGU = ({ onClose }: Props) => {

    const wasAccepted = localStorage.getItem('cguAccepted') === "true";
    const [isAccepted, setIsAccepted] = useState(false);

    const handleClose = () => {
        localStorage.setItem('cguAccepted', 'true');
        onClose();
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '10px',
                maxWidth: '80%',
                maxHeight: '80%',
                overflow: 'auto',
                position: 'relative'
            }}>
                <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Conditions Générales d'Utilisation</h1>

                <p style={{ textAlign: 'center' }}>En vigueur au 01/10/2024</p>
                <br />

                <p>Les présentes conditions générales d'utilisation (dites « CGU ») ont pour objet l'encadrement juridique
                    des modalités de mise à disposition du site et des services par <span className='signit-orange' style={{ fontWeight: "bold" }}>SignIt</span> et de définir les
                    conditions d’accès et d’utilisation des services par « l'Utilisateur ».
                    Les présentes CGU sont accessibles sur le site à la rubrique «CGU».</p>
                <br />

                <div style={{ marginBottom: '2rem' }}>
                    <h2>Article 1 : Les mentions légales</h2>
                    <p>
                        L’édition et la direction de la publication du site dev-signit.web.app est assurée par <span className='signit-orange' style={{ fontWeight: "bold" }}>T-ESP-SignIt</span>.
                        Adresse e-mail : signit@gmail.com.
                    </p>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <h2>Article 2 : Accès au site</h2>
                    <p>
                        Le site signit.fr permet à l'Utilisateur un accès gratuit aux services suivants :
                        Le site internet propose les services suivants :
                        Traduire des signes de la LSF sur le flux vidéo d'une webcam
                        Le site est accessible gratuitement en tout lieu à tout Utilisateur ayant un accès à Internet. Tous les
                        frais supportés par l'Utilisateur pour accéder au service (matériel informatique, logiciels, connexion
                        Internet, etc.) sont à sa charge.
                    </p>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <h2>Article 3 : Collecte des données</h2>
                    <p>
                        Le site assure à l'Utilisateur une collecte et un traitement d'informations personnelles dans le respect
                        de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers
                        et aux libertés.
                        <br /><br />
                        En vertu de la loi Informatique et Libertés, en date du 6 janvier 1978, l'Utilisateur dispose d'un droit
                        d'accès, de rectification, de suppression et d'opposition de ses données personnelles. L'Utilisateur
                        exerce ce droit :
                        · par mail à l'adresse email signit@gmail.com
                    </p>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <h2>Article 4 : Propriété intellectuelle</h2>
                    <p>
                        Les marques, logos, signes ainsi que tous les contenus du site (textes, images, son…) font l'objet
                        d'une protection par le Code de la propriété intellectuelle et plus particulièrement par le droit d'auteur.
                        L'Utilisateur doit solliciter l'autorisation préalable du site pour toute reproduction, publication, copie
                        des différents contenus. Il s'engage à une utilisation des contenus du site dans un cadre strictement
                        privé, toute utilisation à des fins commerciales et publicitaires est strictement interdite.
                        Toute représentation totale ou partielle de ce site par quelque procédé que ce soit, sans l’autorisation
                        expresse de l’exploitant du site Internet constituerait une contrefaçon sanctionnée par l’article L 335-2
                        et suivants du Code de la propriété intellectuelle.
                        Il est rappelé conformément à l’article L122-5 du Code de propriété intellectuelle que l’Utilisateur qui
                        reproduit, copie ou publie le contenu protégé doit citer l’auteur et sa source.

                    </p>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <h2>Article 5 : Responsabilité</h2>
                    <p>
                        Les sources des informations diffusées sur le site signit.fr sont réputées fiables mais le site ne garantit
                        pas qu’il soit exempt de défauts, d’erreurs ou d’omissions.
                        Les informations communiquées sont présentées à titre indicatif et général sans valeur contractuelle.
                        Malgré des mises à jour régulières, le site signit.fr ne peut être tenu responsable de la modification
                        des dispositions administratives et juridiques survenant après la publication. De même, le site ne peut
                        être tenue responsable de l’utilisation et de l’interprétation de l’information contenue dans ce site.
                        Le site signit.fr ne peut être tenu pour responsable d’éventuels virus qui pourraient infecter
                        l’ordinateur ou tout matériel informatique de l’Internaute, suite à une utilisation, à l’accès, ou au
                        téléchargement provenant de ce site.
                        La responsabilité du site ne peut être engagée en cas de force majeure ou du fait imprévisible et
                        insurmontable d'un tiers.
                    </p>
                </div>
                <div style={{ marginBottom: '2rem' }}>
                    <h2>Article 6 : Liens hypertextes</h2>
                    <p>
                        Des liens hypertextes peuvent être présents sur le site. L’Utilisateur est informé qu’en cliquant sur ces
                        liens, il sortira du site signit.fr. Ce dernier n’a pas de contrôle sur les pages web sur lesquelles
                        aboutissent ces liens et ne saurait, en aucun cas, être responsable de leur contenu.
                    </p>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <h2>Article 7 : Cookies</h2>
                    <p>
                        L’Utilisateur est informé que lors de ses visites sur le site, un cookie peut s’installer automatiquement
                        sur son logiciel de navigation.
                        Les cookies sont de petits fichiers stockés temporairement sur le disque dur de l’ordinateur de
                        l’Utilisateur par votre navigateur et qui sont nécessaires à l’utilisation du site signit.fr. Les cookies ne
                        contiennent pas d’information personnelle et ne peuvent pas être utilisés pour identifier quelqu’un. Un
                        cookie contient un identifiant unique, généré aléatoirement et donc anonyme. Certains cookies
                        expirent à la fin de la visite de l’Utilisateur, d’autres restent.
                        L’information contenue dans les cookies est utilisée pour améliorer le site signit.fr.
                        En naviguant sur le site, L’Utilisateur les accepte.
                        L’Utilisateur doit toutefois donner son consentement quant à l’utilisation de certains cookies.
                        A défaut d’acceptation, l’Utilisateur est informé que certaines fonctionnalités ou pages risquent de lui
                        être refusées.
                        L’Utilisateur pourra désactiver ces cookies par l’intermédiaire des paramètres figurant au sein de son
                        logiciel de navigation.
                    </p>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <h2>Article 8 : Utilisation de la webcam</h2>
                    <p>
                        En utilisant notre application, l'utilisateur autorise l'accès à sa webcam pour permettre l'analyse de
                        signes en temps réel. Cette analyse est effectuée uniquement pour permettre le bon fonctionnement
                        des fonctionnalités proposées par l'application, et aucune image capturée n'est conservée,
                        enregistrée, ou partagée en dehors du cadre immédiat de l'analyse en temps réel.
                        Les images capturées par la webcam sont traitées uniquement pour l'analyse en temps réel et ne
                        sont ni stockées, ni enregistrées, ni transmises de manière durable. L'application garantit que toutes
                        les données visuelles capturées sont supprimées immédiatement après leur traitement.
                        Nous mettons en place des mesures de sécurité techniques et organisationnelles pour protéger
                        l’accès à la webcam et éviter toute interception non autorisée des images capturées. Ces mesures
                        incluent des protocoles de sécurité pour empêcher tout accès ou utilisation non autorisée
                    </p>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <h2>Article 9 : Protection des mineurs et consentement parental</h2>
                    <p>
                        Pour les utilisateurs âgés de moins de 15 ans, l’autorisation de leurs parents ou représentants légaux
                        est requise avant tout accès à la webcam de l’appareil utilisé. En cas de doute sur l'âge de
                        l'utilisateur, l'application pourra demander une confirmation de l'autorisation parentale avant d'activer
                        la webcam.
                        3
                        L'application fournit des explications claires et compréhensibles sur l'utilisation de la webcam,
                        adaptées aux mineurs et leurs représentants légaux. Les parents ou tuteurs légaux peuvent consulter
                        ces informations à tout moment, et contacter notre service client pour toute question ou demande
                        supplémentaire.
                        Les parents ou tuteurs légaux peuvent, à tout moment, retirer leur consentement à l'utilisation de la
                        webcam pour leur enfant. Cette action peut être effectuée en coupant l'accès à la webcam via les
                        paramètres de l'application ou de l’appareil. Ils peuvent également nous contacter pour s’assurer que
                        le consentement soit correctement respecté.
                    </p>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <h2>Article 10 : Droit applicable et juridiction compétente</h2>
                    <p>
                        La législation française s'applique au présent contrat. En cas d'absence de résolution amiable d'un
                        litige né entre les parties, les tribunaux français seront seuls compétents pour en connaître.
                        Pour toute question relative à l’application des présentes CGU, vous pouvez joindre l’éditeur aux
                        coordonnées inscrites à l’ARTICLE 1.
                        <br /><br />
                        CGU réalisées sur <a href="http://legalplace.fr/" target='_blank'>LegalPlace</a>

                    </p>
                </div>


                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                            type="checkbox"
                            checked={isAccepted || wasAccepted}
                            disabled={wasAccepted}
                            onChange={(e) => setIsAccepted(e.target.checked)}
                            style={{ cursor: 'pointer' }}
                        />
                        J'ai lu et j'accepte les Conditions Générales d'Utilisation
                    </label>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <button
                        onClick={handleClose}
                        className="start-btn"
                        style={{
                            padding: '0.5rem 1.5rem',
                            opacity: isAccepted || wasAccepted ? 1 : 0.5,
                            cursor: isAccepted || wasAccepted ? 'pointer' : 'not-allowed'
                        }}
                        disabled={!isAccepted && !wasAccepted}
                        title={!isAccepted && !wasAccepted ? "Vous devez acceptez les CGU pour continuer" : ""}
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CGU; 