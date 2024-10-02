// src/components/NeuralNetwork.js
import React, { useEffect, useState } from 'react'
import Neuron from './Neuron'
import Connection from './Connection'

// generate random voltage values
const getRandomVoltage = (minVoltage, maxVoltage) => {
  return Math.random() * (maxVoltage - minVoltage) + minVoltage
}

const NeuralNetwork = ({ neurons, connections, height, width }) => {
  const [neuronStates, setNeuronStates] = useState(neurons)

  // Randoml neuron voltages
  useEffect(() => {
    const intervalId = setInterval(() => {
      setNeuronStates((prevStates) =>
        prevStates.map((neuron) => ({
          ...neuron,
          voltage: getRandomVoltage(-70, 30),
        })),
      )
    }, 1000)

    return () => clearInterval(intervalId) // Clean up the interval on unmount
  }, [])

  return (
    <svg width={width} height={height}>
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
          minVoltage={-70}
          maxVoltage={30}
          x={neuron.x}
          y={neuron.y}
        />
      ))}
    </svg>
  )
}

export default NeuralNetwork
