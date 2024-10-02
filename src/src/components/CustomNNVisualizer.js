import NeuralNetwork from './NeuralNetwork'

export default function CustomNNVisualizer(props) {
  let windowWidth = props.width
  let windowHeight = props.height
  let layers = props.layers.layers

  let neurons = []
  let connections = []
  let x_offset = 100
  let y_offset = 100
  let x_step = (windowWidth - 200) / layers.length

  layers.forEach((layer) => {
    let layer_step = (windowHeight - 100) / layer.unit
    y_offset = windowHeight / layer.unit / 2
    for (let i = 0; i < layer.unit; i++) {
      neurons.push({ x: x_offset, y: y_offset + i * layer_step, voltage: -70 })
    }
    x_offset += x_step
  })

  let status = 0
  let connections_made = 0
  for (let i = 0; i < layers.length; i++) {
    connections_made += layers[i].unit
    console.log(i)
    if (layers[i + 1] != null) {
      for (let j = 0; j < layers[i].unit; j++) {
        console.log('---', j)
        for (let k = 0; k < layers[i + 1].unit; k++) {
          console.log('------', status + j, connections_made + k)
          connections.push({ from: status + j, to: connections_made + k, thickness: 1 })
        }
      }
    } else {
      break
    }
    status += layers[i].unit
  }

  return (
    <>
      <NeuralNetwork
        neurons={neurons}
        connections={connections}
        width={windowWidth}
        height={windowHeight}
      />
    </>
  )
}
