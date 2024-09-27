import React from 'react';

// calculate where the line should stop to touch the edge of the neuron
const calculateEdgePoint = (x1, y1, x2, y2, radius) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  // Normalize the direction vector and multiply by the radius
  const ratio = radius / distance;
  const offsetX = dx * ratio;
  const offsetY = dy * ratio;
  
  // Return the adjusted start and end points
  return {
    x1: x1 + offsetX, // Start point moved towards the target neuron
    y1: y1 + offsetY,
    x2: x2 - offsetX, // End point moved towards the source neuron
    y2: y2 - offsetY,
  };
};

const Connection = ({ x1, y1, x2, y2, thickness, neuronRadius = 20 }) => {
  const { x1: newX1, y1: newY1, x2: newX2, y2: newY2 } = calculateEdgePoint(
    x1,
    y1,
    x2,
    y2,
    neuronRadius
  );

  return (
    <>
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="10"
          refY="3.5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="black" />
        </marker>
      </defs>
      <line
        x1={newX1}
        y1={newY1}
        x2={newX2}
        y2={newY2}
        stroke="black"
        strokeWidth={thickness}
        markerEnd="url(#arrowhead)" // Attach the arrowhead here
      />
    </>
  );
};

export default Connection;
