// src/components/Neuron.js
import React from 'react';

// Function to map voltage to color (green to red gradient)
const voltageToColor = (voltage, minVoltage, maxVoltage) => {
  const percentage = (voltage - minVoltage) / (maxVoltage - minVoltage);
  const r = Math.floor(percentage * 255);
  const g = Math.floor((1 - percentage) * 255);
  return `rgb(${r},${g},0)`; // Color from green to red
};

const Neuron = ({ voltage, minVoltage, maxVoltage, x, y }) => {
  const color = voltageToColor(voltage, minVoltage, maxVoltage);
  return <circle cx={x} cy={y} r="20" fill={color} stroke="black" />;
};

export default Neuron;
