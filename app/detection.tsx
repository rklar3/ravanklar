'use client';

import { useState, useRef, useEffect } from 'react';
import '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';

const ImageDetection: React.FC = () => {
  const [model, setModel] = useState<any>(null);
  const [detections, setDetections] = useState<any[]>([]);
  const [isWorkoutStarted, setIsWorkoutStarted] = useState<boolean>(false);
  const [squatCount, setSquatCount] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const [isDown, setIsDown] = useState<boolean>(false);
  const [showDetections, setShowDetections] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await posenet.load();
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
    setSquatCount(0);
    setTimer(0);
    intervalRef.current = window.setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000); // Increment timer every second
  };

  const stopWorkout = () => {
    setIsWorkoutStarted(false);
    clearInterval(intervalRef.current);
  };

  const drawStickFigure = (ctx: CanvasRenderingContext2D, pose: any) => {
    const keypoints = pose.keypoints.filter((point: any) => point.score >= 0.5);

    // Define connections between keypoints
    const connections = [
      ['leftShoulder', 'leftElbow'],
      ['leftElbow', 'leftWrist'],
      ['rightShoulder', 'rightElbow'],
      ['rightElbow', 'rightWrist'],
      ['leftShoulder', 'rightShoulder'],
      ['leftShoulder', 'leftHip'],
      ['rightShoulder', 'rightHip'],
      ['leftHip', 'leftKnee'],
      ['leftKnee', 'leftAnkle'],
      ['rightHip', 'rightKnee'],
      ['rightKnee', 'rightAnkle'],
    ];

    // Draw skeleton
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear canvas before drawing
    ctx.beginPath();

    connections.forEach(([part1, part2]) => {
      const keypoint1 = keypoints.find((point: any) => point.part === part1);
      const keypoint2 = keypoints.find((point: any) => point.part === part2);

      if (keypoint1 && keypoint2) {
        ctx.moveTo(keypoint1.position.x, keypoint1.position.y);
        ctx.lineTo(keypoint2.position.x, keypoint2.position.y);
      }
    });

    ctx.stroke();

    // Draw keypoints
    ctx.fillStyle = 'red';
    keypoints.forEach((keypoint: any) => {
      ctx.beginPath();
      ctx.arc(keypoint.position.x, keypoint.position.y, 5, 0, 2 * Math.PI);
      ctx.fill();
    });
  };

  const detectPoses = async () => {
    if (model && videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (video.videoWidth > 0 && video.videoHeight > 0 && ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const poses = await model.estimateMultiplePoses(video, {
          flipHorizontal: false,
          maxDetections: 5,
          scoreThreshold: 0.5,
          nmsRadius: 20,
        });
        setDetections(poses);

        // Clear canvas and draw poses
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        poses.forEach((pose: { score: number; keypoints: any[]; }) => {
          if (pose.score >= 0.5) {
            drawStickFigure(ctx, pose);
            if (showDetections) {
              if (isWorkoutStarted) {
                const leftHip = pose.keypoints.find((point: { part: string; }) => point.part === 'leftHip');
                const rightHip = pose.keypoints.find((point: { part: string; }) => point.part === 'rightHip');
                const leftKnee = pose.keypoints.find((point: { part: string; }) => point.part === 'leftKnee');
                const rightKnee = pose.keypoints.find((point: { part: string; }) => point.part === 'rightKnee');

                if (leftHip && rightHip && leftKnee && rightKnee) {
                  const avgHipY = (leftHip.position.y + rightHip.position.y) / 2;
                  const avgKneeY = (leftKnee.position.y + rightKnee.position.y) / 2;

                  // Detecting downward movement (squat down)
                  if (avgHipY > avgKneeY && !isDown) {
                    setIsDown(true);
                  }
                  // Detecting upward movement (standing up)
                  else if (avgHipY < avgKneeY && isDown) {
                    setIsDown(false);
                    setSquatCount((prevCount) => prevCount + 1);
                  }
                }
              }
            }
          }
        });
      }
      requestAnimationFrame(detectPoses);
    }
  };

  useEffect(() => {
    startVideo();
    detectPoses();
  }, [model, showDetections]);

  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen">
      <style jsx>{`
        video {
          object-fit: cover;
          width: 100vw;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
        }
        canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>

      <video
        ref={videoRef}
        autoPlay
        muted
      />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
      />
      <div className="absolute top-0 left-0 z-10 text-white bg-black bg-opacity-50 p-2 rounded w-full">
        <h2>Detections:</h2>
        {showDetections && (
          <ul>
            {detections.map((detection: any, index: number) => (
              <li key={index}>
                Pose {index + 1} - Score: {(detection.score * 100).toFixed(2)}%
                {detection.keypoints.map((keypoint: any) => (
                  <div key={keypoint.part}>
                    {keypoint.part} - X: {keypoint.position.x.toFixed(2)}, Y: {keypoint.position.y.toFixed(2)}, Score: {(keypoint.score * 100).toFixed(2)}%
                  </div>
                ))}
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={() => setShowDetections(!showDetections)}
          className="mt-2 bg-gray-800 text-white px-4 py-2 rounded"
        >
          {showDetections ? 'Hide Poses' : 'Show Poses'}
        </button>
      </div>

      {isWorkoutStarted ? (
        <>
          <div className="absolute bottom-10 left-0 z-10 text-white bg-black bg-opacity-50 p-2 rounded w-full sm:w-auto">
            <h2>Timer: {timer} seconds</h2>
            <h2>Squats: {squatCount}</h2>
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
