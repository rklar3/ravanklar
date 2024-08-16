'use client';

import { useState, useRef, useEffect } from 'react';
import '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

const ImageDetection: React.FC = () => {
  const [model, setModel] = useState<any>(null);
  const [detections, setDetections] = useState<any[]>([]);
  const [isWorkoutStarted, setIsWorkoutStarted] = useState<boolean>(false);
  const [pushupCount, setPushupCount] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const [isDown, setIsDown] = useState<boolean>(false); // Track if the body is down in a pushup
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
    };

    loadModel();
  }, []);

  const startVideo = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    }
  };

  const startWorkout = () => {
    setIsWorkoutStarted(true);
    setPushupCount(0);
    setTimer(0);
    intervalRef.current = window.setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000); // Increment timer every second
  };

  const stopWorkout = () => {
    setIsWorkoutStarted(false);
    clearInterval(intervalRef.current);
  };

  const detectObjects = async () => {
    if (model && videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (video.videoWidth > 0 && video.videoHeight > 0) {
        const predictions = await model.detect(video);
        setDetections(predictions);

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          predictions.forEach((prediction: any) => {
            const [x, y, width, height] = prediction.bbox;
            ctx.beginPath();
            ctx.rect(x, y, width, height);
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'red';
            ctx.fillStyle = 'red';
            ctx.stroke();
            ctx.fillText(prediction.class, x, y > 10 ? y - 5 : 10);

            if (isWorkoutStarted && prediction.class === 'person') {
              // Improved pushup detection logic
              const personBottomY = y + height; // Bottom of the bounding box (could represent feet or lower body)

              // Detecting downward movement (e.g., when the body is low)
              if (personBottomY > video.videoHeight * 0.75 && !isDown) {
                setIsDown(true);
              }
              // Detecting upward movement (e.g., when the body is raised back up)
              else if (personBottomY < video.videoHeight * 0.6 && isDown) {
                setIsDown(false);
                setPushupCount((prevCount) => prevCount + 1); // Increment pushup count
              }
            }
          });
        }
      }
      requestAnimationFrame(detectObjects);
    }
  };

  useEffect(() => {
    startVideo();
    detectObjects();
  }, [model]);

  return (
    <div className="relative flex flex-col items-center justify-center">
      <video
        ref={videoRef}
        className="w-full h-auto max-w-4xl"
        autoPlay
        muted
      />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0"
      />
      <div
        className="absolute top-0 left-0 z-10 text-white bg-black bg-opacity-50 p-2 rounded w-full"
      >
        <h2>Detections:</h2>
        <ul>
          {detections.map((detection: any, index: number) => (
            <li key={index}>
              {detection.class} - {(detection.score * 100).toFixed(2)}%
            </li>
          ))}
        </ul>
      </div>

      {isWorkoutStarted ? (
        <>
          <div className="absolute bottom-10 left-0 z-10 text-white bg-black bg-opacity-50 p-2 rounded">
            <h2>Timer: {timer} seconds</h2>
            <h2>Pushups: {pushupCount}</h2>
          </div>
          <button
            onClick={stopWorkout}
            className="absolute bottom-10 right-0 z-10 bg-red-500 text-white px-4 py-2 rounded"
          >
            Stop Workout
          </button>
        </>
      ) : (
        <button
          onClick={startWorkout}
          className="absolute bottom-10 right-0 z-10 bg-green-500 text-white px-4 py-2 rounded"
        >
          Start Workout
        </button>
      )}
    </div>
  );
};

export default ImageDetection;
