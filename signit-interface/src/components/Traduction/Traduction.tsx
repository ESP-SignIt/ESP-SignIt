import {
    DrawingUtils,
    FilesetResolver,
    GestureRecognizer
} from "@mediapipe/tasks-vision";
import { useCallback, useEffect, useRef, useState } from 'react';
import "../../styles/traduction.css";
import imageList, { ImageList } from "../ImageAlphabet/imageList";
import TraductionTutorial from './TraductionTutorial/TraductionTutorial';
import CGU from './CGU/CGU';

interface Props {
    setDisplayTutorial: (value: boolean) => void;
}

let startTime = new Date(0);

const Traduction = ({setDisplayTutorial}: Props) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number>();

    const [isGoodLetter, setIsGoodLetter] = useState<boolean>(false);
    const [selectedLetter, setSelectedLetter] = useState<string>("");

    const [videoInput, setVideoInput] = useState<string | null>(null);
    const [running, setRunning] = useState(false);
    const [isReady, setIsReady] = useState(false);

    const [recognizer, setRecognizer] = useState<any | null>(null);
    const [gesture, setGesture] = useState("");
    const [score, setScore] = useState(0);
    const [showLandmarks, setShowLandmarks] = useState(true);
    const showRef = useRef(showLandmarks);

    const [pictureURL, setPictureURL] = useState("");
    const [isWide, setIsWide] = useState(window.innerWidth >= 1400);
    const [isPhone, setIsPhone] = useState(window.innerWidth < 800);

    const [signedLetters, setSignedLetters] = useState<{ letter: string, timestamp: number, className: string }[]>([]);
    const [currentLetter, setCurrentLetter] = useState<string>('');
    
    // New state for tutorial and CGU display
    const [showCGU, setShowCGU] = useState<boolean>(false);

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
        const wq = window.matchMedia("(min-width:1400px)");
        const pq = window.matchMedia("(max-width:799px)");
        const onW = (e: any) => setIsWide(e.matches);
        const onP = (e: any) => setIsPhone(e.matches);
        wq.addEventListener("change", onW);
        pq.addEventListener("change", onP);
        return () => {
            wq.removeEventListener("change", onW);
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
                    alert("Impossible d'accéder à la caméra. Veuillez vérifier les permissions de la caméra.");
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
        const video = videoRef.current!;
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
        setRunning((r) => !r);
        startTime = new Date();
    }, []);

    // Ce hook useEffect ajoute une nouvelle lettre signée à la liste des lettres signées
    // lorsque currentLetter change. Chaque lettre est associée à un timestamp.
    // On ajoute la lettre seulement si elle reste la même pendant 0.5 seconde.
    useEffect(() => {
        if (currentLetter) {
            const timeoutId = setTimeout(() => {
                setSignedLetters(prevLetters => [
                    ...prevLetters,
                    { letter: currentLetter, timestamp: Date.now(), className: 'signed' }
                ]);
                if (currentLetter == selectedLetter) {
                    setIsGoodLetter(true);
                }
            }, 500);

            return () => {
                clearTimeout(timeoutId);
                setIsGoodLetter(false);
            }
        }
    }, [currentLetter]);

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

    // Handle tutorial and CGU display
    const handleShowTutorial = () => {
        setShowCGU(false);
        setDisplayTutorial(true);
    };

    const handleShowCGU = () => {
        setDisplayTutorial(false);
        setShowCGU(true);
    };

    const handleCloseCGU = () => {
        setShowCGU(false);
    };

    return (
        <div className="traduction-container">
            {showCGU && <CGU onClose={handleCloseCGU} />}
            
            <video
                ref={videoRef}
                className="signlang_video"
                autoPlay
                muted
                playsInline
                onLoadedMetadata={onLoaded}
            />
            <canvas ref={canvasRef} className="signlang_canvas" style={{ width: "15%", height: "auto" }} />

            <div className="controls" style={{

            }}>
                <div className="startDiv">
                    <button onClick={onToggle} disabled={!isReady || !recognizer} id="start-btn">
                        {running ? "Arrêter" : "Commencer"}
                    </button>

                </div>
                <div style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    width: "15%",
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0
                }}
                    id="start-btn"
                >
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={videoInput ? false : true}
                            onChange={() => videoInput ? setVideoInput(null) : setVideoInput("/video/A2.mp4")}
                        />
                        <span className="slider round"></span>
                    </label>
                    <span>Mode {videoInput ? "Video" : "Webcam"}</span>
                </div>
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

                        {isWide && (

                            <div style={{
                                position: "absolute",
                                bottom: 10,
                                right: 0,
                                width: "15%",
                                borderRadius: 15,
                                border: "1px solid black",
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
                        )}
                    </div>
                )}
                
                {/* Bottom left buttons */}
                <div className="helpersDiv" style={{ display: running ? "none" : "block" }}>
                    <button 
                        onClick={handleShowTutorial}    
                        className="start-btn"                        
                    >
                        ?
                    </button>
                    <button 
                        onClick={handleShowCGU}
                        className="start-btn"                        

                    >
                        CGU
                    </button>
                </div>               
            </div>
        </div>
    );
};

export default Traduction;
