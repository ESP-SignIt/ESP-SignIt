import React, { useState } from 'react';

import tutorialCarousel, { TutorialCarouselInterface } from './tutorialCarousel';

interface Props {
    onClose: () => void;
};

export const TraductionTutorial = ({ onClose }: Props) => {

    const [index, setIndex] = useState<number>(0);

    return (
        <section>
            <div style={{ width: "90%", margin: "0 auto" }}>
                <div style={{ border: "black 1px solid", borderRadius: 15, display: "flex", justifyContent: "center", flexDirection: "column", padding: 10 }}>
                    {tutorialCarousel &&
                        <>
                            <h1 style={{ textAlign: "center", fontSize: 24, marginBottom: 10 }}>{tutorialCarousel[index].title}</h1>
                            <img style={{
                                height: 400,
                                width: 'auto', // auto width keeps aspect ratio
                                objectFit: 'contain' // optional, helps contain the image without cropping
                            }} src={tutorialCarousel[index].picture} alt={tutorialCarousel[index].title} />
                            <p
                                style={{ textAlign: "center", marginTop: 10 }}
                                dangerouslySetInnerHTML={{ __html: tutorialCarousel[index].description }}
                            />
                        </>
                    }
                </div>
                <div style={{ display: "flex", justifyContent: "center", marginTop: 10, gap: 10 }}>
                    <button className="button-23" role="button" disabled={index == 0} onClick={() => setIndex(index - 1)}>← Précedent</button>
                    <button className="button-23" role="button" disabled={index == tutorialCarousel.length - 1} onClick={() => setIndex(index + 1)}>Suivant →</button>
                </div>
                <div style={{ textAlign: "center", marginTop: 10, marginBottom: 50 }}>
                    <button className="button-23" role="button" onClick={() => onClose()}>Passer le tutoriel</button>
                </div>
            </div>
        </section>
    );
};

export default TraductionTutorial;