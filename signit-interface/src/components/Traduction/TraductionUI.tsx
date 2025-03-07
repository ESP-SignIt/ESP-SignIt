import React, { useState } from 'react';
import TraductionTutorial from './TraductionTutorial/TraductionTutorial';
import Traduction from './Traduction';

interface Props { };

export const TraductionUI = ({ }: Props) => {

    const [displayTutorial, setDisplayTutorial] = useState<boolean>(true);

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