export interface TutorialCarouselInterface {
    content: JSX.Element;
}

export const tutorialCarousel: TutorialCarouselInterface[] = [
    {
        content: <div>
            <h1>Tutoriel 1</h1>
            <p>Dans ce tutoriel, nous abordons les bases avancées.</p>
        </div>
    },
    {
        content: <div>
            <h1>Tutoriel 2</h1>
            <p>Dans ce tutoriel, nous abordons les bases avancées.</p>
        </div>
    },
    {
        content: <div>
            <h1>Tutoriel 3</h1>
            <p>Dans ce tutoriel, nous abordons les bases avancées.</p>
        </div>
    }
];

export default tutorialCarousel;
