import asyncio
import websockets
import struct
import random

async def send_voltage_data(websocket, path):
    try:
        while True:

            voltages = [random.uniform(0, 1) for _ in range(8)]  # test, random
            message = struct.pack(f'{len(voltages)}f', *voltages)

            await websocket.send(message)
            print(f"Sent data: {voltages}")

            # Ajuster le temps entre chaque envoie
            await asyncio.sleep(0.2)

    except websockets.exceptions.ConnectionClosed:
        print("Client disconnected. Waiting for a new connection...")

async def main():
    # Start a persistent WebSocket server that keeps running
    server = await websockets.serve(send_voltage_data, "0.0.0.0", 5000)
    print("WebSocket server started on ws://0.0.0.0:5000")
    await server.wait_closed()

# Run the server
asyncio.run(main())
