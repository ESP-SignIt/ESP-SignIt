import { useState } from 'react';
import Traduction from './Traduction';
import TraductionTutorial from './TraductionTutorial/TraductionTutorial';

interface Props { };

export const TraductionUI = ({ }: Props) => {

    const [displayTutorial, setDisplayTutorial] = useState<boolean>(localStorage.getItem("displayTutorial") == "true");

    const closeTutorial = () => {
        setDisplayTutorial(false);
    }

    return (
        <section style={{ margin: 0, padding: 0 }}>
            {displayTutorial ?
                <TraductionTutorial onClose={() => closeTutorial()} />
                :
                <Traduction />
            }
        </section>
    );
};

export default TraductionUI;