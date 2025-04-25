import { FilesetResolver, GestureRecognizer, DrawingUtils } from "@mediapipe/tasks-vision";
import React, { useCallback, useEffect, useRef, useState } from "react";
import imageList, { ImageList } from "../ImageAlphabet/imageList";
import "../../styles/traduction.css";

import Words from "./words";

import { useAlert } from "react-alert";

// eslint-disable-next-line no-unused-vars
let startTime = new Date(0);

interface TranslatingState {
    done: boolean;
    letter: string;
    success: boolean;
}

export const LearningUI = () => {

    const alert = useAlert();

    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number>();

    const [isGoodLetter, setIsGoodLetter] = useState<boolean>(false);

    // eslint-disable-next-line no-unused-vars
    const [selectedLetter, setSelectedLetter] = useState<string>("");

    // eslint-disable-next-line no-unused-vars
    const [videoInput, setVideoInput] = useState<string | null>(null);
    const [running, setRunning] = useState(false);
    const [isReady, setIsReady] = useState(false);

    const [recognizer, setRecognizer] = useState<any | null>(null);
    const [gesture, setGesture] = useState("");
    const [score, setScore] = useState(0);
    const showLandmarks = true;
    const showRef = useRef(showLandmarks);

    const [pictureURL, setPictureURL] = useState("");
    const [isPhone, setIsPhone] = useState(window.innerWidth < 800);

    const [signedLetters, setSignedLetters] = useState<{ letter: string, timestamp: number, className: string }[]>([]);
    const [currentLetter, setCurrentLetter] = useState<string>('');

    const [wordToTranslate, setWordToTranslate] = useState<string>('');
    const [translating, setTranslating] = useState<Array<TranslatingState>>([]);

    // eslint-disable-next-line no-unused-vars
    const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(-1);
    const [isLearning, setIsLearning] = useState<boolean>(false);
    const [selectedLetterIndex, setSelectedLetterIndex] = useState<number>(-1);

    // eslint-disable-next-line no-unused-vars
    const [wordCompleted, setWordCompleted] = useState<boolean>(false);

    // Load Mediapipe model
    useEffect(() => {
        FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
        )
            .then((vision) =>
                GestureRecognizer.createFromOptions(vision, {
                    baseOptions: { modelAssetPath: "/gesture_recognizer.task", delegate: "GPU" },
                    numHands: 1,
                    runningMode: "VIDEO",
                })
            )
            .then(setRecognizer)
            .catch(console.error);
    }, []);

    // Keep showLandmarks ref up to date
    useEffect(() => {
        showRef.current = showLandmarks;
    }, [showLandmarks]);

    // Manage screen size
    useEffect(() => {
        const pq = window.matchMedia("(max-width:799px)");
        const onP = (e: any) => setIsPhone(e.matches);
        pq.addEventListener("change", onP);
        return () => {
            pq.removeEventListener("change", onP);
        };
    }, []);

    // Switch video source
    useEffect(() => {
        const video = videoRef.current!;
        setIsReady(false);
        // stop any old camera stream
        if (!videoInput && video.srcObject instanceof MediaStream) {
            (video.srcObject as MediaStream).getTracks().forEach((t) => t.stop());
            video.srcObject = null;
        }
        if (!videoInput) {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => {
                    video.srcObject = stream;
                    video.play().catch(console.error); // Ajout de video.play() pour démarrer le flux vidéo
                })
                .catch((error) => {
                    console.error("Erreur lors de l'accès à la caméra:", error);
                    alert.error("Impossible d'accéder à la caméra. Veuillez vérifier les permissions de la caméra.");
                });
        } else {
            video.srcObject = null;
            video.src = videoInput;
            video.loop = true;
        }
    }, [videoInput]);

    useEffect(() => {

    }, [gesture]);
    // When metadata loaded
    const onLoaded = useCallback(() => {
        setIsReady(true);
        const canvas = canvasRef.current!;
        const video = videoRef.current!;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
    }, []);

    // Prediction loop
    const loop = useCallback(() => {
        // const video = videoRef.current!;
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;

        if (recognizer && running && videoRef.current?.videoWidth) {
            const videoEl = videoRef.current!;
            const results = recognizer.recognizeForVideo(videoEl, Date.now());

            // Effacez d'abord le canvas AVANT d'appliquer les transformations
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.save();
            // Appliquer la transformation pour l'effet miroir
            ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1);

            const drawingUtils = new DrawingUtils(ctx);

            if (results.landmarks && showRef.current) {
                for (const landmarks of results.landmarks) {
                    drawingUtils.drawConnectors(
                        landmarks, // Utilisez les landmarks originaux, pas besoin de les inverser manuellement
                        GestureRecognizer.HAND_CONNECTIONS,
                        {
                            color: "#00FF00",
                            lineWidth: 1,
                        }
                    );
                    drawingUtils.drawLandmarks(
                        landmarks,
                        {
                            color: "#00FF00",
                            lineWidth: 1,
                        }
                    );
                }
            }

            ctx.restore(); // Restaurez l'état du contexte après le dessin

            if (results.gestures.length > 0) {
                const [best] = results.gestures[0];
                setGesture(best.categoryName);
                setCurrentLetter(best.categoryName);
                setScore(Math.floor(best.score * 100));
            } else {
                setGesture("");
                setCurrentLetter("");
                setScore(0);
            }
        }

        rafRef.current = requestAnimationFrame(loop);
    }, [recognizer, running]);

    // Restart loop on run or source change
    useEffect(() => {
        cancelAnimationFrame(rafRef.current!);
        if (running) loop();
        return () => cancelAnimationFrame(rafRef.current!);
    }, [running, videoInput, recognizer, loop]);

    // Toggle start/stop
    const onToggle = useCallback(() => {
        setRunning((r) => {
            // If you stop translating empty the word to translate 
            if (r) {
                setWordToTranslate("");
                setCurrentLetterIndex(-1);
                setTranslating([]);
            }
            return !r
        });
        startTime = new Date();
    }, []);

    // Ce hook useEffect ajoute une nouvelle lettre signée à la liste des lettres signées
    // lorsque currentLetter change. Chaque lettre est associée à un timestamp.
    // On ajoute la lettre seulement si elle reste la même pendant 0.5 seconde.
    useEffect(() => {
        if (currentLetter && isLearning && selectedLetterIndex >= 0) {
            const timeoutId = setTimeout(() => {
                setSignedLetters(prevLetters => [
                    ...prevLetters,
                    { letter: currentLetter, timestamp: Date.now(), className: 'signed' }
                ]);
                
                // Check if the current letter matches the expected letter
                if (selectedLetterIndex >= 0 && selectedLetterIndex < translating.length) {
                    const expectedLetter = translating[selectedLetterIndex].letter;
                    
                    if (currentLetter === expectedLetter) {
                        setIsGoodLetter(true);
                        // Mark the current letter as done and successful
                        setTranslating(prevState => {
                            const newState = [...prevState];
                            newState[selectedLetterIndex] = {
                                ...newState[selectedLetterIndex],
                                done: true,
                                success: true
                            };
                            return newState;
                        });
                    } else {
                        // Wrong letter, mark as done but not successful
                        setTranslating(prevState => {
                            const newState = [...prevState];
                            newState[selectedLetterIndex] = {
                                ...newState[selectedLetterIndex],
                                done: true,
                                success: false
                            };
                            return newState;
                        });
                    }
                }
            }, 500);

            return () => {
                clearTimeout(timeoutId);
                setIsGoodLetter(false);
            }
        }
    }, [currentLetter, isLearning, selectedLetterIndex, translating]);

    // NEW useEffect to check for word completion whenever translating state changes
    useEffect(() => {
        if (isLearning && translating.length > 0) {
            const allSuccessful = translating.every(letter => letter.success);
            if (allSuccessful) {
                setWordCompleted(true);
                alert.success("Congratulations! You've mastered the word " + wordToTranslate);
                setIsLearning(false);
                setRunning(false);
            }
        }
    }, [translating, wordToTranslate, isLearning, alert]);

    // Ce hook useEffect met à jour les lettres signées toutes les secondes.
    // Si une lettre a été signée il y a moins de 5 secondes, elle reste visible.
    // Si elle a été signée il y a entre 5 et 6 secondes, elle commence à disparaître (fade-out).
    // Les lettres qui ont été signées il y a plus de 6 secondes sont supprimées de la liste.
    useEffect(() => {

        const interval = setInterval(() => {
            setSignedLetters(prevLetters => {
                const now = Date.now();
                return prevLetters.filter(letter => now - letter.timestamp < 15000);
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const handleWheel = (e: React.WheelEvent<HTMLImageElement>) => {

        const currentIndex = imageList.findIndex(img => img.src === pictureURL);
        let newIndex = currentIndex;

        if (e.deltaY < 0) {
            // Scroll up
            newIndex = (currentIndex - 1 + imageList.length) % imageList.length;
        } else {
            // Scroll down
            newIndex = (currentIndex + 1) % imageList.length;
        }

        setPictureURL(imageList[newIndex].src);
    };

    const handlePictureChange = (e: React.ChangeEvent<any>) => {

        // Extract selected letter
        let pictureNameArray = e.target.value.split("/static/media/");

        if (pictureNameArray.length > 1) {
            console.log("setted => ", pictureNameArray[1].charAt(0))
            setSelectedLetter(pictureNameArray[1].charAt(0));
        }

        setPictureURL(e.target.value)
    }

    const startLearning = () => {
        if (!wordToTranslate) return;
        
        let state: Array<TranslatingState> = [];
        const separatedLetters = wordToTranslate.split("");
        
        for (let letter of separatedLetters) {
            state.push({
                letter: letter.toUpperCase(),
                done: false,
                success: false
            });
        }

        setTranslating(state);
        setSelectedLetterIndex(-1);
        setIsLearning(true);
        setWordCompleted(false);
        
        // Set the first letter as selected to display its image
        if (state.length > 0) {
            setSelectedLetter(state[0].letter);
            // Find and set the corresponding image
            const firstLetterImage = imageList.find(img => img.alt === state[0].letter);
            if (firstLetterImage) {
                setPictureURL(firstLetterImage.src);
            }
        }
    }

    const generateRandomWords = () => {
        const randomWord = Words[Math.floor(Math.random() * Words.length)].toUpperCase();
        setWordToTranslate(randomWord);
    }

    const selectLetter = (index: number) => {
        if (index >= 0 && index < translating.length) {
            setSelectedLetterIndex(index);
            setSelectedLetter(translating[index].letter);
            
            // Find and set the corresponding image
            const letterImage = imageList.find(img => img.alt === `Lettre ${translating[index].letter}`);
            if (letterImage) {
                setPictureURL(letterImage.src);
            }
        }
    }

    return (
        <div className="traduction-container">

            <video
                ref={videoRef}
                className="signlang_video"
                autoPlay
                muted
                playsInline
                onLoadedMetadata={onLoaded}
            />
            
            <canvas ref={canvasRef} className="signlang_canvas" style={{ width: isPhone ? "1%" : "15%", height: "auto" }} />

            <div className="controls">
                <div className="startDiv">
                    <button onClick={onToggle} disabled={!isReady || !recognizer} id="start-btn">
                        {running ? "Arrêter" : "Commencer"}
                    </button>

                </div>
                {running &&
                <div style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    width: isPhone ? "25%" : "15%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,                                        
                }}>
                    <input
                        type="text"
                        placeholder="Mot à traduire..."
                        value={wordToTranslate}
                        onChange={(e) => setWordToTranslate(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid #ccc"
                        }}
                    />

                    <button 
                        className="start-btn"
                        onClick={() => generateRandomWords()}
                        style={{marginTop: 10}}
                    >
                        Aléatoire
                    </button>
                   
                    {wordToTranslate !== "" &&
                    <button 
                        className="start-btn"
                        onClick={() => startLearning()}
                        style={{marginTop: 10}}
                    >
                        Traduire
                    </button>}
                </div>
                }
                {running && (
                    <div className="info">
                        <div className="top" style={{
                            color: (isGoodLetter ? "#1DB954" : "white"),
                            borderColor: (isGoodLetter ? "#1DB954" : "white"),
                        }}>
                            <p className="gesture_output" style={{ fontWeight: "bold" }}>{currentLetter || "..."}</p>

                            {score > 0 ? <span className="score">{score}%</span> : <span className="score">--%</span>}
                        </div>

                        {signedLetters.map((letter, index) => {
                            return (
                                <div className="signed top noborder" key={index}>
                                    <p className={letter.className + " gesture_output"}>{letter.letter || "..."}</p>
                                </div>
                            );
                        })}
                      
                            <div style={{
                                position: "absolute",
                                bottom: isPhone ? "10%" : 10,
                                right: 0,
                                width: isPhone ? "45%" : "10%",
                                display: "flex",
                                flexDirection: "column",
                                alignContent: "center",
                                alignItems: "center",

                            }}>
                                {pictureURL && <img src={pictureURL} alt="Dictionnaire" onWheel={handleWheel} />}

                                <select onChange={(e) => handlePictureChange(e)}>
                                    <option value="">-- Sélectionner --</option>
                                    {imageList.map((img: ImageList, index: number) => (
                                        <option key={img.src + index} value={img.src}>
                                            {img.alt}
                                        </option>
                                    ))}
                                </select>

                            </div>
                        

                        {isLearning && translating.length > 0 && (
                            <div className={!isPhone ? "learning-progress" : "learning-progress-phone"}>
                                <h3>Progression: {translating.filter(item => item.success).length}/{translating.length}</h3>
                                <div className="letter-progress">
                                    {translating.map((item, index) => (
                                        <div 
                                            key={index} 
                                            className={`letter-item ${item.done ? (item.success ? 'success' : 'failed') : ''} ${index === selectedLetterIndex ? 'current' : ''}`}
                                            onClick={() => selectLetter(index)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {item.letter}
                                        </div>
                                    ))}
                                </div>
                                {selectedLetterIndex === -1 && (
                                    <p style={{ textAlign: 'center', marginTop: '10px' }}>
                                        Cliquez sur une lettre pour commencer à la traduire
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default LearningUI;