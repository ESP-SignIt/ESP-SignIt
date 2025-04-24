/**
 * TraductionTutorial Component
 * 
 * This component displays a step-by-step tutorial carousel for new users
 * to learn how to use the ESP-SignIt application. It shows images and
 * instructions for each step of the tutorial process.
 */

import React, { useState } from 'react';

import tutorialCarousel, { TutorialCarouselInterface } from './tutorialCarousel';

/**
 * Props interface for the TraductionTutorial component
 * @property {() => void} onClose - Function to call when the tutorial is closed
 */
interface Props {
    onClose: () => void;
};

/**
 * TraductionTutorial Component
 * 
 * Displays a carousel of tutorial steps with images and descriptions.
 * Users can navigate through the tutorial steps or skip the tutorial entirely.
 * 
 * @param {Props} props - Component props
 * @param {() => void} props.onClose - Function to call when the tutorial is closed
 */
export const TraductionTutorial = ({ onClose }: Props) => {

    // State to track the current tutorial step index
    const [index, setIndex] = useState<number>(0);

    return (
        <section>
            <div style={{ width: "90%", margin: "0 auto" }}>
                {/* Tutorial content container with border and rounded corners */}
                <div style={{ border: "black 1px solid", borderRadius: 15, display: "flex", justifyContent: "center", flexDirection: "column", padding: 10 }}>
                    {tutorialCarousel &&
                        <>
                            {/* Tutorial step title */}
                            <h1 style={{ textAlign: "center", fontSize: 24, marginBottom: 10 }}>{tutorialCarousel[index].title}</h1>
                            {/* Tutorial step image */}
                            <img style={{
                                height: 400,
                                width: 'auto', // auto width keeps aspect ratio
                                objectFit: 'contain' // optional, helps contain the image without cropping
                            }} src={tutorialCarousel[index].picture} alt={tutorialCarousel[index].title} />
                            {/* Tutorial step description with HTML formatting */}
                            <p
                                style={{ textAlign: "center", marginTop: 10 }}
                                dangerouslySetInnerHTML={{ __html: tutorialCarousel[index].description }}
                            />
                        </>
                    }
                </div>
                {/* Navigation buttons for previous and next steps */}
                <div style={{ display: "flex", justifyContent: "center", marginTop: 10, gap: 10 }}>
                    <button className="button-23" role="button" disabled={index == 0} onClick={() => setIndex(index - 1)}>← Précedent</button>
                    <button className="button-23" role="button" disabled={index == tutorialCarousel.length - 1} onClick={() => setIndex(index + 1)}>Suivant →</button>
                </div>
                {/* Skip tutorial button */}
                <div style={{ textAlign: "center", marginTop: 10, marginBottom: 50 }}>
                    <button className="button-23" role="button" onClick={() => onClose()}>Passer le tutoriel</button>
                </div>
            </div>
        </section>
    );
};

export default TraductionTutorial;