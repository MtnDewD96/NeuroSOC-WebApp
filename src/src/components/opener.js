// src/utils/openNeuronPopup.js
import Chart from 'chart.js/auto';

const openNeuronPopup = (neuronIndex, getVoltage) => {
  console.log(`Neuron ${neuronIndex} clicked`);
  const width = 800;
  const height = 800;
  const left = (screen.width / 2) - (width / 2);
  const top = (screen.height / 2) - (height / 2);
  const popup = window.open(
    '',
    '_blank',
    `width=${width},height=${height},left=${left},top=${top}`
  );

  if (!popup || popup.closed || typeof popup.closed === 'undefined') {
    console.warn("Pop-up blocked! Please allow pop-ups for this site.");
    return;
  }

  popup.document.write(`
    <html>
      <head>
        <title>Neuron ${neuronIndex}</title>
        <style>
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            font-family: Arial, sans-serif;
          }
          #container {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            height: 100%;
          }
          #voltage {
            font-size: 2em;
            margin-bottom: 20px;
          }
          #voltageGraph {
            max-width: 80%;
            max-height: 80%;
            width: 100%;
            height: 100%;
          }
        </style>
      </head>
      <body>
        <div id="container">
          <p id="voltage">Neuron membrane voltage: Loading...</p>
          <canvas id="voltageGraph"></canvas>
        </div>
      </body>
    </html>
  `);

  popup.document.close();

  const initializeChart = (dataPoints = 20, updateInterval = 200) => {
    const ctx = popup.document.getElementById('voltageGraph').getContext('2d');
    const voltageData = [];
    const voltageChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array(dataPoints).fill(''), // Adjust based on number of data points
        datasets: [{
          label: `Voltage of Neuron ${neuronIndex}`,
          data: voltageData,
          borderColor: 'blue',
          fill: false,
          borderWidth: 2,
          tension: 0 // Straight line, no curve
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        animation: false,  // Disable animations
        scales: {
          y: { min: 0, max: 1 }
        }
      }
    });

    const intervalId = setInterval(() => {
      const currentVoltage = getVoltage();
      if (currentVoltage !== undefined) {
        popup.document.getElementById('voltage').textContent = `Neuron membrane voltage: ${currentVoltage.toFixed(2)}`;
        
        // Add new data point and keep the array length consistent
        if (voltageData.length >= dataPoints) voltageData.shift();
        voltageData.push(currentVoltage);

        // Update the chart immediately
        voltageChart.update();
      }
    }, updateInterval);

    voltageChart.onDestroy = () => clearInterval(intervalId);

    return voltageChart;
  };

  let voltageChart = null;
  let dataPoints = 20;
  let updateInterval = 200;

  popup.onload = () => {
    voltageChart = initializeChart(dataPoints, updateInterval);

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => voltageChart.resize());
    });
    resizeObserver.observe(popup.document.getElementById('container'));

    popup.matchMedia("(display-mode: fullscreen)").addEventListener('change', (e) => {
      if (e.matches) { 
        // Full-screen mode
        voltageChart.destroy();
        dataPoints = 20;  
        updateInterval = 200;  
        voltageChart = initializeChart(dataPoints, updateInterval);
      } else {
        voltageChart.destroy();
        dataPoints = 20;  
        updateInterval = 200;  
        voltageChart = initializeChart(dataPoints, updateInterval);
      }
    });

    popup.onbeforeunload = () => {
      resizeObserver.disconnect();
      if (voltageChart) voltageChart.destroy();
    };
  };
};

export default openNeuronPopup;
