import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';

const CircularProgressBar = () => {
  const { store, actions } = useContext(Context);
  const [progress, setProgress] = useState(0);
  const radius = 100;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = (1 - progress / 100) * circumference;

  useEffect(() => {
    actions.fetchAllDonation();
  }, []);

  useEffect(() => {
    setProgress(store.progressPercentage);
  }, [store.progressPercentage]);

  return (
    <div className="App">
      <svg className="circular-progress" width={radius * 2} height={radius * 2}>
        <circle
          className="circular-progress-background"
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          strokeWidth={strokeWidth}
        />
        <circle
          className="circular-progress-bar"
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
        <text
          x={radius}
          y={radius}
          className="circular-progress-text"
          textAnchor="middle"
          dy=".35em"
          fill="#333"
        >
          {progress}%
        </text>
      </svg>
    </div>
  );
}

export default CircularProgressBar;
