type Command = {
  command: string;
  module: string;
  [key: string]: any;
};

const COMMANDS = {
  ACCEPT_CONNECTION: "accept_connection",
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  SERVER_ERROR: "server_error",
};
const MODULE_NAME = "cardiology";
const URI = "ws://localhost:3000/";

let playerId: string;

const makeCommand = (commandName: string, params?: any): string => {
  const command: Command = {
    command: commandName,
    module: MODULE_NAME
  };
  if (params) {
    return JSON.stringify({
      ...command,
      ...params
    });
  }
  return JSON.stringify(command);
};

const verifyArguments = (obj: any, property: string): void => {
  if (obj[property] === undefined) {
    throw new Error(`Required argument ${property} is undefined`);
  }
};

const handleCommand = (command: Command): void => {
  const commandName = command.command;
  switch (commandName) {
    case COMMANDS.ACCEPT_CONNECTION:
      console.log(command);
      verifyArguments(command, "playerId");
      playerId = command.playerId;
      break;
    default:
      console.error(`Command ${commandName} not recognized`);
      break;
  }
};

export const connect = () => {
  const ws = new WebSocket(URI);

  ws.addEventListener("error", console.error);

  ws.addEventListener("open", () => {
    ws.send(makeCommand(COMMANDS.CONNECT));
  });

  ws.addEventListener("message", message => {
    if (!message.data) {
      console.error("Message received with no data");
      return;
    }

    const parsedMessage = JSON.parse(message.data);
    if (!parsedMessage.command || !parsedMessage.module) {
      console.error("Message received with missing command or module args");
      return;
    }

    handleCommand(parsedMessage);
  });

  window.onbeforeunload = () => {
    ws.send(makeCommand(COMMANDS.DISCONNECT, { playerId }));
  };

  return ws;
};
