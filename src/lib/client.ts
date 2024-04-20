const MODULE_NAME = "cardiology";
const URI = "ws://localhost:3000/";

export const connect = () => {
  const ws = new WebSocket(URI);

  ws.addEventListener("error", console.error);

  ws.addEventListener("open", () => {
    ws.send(
      JSON.stringify({
        command: "connect",
        module: MODULE_NAME
      })
    );
  });

  ws.addEventListener("message", data => {
    console.log("received: %s", data);
  });

  window.onbeforeunload = () => {
    // Disconnect
  };

  return ws;
};
