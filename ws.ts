export default function ws(websocket: WebSocket) {
  websocket.onopen = () => console.log("socket opened");
  websocket.onerror = () => clearInterval(interval);
  websocket.onclose = () => clearInterval(interval);

  const interval = setInterval(function () {
    websocket.send(new Date().toString());
  }, 1000);
}
