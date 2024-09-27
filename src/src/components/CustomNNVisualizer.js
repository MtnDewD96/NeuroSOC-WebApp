import NeuralNetwork from './NeuralNetwork'

export default function CustomNNVisualizer(props) {
  let windowWidth = props.width
  let windowHeight = props.height
  const neurons = [
    { x: 100, y: 100, voltage: -70 },
    { x: 100, y: 250, voltage: -50 },
    { x: 100, y: 400, voltage: 20 },
    { x: 300, y: 100, voltage: -40 },
    { x: 300, y: 250, voltage: 10 },
    { x: 300, y: 400, voltage: 30 },
  ]

  // Example connections
  const connections = [
    { from: 0, to: 3, thickness: 1 },
    { from: 1, to: 4, thickness: 2 },
    { from: 2, to: 5, thickness: 3 },
    { from: 0, to: 4, thickness: 1.5 },
    { from: 1, to: 3, thickness: 2.5 },
    { from: 2, to: 4, thickness: 2 },
  ]
  return (
    <>
      <NeuralNetwork neurons={neurons} connections={connections} />
    </>
  )
}
