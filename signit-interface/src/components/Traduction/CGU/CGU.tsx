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
                
                <div style={{ marginBottom: '2rem' }}>
                    <h2>1. Introduction</h2>
                    <p>
                        Bienvenue sur ESP-SignIt, une application de traduction de la langue des signes. 
                        En utilisant cette application, vous acceptez les présentes conditions générales d'utilisation.
                    </p>
                </div>
                
                <div style={{ marginBottom: '2rem' }}>
                    <h2>2. Utilisation de l'application</h2>
                    <p>
                        ESP-SignIt est conçue pour faciliter la communication avec les personnes malentendantes 
                        en traduisant la langue des signes en temps réel. L'application nécessite l'accès à votre caméra 
                        pour fonctionner correctement.
                    </p>
                </div>
                
                <div style={{ marginBottom: '2rem' }}>
                    <h2>3. Protection des données</h2>
                    <p>
                        Nous ne collectons aucune donnée personnelle lors de l'utilisation de l'application. 
                        Les images capturées par votre caméra sont traitées localement et ne sont pas stockées 
                        ou transmises à des serveurs externes.
                    </p>
                </div>
                
                <div style={{ marginBottom: '2rem' }}>
                    <h2>4. Limites de responsabilité</h2>
                    <p>
                        Bien que nous nous efforcions de fournir une traduction précise, ESP-SignIt ne garantit pas 
                        une traduction parfaite à 100%. L'application doit être utilisée comme un outil d'aide à la 
                        communication et non comme une solution exclusive.
                    </p>
                </div>
                
                <div style={{ marginBottom: '2rem' }}>
                    <h2>5. Modifications des CGU</h2>
                    <p>
                        Nous nous réservons le droit de modifier ces conditions générales d'utilisation à tout moment. 
                        Les utilisateurs seront informés des changements significatifs.
                    </p>
                </div>
                
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                            type="checkbox"
                            checked={isAccepted}
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
                            opacity: isAccepted ? 1 : 0.5,
                            cursor: isAccepted ? 'pointer' : 'not-allowed'
                        }}
                        disabled={!isAccepted}
                        title={!isAccepted ? "Vous devez acceptez les CGU pour continuer" : ""}
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CGU; 