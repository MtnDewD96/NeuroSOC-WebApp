import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const NeuronView = ({ neuronIndex, voltage }) => {
  const [voltageHistory, setVoltageHistory] = useState([0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setVoltageHistory((prev) => {
        const updated = [...prev.slice(1), voltage];
        return updated;
      });
    }, 200);

    return () => clearInterval(intervalId);
  }, [voltage]);

  const data = {
    labels: ["-1s", "-0.8s", "-0.6s", "-0.4s", "-0.2s", "Now"],
    datasets: [
      {
        label: `Voltage of Neuron ${neuronIndex}`,
        data: voltageHistory,
        fill: false,
        borderColor: 'blue',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 1
      }
    }
  };

  return (
    <div className="popup">
      <h3>Neuron {neuronIndex}</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default NeuronView;
