/* eslint-disable no-unused-vars */
import {
  FilesetResolver,
  GestureRecognizer,
  DrawingUtils
} from "@mediapipe/tasks-vision";
import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../../styles/traduction.css";
import Webcam from "react-webcam";
import ProgressBar from "../ProgressBar/ProgressBar";

let startTime = new Date(0);

const Traduction = () => {
  const webcamRef = useRef<any>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webcamRunning, setWebcamRunning] = useState<boolean>(false);
  const [gestureOutput, setGestureOutput] = useState<any>();
  const [gestureRecognizer, setGestureRecognizer] = useState<any>();
  const [runningMode, setRunningMode] = useState<any>("VIDEO");
  const [progress, setProgress] = useState<any>();
  const [showLandmarks, setShowLandmarks] = useState<boolean>(false);
  const showLandmarksRef = useRef(showLandmarks);

  // Update ref at each state change => fix matrice
  useEffect(() => {
    showLandmarksRef.current = showLandmarks;
  }, [showLandmarks]);

  const requestRef = useRef<any>();

  const [detectedData, setDetectedData] = useState<any[]>([]);

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

    // Define dimension canvas
    const canvasCtx = canvasRef.current && canvasRef.current.getContext("2d");
    if (!canvasCtx) {
      console.error("Le contexte du canvas est introuvable.");
      return;
    }
    canvasCtx.save();
    canvasCtx.scale(-1, 1);

    canvasRef.current &&
      canvasCtx.clearRect(
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

    const drawingUtils = new DrawingUtils(canvasCtx);
    // Set canvas height and width
    if (canvasRef.current) {
      // console.log("Height" + videoHeight);
      // console.log("Width" + videoWidth);

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
    }

    // Create landmarks and connectors
    if (results.landmarks && showLandmarksRef.current) {
      for (const landmarks of results.landmarks) {
        // Create a mirrored version of the landmarks
        const mirroredLandmarks = landmarks.map((landmark: { x: number; y: any; z: any; }) => ({
          x: 1 - landmark.x,  // Invert the x-coordinate
          y: landmark.y,      // Keep y-coordinate the same
          z: landmark.z       // Keep z-coordinate the same
        }));

        drawingUtils.drawConnectors(
          mirroredLandmarks,
          GestureRecognizer.HAND_CONNECTIONS,
          {
            color: "#00FF00",
            lineWidth: 1,
          }
        );

        drawingUtils.drawLandmarks(mirroredLandmarks, {
          color: "#FF0000",
          lineWidth: 0.1,
        });
      }
    }

    // console.log(results.gestures.length);
    if (results.gestures.length > 0) {
      setDetectedData((prevData: any) => [
        ...prevData,
        {
          SignDetected: results.gestures[0][0].categoryName,
        },
      ]);

      setGestureOutput(results.gestures[0][0].categoryName);
      setProgress(Math.floor(results.gestures[0][0].score * 100));
    } else {
      setGestureOutput("");
      setProgress(0);
    }

    if (webcamRunning === true) {
      requestRef.current = requestAnimationFrame(predictWebcam);
    }
  }, [
    webcamRunning,
    runningMode,
    gestureRecognizer,
    setGestureOutput,
    showLandmarks,
  ]);

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

      const endTime = new Date();

      const timeElapsed = (
        (endTime.getTime() - startTime.getTime()) /
        1000
      ).toFixed(2);

      // Remove empty values
      const nonEmptyData = detectedData.filter(
        (data: any) => data.SignDetected !== "" && data.DetectedScore !== ""
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

      // console.log(resultArray);
      // for (const item of resultArray) {
      //   const count = countMap.get(item.SignDetected) || 0;
      //   console.log(count);
      //   console.log(item.SignDetected);
      //   countMap.set(item.SignDetected, count + 1);
      // }

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
    "user?.userId",
  ]);

  useEffect(() => {
    async function loadGestureRecognizer() {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
      );
      const recognizer = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "/gesture_recognizer.task",
          delegate: "GPU"
        },
        numHands: 1,
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
              mirrored={true}
              // screenshotFormat="image/jpeg"
              className="signlang_webcam"
            />

            <canvas ref={canvasRef} className="signlang_canvas" />

            <div className="signlang_data-container camera-button-container">
              <button onClick={enableCam}>
                {webcamRunning ? "Stop" : "Start"}
              </button>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={showLandmarks}
                  onChange={() => setShowLandmarks(!showLandmarks)}
                />
                <span className="slider round"></span>
              </label>
              <span>Afficher la matrice</span>

              <div className="signlang_data">
                <p className="gesture_output">{gestureOutput}</p>

                {progress && gestureOutput ? <ProgressBar progress={progress} /> : null}
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default Traduction;