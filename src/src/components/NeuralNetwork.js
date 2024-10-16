// src/components/NeuralNetwork.js
import React, { useEffect, useState } from 'react';
import Neuron from './Neuron';
import Connection from './Connection';
import NeuronView from './NeuronView';

///////////////////////////////////////////////////////////////////////////// RECEIVING VOLTAGES PART /////////////////////////////////////////////////////////////////////////////

// let receivedVoltages = Array(8).fill(0);  // IMPORTANT use correct array size

// let socket;

// const connectWebSocket = () => {
//   socket = new WebSocket('ws://192.168.1.10:5000');  // IMPORTANT Replace with the correct IP and port
//   socket.binaryType = 'arraybuffer';  

//   socket.onopen = () => {
//     console.log("WebSocket connection established");
//   };

//   socket.onmessage = (event) => {
//     receivedVoltages = Array.from(new Float32Array(event.data));
//   };

//   socket.onclose = () => {
//     console.log("WebSocket connection closed. Attempting to reconnect...");
//     setTimeout(connectWebSocket, 2000);  // Retry every 2 seconds
//   };

//   socket.onerror = (error) => {
//     console.error("WebSocket encountered an error:", error);
//     socket.close();  
//   };
// };

// connectWebSocket();

// const getRandomVoltage = (minVoltage, maxVoltage) => {
//   return Math.random() * (maxVoltage - minVoltage) + minVoltage;
// };

const testVoltages = async () => {
  return [10, 0.2, 0.3, 0.4, 0.5, 0.06, 2, 0.7]; 
};
///////////////////////////////////////////////////////////////////////////// VISUALIZATION PART /////////////////////////////////////////////////////////////////////////////
const NeuralNetwork = ({ neurons, connections }) => {
  const [neuronStates, setNeuronStates] = useState(neurons);
  const [selectedNeuron, setSelectedNeuron] = useState(null);
  

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const voltages = await testVoltages();
      setNeuronStates((prevStates) =>
        prevStates.map((neuron, i) => ({
          ...neuron,
          //voltage: receivedVoltages[i] || neuron.voltage
          voltage: voltages[i],
        }))
      );
    }, 200);

    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, []);

  const handleNeuronClick = (neuronIndex) => {
    setSelectedNeuron(neuronIndex);
  };
  
  return (
    <div>
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
            onClick={() => handleNeuronClick(i)}  // Add click handler
          />
        ))}
      </svg>
      {selectedNeuron !== null && (
        <NeuronView 
          neuronIndex={selectedNeuron} 
          voltage={neuronStates[selectedNeuron]?.voltage}
        />
      )}
    </div>
  );
}


export default NeuralNetwork;
