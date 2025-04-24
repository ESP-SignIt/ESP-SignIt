import { useState } from 'react';
import Traduction from './Traduction';
import TraductionTutorial from './TraductionTutorial/TraductionTutorial';

// Props interface for the TraductionUI component
// Currently empty but can be extended with additional props if needed
interface Props { };

/**
 * TraductionUI Component
 * 
 * This component manages the display of either a tutorial or the main translation interface.
 * It uses localStorage to remember if the user has already seen the tutorial.
 */
export const TraductionUI = ({ }: Props) => {

    // State to control whether to display the tutorial or the main translation interface
    // Initialized from localStorage, defaults to showing tutorial if not previously dismissed
    const [displayTutorial, setDisplayTutorial] = useState<boolean>(localStorage.getItem("displayTutorial") == "true");

    /**
     * Closes the tutorial and updates the state
     * This function is passed to the TraductionTutorial component
     */
    const closeTutorial = () => {
        setDisplayTutorial(false);
    }

    return (
        <section style={{ margin: 0, padding: 0 }}>
            {/* Conditional rendering based on displayTutorial state */}
            {displayTutorial ?
                // Show tutorial if displayTutorial is true
                <TraductionTutorial onClose={() => closeTutorial()} />
                :
                // Show main translation interface if displayTutorial is false
                <Traduction />
            }
        </section>
    );
};

export default TraductionUI;