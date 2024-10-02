// src/components/NeuralNetwork.js
import React, { useEffect, useState } from 'react';
import Neuron from './Neuron';
import Connection from './Connection';

// generate random voltage values
//TODO:
const getRandomVoltage = (minVoltage, maxVoltage) => {
  return Math.random() * (maxVoltage - minVoltage) + minVoltage;
};

  const testVoltages = async () => {
    return [10, 0.2, 0.3, 0.4, 0.5, 0.06]; 
  };
const NeuralNetwork = ({ neurons, connections }) => {
  const [neuronStates, setNeuronStates] = useState(neurons);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const voltages = await testVoltages(); 

      setNeuronStates((prevStates) =>
        prevStates.map((neuron, i) => ({
          ...neuron,
          voltage: voltages[i], 
        }))
      );
    }, 100);

    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, []);

  return (
    <svg width="600" height="600">
      {connections.map((connection, i) => (
        <Connection
          key={i}
          x1={neuronStates[connection.from].x}
          y1={neuronStates[connection.from].y}
          x2={neuronStates[connection.to].x}
          y2={neuronStates[connection.to].y}
          thickness={connection.thickness}
        />
      ))}
      {neuronStates.map((neuron, i) => (
        <Neuron
          key={i}
          voltage={neuron.voltage}
          minVoltage={0}
          maxVoltage={1}
          x={neuron.x}
          y={neuron.y}
        />
      ))}
    </svg>
  );
};

export default NeuralNetwork;
