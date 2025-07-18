import { io, Socket } from "socket.io-client";

const SOCKET_URL: string = import.meta.env.VITE_PUBLIC_API_URL;


const socket: Socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: false,
});

export default socket;
