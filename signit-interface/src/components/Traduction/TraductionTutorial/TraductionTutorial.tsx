import React, { useState, useEffect } from 'react';
import tutorialCarousel, { TutorialCarouselInterface } from './tutorialCarousel';

// Import Swiper components and modules for the carousel functionality
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import required Swiper CSS styles
import 'swiper/css';
import 'swiper/css/navigation';

/**
 * Props interface for the TraductionTutorial component
 * @property {Function} onClose - Callback function to handle closing the tutorial
 */
interface Props {
    onClose: () => void;
};

/**
 * TraductionTutorial Component
 * 
 * This component displays a tutorial carousel for translation features.
 * It uses Swiper library to create a navigable slideshow of tutorial steps.
 * The component is responsive and adjusts image height based on screen size.
 * 
 * @param {Props} props - Component props containing onClose callback
 * @returns {JSX.Element} The rendered tutorial carousel
 */
export const TraductionTutorial = ({ onClose }: Props) => {
    // State to manage image height for responsive design
    const [imageHeight, setImageHeight] = useState(400);

    // Effect to handle responsive image sizing based on window width
    useEffect(() => {
        /**
         * Adjusts image height based on current window width
         * - Sets smaller images (250px) for mobile view (<=768px)
         * - Sets larger images (400px) for desktop view
         */
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setImageHeight(250); // Smaller height for mobile
            } else {
                setImageHeight(400); // Larger height for desktop
            }
        };

        handleResize(); // Initial size check on component mount
        
        // Set up event listener for window resizing
        window.addEventListener('resize', handleResize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <section>
            {/* Main container with responsive width */}
            <div style={{ width: "90%", margin: "0 auto", marginTop: 20 }}>
                {/* Swiper carousel configuration */}
                <Swiper
                    navigation={true} // Enable next/prev navigation arrows
                    modules={[Navigation]} // Add navigation module
                    id="swipper-box"
                    style={{ height: "auto" }}
                    className="tutorial-swiper" // Custom class for styling navigation arrows
                >
                    {/* Map through tutorial items from imported carousel data */}
                    {tutorialCarousel && tutorialCarousel.map((item, index) => {
                        return (
                            <SwiperSlide 
                                key={index} 
                                style={{
                                    paddingBottom: "60px",
                                    paddingLeft: "40px",
                                    paddingRight: "40px"
                                }}
                            >
                                {/* Slide title */}
                                <h1 style={{ textAlign: "center", fontSize: 24, marginBottom: 10 }}>
                                    {item.title}
                                </h1>
                                
                                {/* Image container with responsive sizing */}
                                <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                                    <img 
                                        style={{
                                            height: imageHeight, // Dynamic height based on screen size
                                            width: 'auto',
                                            maxWidth: "100%",
                                            objectFit: 'contain' // Maintain aspect ratio
                                        }} 
                                        src={item.picture} 
                                        alt={item.title} 
                                    />
                                </div>
                                
                                {/* Description text - using dangerouslySetInnerHTML to render HTML from tutorial data */}
                                <p
                                    style={{ textAlign: "center", marginTop: 10 }}
                                    dangerouslySetInnerHTML={{ __html: item.description }}
                                />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>

                {/* 
                 * Custom CSS for styling Swiper navigation arrows
                 * Uses :global() to target Swiper's generated classes
                 * Provides responsive styling for mobile view
                 */}
                <style >{`
                    :global(.tutorial-swiper .swiper-button-next),
                    :global(.tutorial-swiper .swiper-button-prev) {
                        background-color: rgba(255, 255, 255, 0.7);
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        color: #000;
                    }

                    :global(.tutorial-swiper .swiper-button-next:after),
                    :global(.tutorial-swiper .swiper-button-prev:after) {
                        font-size: 16px;
                        font-weight: bold;
                    }

                    @media (max-width: 768px) {
                        :global(.tutorial-swiper .swiper-button-next) {
                        right: 5px;
                        }

                        :global(.tutorial-swiper .swiper-button-prev) {
                        left: 5px;
                        }
                    }
                    `}
                </style>

                {/* "Skip tutorial" button container */}
                <div style={{ textAlign: "center", marginTop: 20, marginBottom: 30 }}>
                    <button
                        onClick={onClose} // Calls the provided onClose callback
                        className="start-btn"
                    >
                        Passer le tutoriel {/* French text for "Skip tutorial" */}
                    </button>
                </div>
            </div>
        </section>
    );
};

// Default export for the component
export default TraductionTutorial;