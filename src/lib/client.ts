import { gameId } from "./game";
import { playerId, playerName, setPlayerId } from "./player";

type Command = {
  command: string;
  module: string;
  [key: string]: any;
};

export const COMMANDS = {
  ACCEPT_CONNECTION: "accept_connection",
  CHANGE_NAME: "change_name",
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  JOIN_GAME: "join_game",
  LEAVE_GAME: "leave_game",
  PING: "ping",
  PONG: "pong",
  SERVER_ERROR: "server_error",
};
const MODULE_NAME = "cardiology";
const URI = "ws://localhost:3000/";

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

const verifyArguments = (obj: any, properties: string[]): void => {
  properties.forEach(property => {
    if (obj[property] === undefined) {
      throw new Error(`Required argument ${property} is undefined`);
    }
  });
};

const handleCommand = (command: Command, socket: WebSocket): void => {
  const commandName = command.command;
  switch (commandName) {
    case COMMANDS.ACCEPT_CONNECTION:
      console.log(command);
      verifyArguments(command, ["gameId", "playerId", "playerName"]);
      gameId.set(command.gameId);
      setPlayerId(command.playerId);
      playerName.set(command.playerName);
      break;
    case COMMANDS.PING:
      socket.send(makeCommand(COMMANDS.PONG, { playerId }));
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

    handleCommand(parsedMessage, ws);
  });

  window.onbeforeunload = () => {
    ws.send(makeCommand(COMMANDS.DISCONNECT, { playerId }));
  };

  return ws;
};
