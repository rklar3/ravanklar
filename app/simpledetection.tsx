// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import '@tensorflow/tfjs';
// import * as posenet from '@tensorflow-models/posenet';

// const CameraAndBox: React.FC = () => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [model, setModel] = useState<any>(null);
//   const requestRef = useRef<number>();

//   useEffect(() => {
//     console.log('Component mounted, loading model...');
//     const loadModel = async () => {
//       try {
//         const loadedModel = await posenet.load({
//           architecture: 'MobileNetV1',
//           outputStride: 16,
//           inputResolution: { width: 640, height: 480 },
//           multiplier: 0.75
//         });
//         console.log('Model loaded successfully');
//         setModel(loadedModel);
//       } catch (error) {
//         console.error('Error loading model:', error);
//       }
//     };

//     loadModel();

//     return () => {
//       if (requestRef.current) {
//         console.log('Cleaning up animation frame');
//         cancelAnimationFrame(requestRef.current);
//       }
//     };
//   }, []);

//   const startVideo = async (): Promise<void> => {
//     console.log('Starting video...');
//     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         console.log('Got media stream');
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//           await new Promise<void>((resolve) => {
//             if (videoRef.current) {
//               videoRef.current.onloadedmetadata = () => {
//                 console.log('Video metadata loaded');
//                 videoRef.current?.play();
//                 resolve();
//               };
//             }
//           });
//           console.log('Video started playing');
//         }
//       } catch (error) {
//         console.error('Error accessing webcam:', error);
//       }
//     }
//   };

//   const detectPose = async () => {
//     if (model && videoRef.current && canvasRef.current) {
//       const video = videoRef.current;
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext('2d');

//       if (video.videoWidth > 0 && video.videoHeight > 0 && ctx) {
//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;

//         ctx.clearRect(0, 0, canvas.width, canvas.height);

//         try {
//           const poses = await model.estimateSinglePose(video, {
//             flipHorizontal: false,
//             decodingMethod: 'single-person',
//             scoreThreshold: 0.5,
//           });

//           if (poses.keypoints) {
//             drawStickFigure(ctx, poses.keypoints);
//           }
//         } catch (error) {
//           console.error('Error during pose estimation:', error);
//         }
//       }
//     }
//     requestRef.current = requestAnimationFrame(detectPose);
//   };

//   const drawStickFigure = (ctx: CanvasRenderingContext2D, keypoints: any[]) => {
//     const connections = [
//       ['leftShoulder', 'rightShoulder'],
//       ['leftShoulder', 'leftElbow'],
//       ['leftElbow', 'leftWrist'],
//       ['rightShoulder', 'rightElbow'],
//       ['rightElbow', 'rightWrist'],
//       ['leftShoulder', 'leftHip'],
//       ['rightShoulder', 'rightHip'],
//       ['leftHip', 'rightHip'],
//       ['leftHip', 'leftKnee'],
//       ['leftKnee', 'leftAnkle'],
//       ['rightHip', 'rightKnee'],
//       ['rightKnee', 'rightAnkle']
//     ];

//     ctx.strokeStyle = 'yellow';
//     ctx.lineWidth = 2;

//     connections.forEach(([startPoint, endPoint]) => {
//       const start = keypoints.find(kp => kp.part === startPoint);
//       const end = keypoints.find(kp => kp.part === endPoint);

//       if (start && end && start.score > 0.5 && end.score > 0.5) {
//         ctx.beginPath();
//         ctx.moveTo(start.position.x, start.position.y);
//         ctx.lineTo(end.position.x, end.position.y);
//         ctx.stroke();
//       }
//     });

//     // Draw head
//     const nose = keypoints.find(kp => kp.part === 'nose');
//     if (nose && nose.score > 0.5) {
//       ctx.beginPath();
//       ctx.arc(nose.position.x, nose.position.y, 20, 0, 2 * Math.PI);
//       ctx.stroke();
//     }

//     // Draw keypoints
//     keypoints.forEach(keypoint => {
//       if (keypoint.score > 0.5) {
//         ctx.fillStyle = 'red';
//         ctx.beginPath();
//         ctx.arc(keypoint.position.x, keypoint.position.y, 5, 0, 2 * Math.PI);
//         ctx.fill();
//       }
//     });
//   };

//   useEffect(() => {
//     console.log('Model state changed, model:', model);
//     const runDetection = async () => {
//       await startVideo();
//       if (model) {
//         console.log('Starting pose detection loop');
//         detectPose();
//       }
//     };

//     if (model) {
//       runDetection();
//     }

//     return () => {
//       if (requestRef.current) {
//         console.log('Cleaning up animation frame');
//         cancelAnimationFrame(requestRef.current);
//       }
//     };
//   }, [model]);

//   return (
//     <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
//       <video
//         ref={videoRef}
//         style={{
//           position: 'absolute',
//           width: '100%',
//           height: '100%',
//           objectFit: 'cover',
//           zIndex: 1,
//         }}
//         autoPlay
//         muted
//         playsInline
//       />
//       <canvas
//         ref={canvasRef}
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '100%',
//           zIndex: 2,
//         }}
//       />
//     </div>
//   );
// };

// export default CameraAndBox;