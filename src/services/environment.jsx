import { io } from "socket.io-client"

const baseURL = import.meta.env.VITE_APP_URL_SOCKET

/* const SOCKET = io.connect(baseURL, { reconnect: true }); */

const SOCKET = io(baseURL, {
  cors: {
    origin: "*",
    methods: ["POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  },
  serveClient: false,
  path: "/socket.io",
  transports: ["websocket"],
  secure: true
})

/* io = new Server(baseURL, {
  cors: {
    origin: "*",
    methods: ["POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  },
  serveClient: false,
  path: "/socket.io",
  transports: ["websocket"],
  secure: true
}) */

export { SOCKET }
