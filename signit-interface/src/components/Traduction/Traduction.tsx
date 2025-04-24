import {
    DrawingUtils,
    FilesetResolver,
    GestureRecognizer
} from "@mediapipe/tasks-vision";
import { useCallback, useEffect, useRef, useState } from 'react';
import "../../styles/traduction.css";
import imageList, { ImageList } from "../ImageAlphabet/imageList";

/* Stream Unity */
import { Signaling, WebSocketSignaling } from "../Signaling/signaling";
import { getServerConfig, getRTCConfiguration } from "../Signaling/config";
// import Callbacks from 
import { RenderStreaming } from "../Signaling/renderstreaming";
import { VideoPlayer } from "../Signaling/videoplayer";

/** @type {RenderStreaming} */
let renderstreaming: RenderStreaming;
/** @type {boolean} */
let useWebSocket: boolean;
const videoPlayer = new VideoPlayer();
const playerDiv = document.getElementById('player')!;
const lockMouseCheck = document.getElementById('lockMouseCheck') as HTMLInputElement;


let startTime = new Date(0);

const Traduction = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number>();

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
    // On ajoute la lettre seulement si elle reste la même pendant 1 seconde.
    useEffect(() => {
        if (currentLetter) {
            const timeoutId = setTimeout(() => {
                setSignedLetters(prevLetters => [
                    ...prevLetters,
                    { letter: currentLetter, timestamp: Date.now(), className: 'signed' }
                ]);
            }, 500);

            return () => clearTimeout(timeoutId);
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

    /* Testing stream from unity */

    type SignalingMessage = {
        // type: 'offer' | 'answer' | 'candidate' | string;
        // [key: string]: any;
        type: string;  // e.g., 'offer', 'answer', 'candidate'
        sdp?: string;
        candidate?: RTCIceCandidateInit;
      };

    interface Callbacks {
    onConnect?: () => void;
    onDisconnect?: () => void;
    onOffer?: (msg: SignalingMessage) => void;
    onAnswer?: (msg: SignalingMessage) => void;
    onCandidate?: (msg: RTCIceCandidateInit) => void;
    onTrackEvent?: (data: RTCTrackEvent) => void;  // Add this line
    onGotOffer?: (offer: RTCSessionDescriptionInit) => void;
    }

    async function setup() {
        const res = await getServerConfig();
        useWebSocket = res.useWebSocket;
      }
      
    
    const UnityStream = () => {

        setup();

        // const videoRef = useRef<HTMLVideoElement | null>(null);
        // const peerRef = useRef<RTCPeerConnection | null>(null);
      
        // useEffect(() => {
        //   const signaling = new WebSocketSignaling('ws:///192.168.56.17:80', {
        //     onOffer: async (msg) => {
        //       // 👇 Convert the incoming signaling message to RTCSessionDescriptionInit
        //       const offer: RTCSessionDescriptionInit = {
        //         type: msg.type as RTCSdpType, // 'offer'
        //         sdp: msg.sdp,
        //       };
      
        //       const pc = new RTCPeerConnection();
        //       peerRef.current = pc;
      
        //       pc.ontrack = (event) => {
        //         if (videoRef.current) {
        //           videoRef.current.srcObject = event.streams[0];
        //         }
        //       };
      
        //       await pc.setRemoteDescription(new RTCSessionDescription(offer));
        //       const answer = await pc.createAnswer();
        //       await pc.setLocalDescription(answer);
      
        //       signaling.send({
        //         type: 'answer',
        //         sdp: answer.sdp,
        //       });
        //     }
        //   });

      
        //   return () => {
        //     if (peerRef.current) peerRef.current.close();
        //     signaling.close(); // Always good to clean up
        //   };
        // }, []);

        /* Version 2 */

        // const videoRef = useRef<HTMLVideoElement | null>(null);
        const peerRef = useRef<RTCPeerConnection | null>(null);
        const signalingRef = useRef<WebSocketSignaling | null>(null);

        const onConnect = () => {
            console.log("Connected to Unity");
          };
        
          const onDisconnect = () => {
            console.log("Disconnected from Unity");
          };
        
          const setCodecPreferences = (offer: RTCSessionDescriptionInit) => {
            console.log("Setting codec preferences", offer);
            // Here you can set codec preferences for the WebRTC connection if needed
          };
        
          const handleTrackEvent = (data: RTCTrackEvent) => {
            if (videoRef.current) {
              // Add the video track to the video element
              videoRef.current.srcObject = data.streams[0];
            }
          };

        const [ws, setWs] = useState<WebSocket | null>(null);
        const [response, setResponse] = useState('');
        //setupRenderStreaming();
        
          useEffect(() => {
            const playerDiv = document.getElementById('player');
            //const signaling = new WebSocketSignaling('ws://192.168.56.17:80');

            const socket = new WebSocket('ws://192.168.56.17:80');

            socket.onopen = () => {
            //console.log('Connected to WebSocket server');
            // socket.send('Hello from React');
            };

            socket.onmessage = (event) => {
            console.log('Received:', event.data);
            setResponse(event.data);
            };

            setWs(socket);

                return () => {
                socket.close();
                };
            }, []);
            
            // signaling.send = (msg: SignalingMessage) => {
            //     console.log('Received offer:', msg);
            //     const offer: RTCSessionDescriptionInit = {
            //         type: msg.type as RTCSdpType, // Ensure correct type matching
            //         sdp: msg.sdp ?? '', // Ensure `sdp` exists (could also handle null or undefined cases)
            //     };

            //     const pc = new RTCPeerConnection();
        
            //     peerRef.current = pc;
                
            //     //pc.ontrack = handleTrackEvent;
            //     pc.ontrack = (event) => {
            //         console.log('Track event received:', event);
            //         if (event.streams[0]) {
            //             console.log('Received stream:', event.streams[0]);
            //             if (videoRef.current) {
            //               videoRef.current.srcObject = event.streams[0];
            //             }
            //           }
            //     };
                
            //     // Set the remote offer description
            //     await pc.setRemoteDescription(new RTCSessionDescription(offer));

            //     // Create an answer
            //     const answer = await pc.createAnswer();
            //     await pc.setLocalDescription(answer);
        
            //     signaling.send({
            //       type: 'answer',
            //       sdp: answer.sdp,
            //     });
            //   },

            //   onConnect: onConnect,
            //   onDisconnect: onDisconnect,
            //   onTrackEvent: handleTrackEvent,
            //   onGotOffer: setCodecPreferences,
            // });
        
        //     signalingRef.current = signaling;
        
        //     return () => {
        //       signalingRef.current?.close();
        //       if (peerRef.current) peerRef.current.close();
        //     };
        //   }, []);
    }

    async function setupRenderStreaming() {
    //   codecPreferences.disabled = true;
      const signaling = useWebSocket ? new WebSocketSignaling() : new Signaling();
      const config = getRTCConfiguration();
      renderstreaming = new RenderStreaming(signaling, config);
      renderstreaming.onConnect = onConnect;
      renderstreaming.onDisconnect = onDisconnect;
      renderstreaming.onTrackEvent = (data) => videoPlayer.addTrack(data.track);
      renderstreaming.onGotOffer = setCodecPreferences;
    
      await renderstreaming.start();
      await renderstreaming.createConnection("aaa");
    }
    
    function onClickPlayButton() {
        // add video player
        videoPlayer.createPlayer(playerDiv, lockMouseCheck);
        setupRenderStreaming();
      }
    
    function onConnect() {
        const channel = renderstreaming.createDataChannel("input");
        videoPlayer.setupInput(channel);
    }

    async function onDisconnect() {
        
        await renderstreaming.stop();
        // renderstreaming = null;
        videoPlayer.deletePlayer();
    }

    function setCodecPreferences() {
        /** @type {RTCRtpCodecCapability[] | null} */
        let selectedCodecs = null;
        // if (supportsSetCodecPreferences) {
        //   const preferredCodec = codecPreferences.options[codecPreferences.selectedIndex];
        //   if (preferredCodec.value !== '') {
        //     const [mimeType, sdpFmtpLine] = preferredCodec.value.split(' ');
        //     const { codecs } = RTCRtpSender.getCapabilities('video');
        //     const selectedCodecIndex = codecs.findIndex(c => c.mimeType === mimeType && c.sdpFmtpLine === sdpFmtpLine);
        //     const selectCodec = codecs[selectedCodecIndex];
        //     selectedCodecs = [selectCodec];
        //   }
        // }
      
        if (selectedCodecs == null) {
          return;
        }
        // const transceivers = renderstreaming.getTransceivers().filter(t => t.receiver.track.kind == "video");
        // if (transceivers && transceivers.length > 0) {
        //   transceivers.forEach(t => t.setCodecPreferences(selectedCodecs));
        // }
      }

    

    UnityStream();

    /* End testing */


    return (
        <div className="traduction-container">
            <div id="player"></div>
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
                            onChange={() => videoInput ? setVideoInput(null) : setVideoInput("http://192.168.56.17:80")}
                            // onChange={() => videoInput ? setVideoInput("http://192.168.56.17:80") : setVideoInput("http://192.168.56.17:80")}
                        />
                        <span className="slider round"></span>
                    </label>
                    <span>Mode {videoInput ? "Video" : "Webcam"}</span>
                    {/* <label className="switch">
                            <input
                            type="checkbox"
                            checked={videoInput ? false : true}
                            onChange={() => videoInput ? setVideoInput(null) : setVideoInput("http://192.168.56.17:80")}
                            // onChange={() => videoInput ? setVideoInput("http://192.168.56.17:80") : setVideoInput("http://192.168.56.17:80")}
                        />
                        <span className="slider round"></span>
                    </label>
                    <span>Mode {videoInput ? "Video" : "Webcam"}</span> */}
                </div>
                {running && (
                    <div className="info">
                        <div className="top">
                            <p className="gesture_output">{currentLetter || "..."}</p>

                            {score > 0 ? <span className="score">{score}%</span> : <span className="score">--%</span>}
                        </div>

                        {signedLetters.map((letter, index) => {
                            return <div className="signed top noborder">
                                <p className={letter.className + " gesture_output"}>{letter.letter || "..."}</p>

                            </div>
                        })}
                        {/* {isWide && (
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={showLandmarks}
                                onChange={() => setShowLandmarks((v) => !v)}
                            />
                            <span>Afficher matrice</span>
                        </label>
                    )} */}
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

                                <select onChange={(e) => setPictureURL(e.target.value)}>
                                    <option value="">-- Sélectionner --</option>
                                    {imageList.map((img: ImageList) => (
                                        <option key={img.src} value={img.src}>
                                            {img.alt}
                                        </option>
                                    ))}
                                </select>

                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
    
};

export default Traduction;
