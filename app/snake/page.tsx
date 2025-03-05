"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ... (other imports remain unchanged)

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const INITIAL_SPEED = 100;
const SPEED_INCREMENT = 10;

export default function LandingPage() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [apple, setApple] = useState({ x: 15, y: 15 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction]);

  useEffect(() => {
    if (gameOver) return;

    const moveSnake = () => {
      const newSnake = [...snake];
      const head = { ...newSnake[0] };
      head.x += direction.x;
      head.y += direction.y;

      // Check for collision with walls
      if (
        head.x < 0 ||
        head.x >= GRID_SIZE ||
        head.y < 0 ||
        head.y >= GRID_SIZE
      ) {
        setGameOver(true);
        return;
      }

      // Check for collision with self
      if (
        newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
      ) {
        setGameOver(true);
        return;
      }

      newSnake.unshift(head);

      // Check if snake ate the apple
      if (head.x === apple.x && head.y === apple.y) {
        const newScore = score + 1;
        setScore(newScore);
        setApple(getRandomApplePosition(newSnake));

        // Increase speed every 3 points
        if (newScore % 3 === 0) {
          setSpeed((prevSpeed) => Math.max(prevSpeed - SPEED_INCREMENT, 50));
        }
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    };

    gameLoopRef.current = setInterval(moveSnake, speed);
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [snake, direction, apple, gameOver, score, speed]);

  const getRandomApplePosition = (snake: { x: number; y: number }[]) => {
    let newApple: { x: any; y: any };
    do {
      newApple = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (
      snake.some(
        (segment) => segment.x === newApple.x && segment.y === newApple.y
      )
    );
    return newApple;
  };

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setApple(getRandomApplePosition(INITIAL_SNAKE));
    setScore(0);
    setGameOver(false);
    setSpeed(INITIAL_SPEED);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
      <Card className="w-[440px]">
        <CardHeader>
          <CardTitle>Snake Game</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 text-sm text-gray-600">
            <p>Instructions:</p>
            <ul className="list-disc list-inside">
              <li>Use arrow keys to move the snake</li>
              <li>Eat red apples to grow and score points</li>
              <li>Avoid hitting the walls or yourself</li>
              <li>The snake speeds up every 3 points</li>
            </ul>
          </div>
          <div
            className="relative"
            style={{
              width: GRID_SIZE * CELL_SIZE,
              height: GRID_SIZE * CELL_SIZE,
              border: "1px solid #ccc",
            }}
          >
            {snake.map((segment, index) => (
              <div
                key={index}
                className="absolute bg-green-500"
                style={{
                  left: segment.x * CELL_SIZE,
                  top: segment.y * CELL_SIZE,
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                }}
              />
            ))}
            <div
              className="absolute bg-red-500"
              style={{
                left: apple.x * CELL_SIZE,
                top: apple.y * CELL_SIZE,
                width: CELL_SIZE,
                height: CELL_SIZE,
                borderRadius: "50%",
              }}
            />
          </div>
          <div className="mt-4 text-center">
            <p>Score: {score}</p>
            {gameOver && (
              <div>
                <p className="text-red-500">Game Over!</p>
                <Button onClick={resetGame} className="mt-2">
                  Restart
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
