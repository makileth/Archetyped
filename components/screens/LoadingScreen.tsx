"use client";
import React, { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timers = [
      { timeout: 250, progress: 30 },
      { timeout: 1000, progress: 60 },
      { timeout: 750, progress: 90 },
      { timeout: 1500, progress: 100 },
    ];

    timers.forEach((timer, index) => {
      // function to update progress
      setTimeout(
        () => {
          setProgress(timer.progress); // Update
        },
        timers.slice(0, index + 1).reduce((acc, cur) => acc + cur.timeout, 0)
      );
    });

    // Cleanup timeouts on component unmount
    return () => {
      timers.forEach((timer, index) => {
        clearTimeout(
          timers.slice(0, index + 1).reduce((acc, cur) => acc + cur.timeout, 0)
        );
      });
    };
  }, []); // Empty dependency array to ensure this effect runs only once

  return (
    <div className="fixed bg-white w-full z-[50] pt-[20rem] md:pt-[35%] items-center justify-center h-full">
      <div className="flex mx-auto flex-col items-center space-y-2 w-[90%] md:w-1/3">
        <div className="w-full h-[0.125rem] relative bg-neutral-200 dark:bg-gray-800">
          <div
            className="h-1 bg-neutral-900 bottom-0 absolute transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
