/* eslint-disable no-unused-vars */
import { HAND_CONNECTIONS } from "@mediapipe/hands";
import { FilesetResolver, GestureRecognizer } from "@mediapipe/tasks-vision";
import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Traduction.css";


import Webcam from "react-webcam";
import ProgressBar from "./ProgressBar/ProgressBar.jsx";

let startTime = new Date(0);

const Traduction = () => {
  const webcamRef = useRef<any>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webcamRunning, setWebcamRunning] = useState<boolean>(false);
  const [gestureOutput, setGestureOutput] = useState<any>();
  const [gestureRecognizer, setGestureRecognizer] = useState<any>();
  const [runningMode, setRunningMode] = useState<any>("IMAGE");
  const [progress, setProgress] = useState<any>();

  const requestRef = useRef<any>();

  const [detectedData, setDetectedData] = useState<any[]>([]);

  const [currentImage, setCurrentImage] = useState<any>(null);

  const drawCustomLandmarks = (ctx: CanvasRenderingContext2D, landmarks: any[], { color = "#FF0000", size = 5 }: any) => {
    landmarks.forEach((landmark: { x: number; y: number; }) => {
      ctx.beginPath();
      canvasRef.current && ctx.arc(landmark.x * canvasRef.current.width, landmark.y * canvasRef.current.height, size, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
    });
    };
    const drawCustomConnectors = (ctx: CanvasRenderingContext2D, landmarks: { [x: string]: any; }, connections: [any, any][], { color = "#00FF00", lineWidth = 2 }: any) => {
        connections.forEach(([start, end]) => {
        const startLandmark = landmarks[start];
        const endLandmark = landmarks[end];
    
        if (startLandmark && endLandmark) {
            ctx.beginPath();
            canvasRef.current && ctx.moveTo(startLandmark.x * canvasRef.current.width, startLandmark.y * canvasRef.current.height);
            canvasRef.current && ctx.lineTo(endLandmark.x * canvasRef.current.width, endLandmark.y * canvasRef.current.height);
            ctx.strokeStyle = color;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
        }
    });
  };
 
  const predictWebcam = useCallback(() => {
    if (runningMode === "IMAGE") {
      setRunningMode("VIDEO");
      gestureRecognizer.setOptions({ runningMode: "VIDEO" });
    }

    let nowInMs = Date.now();
    const results = gestureRecognizer.recognizeForVideo(
      webcamRef?.current?.video,
      nowInMs
    );

    const canvasCtx = canvasRef.current && canvasRef.current.getContext("2d");
    if (!canvasCtx) {
        console.error("Le contexte du canvas est introuvable.");
        return;
      }
    canvasCtx.save();
    canvasRef.current && canvasCtx.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    ); 
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    // Set video width
    webcamRef.current.video.width = videoWidth;
    webcamRef.current.video.height = videoHeight;

    // Set canvas height and width
    if(canvasRef.current){
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;
}
    // Draw the results on the canvas, if any.
    if (results.landmarks) {
        console.log("Landmarks détectés :", results.landmarks);
        console.log(canvasCtx)
      
        drawCustomConnectors(canvasCtx, results.landmarks, HAND_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 5,
        });

        drawCustomLandmarks(canvasCtx, results.landmarks, { color: "black", lineWidth: 2 });

        // // Define the text and styling
        // const text = "Salut";
        // const fontSize = 24;
        // const fontColor = "black";

        // // Position where you want to draw the text
        // const xPosition = 10;
        // const yPosition = 50;

        // // Draw the text
        // canvasCtx.font = `${fontSize}px Arial`;
        // canvasCtx.fillStyle = fontColor;
        // canvasCtx.fillText(text, xPosition, yPosition);

      
    }
    if (results.gestures.length > 0) {
      setDetectedData((prevData : any) => [
        ...prevData,
        {
          SignDetected: results.gestures[0][0].categoryName,
        },
      ]);

      setGestureOutput(results.gestures[0][0].categoryName);
      setProgress(Math.round(results.gestures[0][0].score) * 100);
    } else {
      setGestureOutput("");
      setProgress(0);
    }

    if (webcamRunning === true) {
      requestRef.current = requestAnimationFrame(predictWebcam);
    }
  }, [webcamRunning, runningMode, gestureRecognizer, setGestureOutput]);

  const animate = useCallback(() => {
    requestRef.current = requestAnimationFrame(animate);
    predictWebcam();
  }, [predictWebcam]);

  const enableCam = useCallback(() => {
    if (!gestureRecognizer) {
      alert("Please wait for gestureRecognizer to load");
      return;
    }

    if (webcamRunning === true) {
      setWebcamRunning(false);
      cancelAnimationFrame(requestRef.current);
      setCurrentImage(null);

      const endTime = new Date();

      const timeElapsed = (
        (endTime.getTime() - startTime.getTime()) /
        1000
      ).toFixed(2);

      // Remove empty values
      const nonEmptyData = detectedData.filter(
        (data : any ) => data.SignDetected !== "" && data.DetectedScore !== ""
      );

      //to filter continous same signs in an array
      const resultArray: any[] = [];
      let current = nonEmptyData[0];

      for (let i = 1; i < nonEmptyData.length; i++) {
        if (nonEmptyData[i].SignDetected !== current.SignDetected) {
          resultArray.push(current);
          current = nonEmptyData[i];
        }
      }

      resultArray.push(current);

      //calculate count for each repeated sign
      const countMap = new Map();

      for (const item of resultArray) {
        const count = countMap.get(item.SignDetected) || 0;
        countMap.set(item.SignDetected, count + 1);
      }

      const sortedArray = Array.from(countMap.entries()).sort(
        (a, b) => b[1] - a[1]
      );

      const outputArray = sortedArray
        .slice(0, 5)
        .map(([sign, count]) => ({ SignDetected: sign, count }));

      // object to send to action creator
      const data = {
        signsPerformed: outputArray,
        id: uuidv4(),
        username: "user?.name",
        userId: "user?.userId",
        createdAt: String(endTime),
        secondsSpent: Number(timeElapsed),
      };

      setDetectedData([]);
    } else {
      setWebcamRunning(true);
      startTime = new Date();
      requestRef.current = requestAnimationFrame(animate);
    }
  }, [
    webcamRunning,
    gestureRecognizer,
    animate,
    detectedData,
    "user?.name",
    " user?.userId",
  ]);

  useEffect(() => {
    async function loadGestureRecognizer() {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );
      const recognizer = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "/gesture_recognizer.task",
        },
        numHands: 2,
        runningMode: runningMode,
      });
      setGestureRecognizer(recognizer);
    }
    loadGestureRecognizer();
  }, [runningMode]);

  return (
    <>
      <div className="signlang_detection-container">
        <>
          <div style={{ position: "relative" }}>
            <Webcam
              audio={false}
              ref={webcamRef}
              // screenshotFormat="image/jpeg"
              className="signlang_webcam"
            />

            <canvas ref={canvasRef} className="signlang_canvas" />

            <div className="signlang_data-container">
              <button onClick={enableCam}>
                {webcamRunning ? "Stop" : "Start"}
              </button>

              <div className="signlang_data">
                <p className="gesture_output">{gestureOutput}</p>

                {progress ? <ProgressBar progress={progress} /> : null}
              </div>
            </div>
          </div>

           
        </>

         
      </div>
    </>
  );
};

export default Traduction;
