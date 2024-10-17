import { io } from "socket.io-client";

export const Socket = io("https://app.welo.health:8000")