import dotenv from "dotenv";
import conectarDB from "./config/config.js";
import Server from "./models/server.js";

dotenv.config();

const server = new Server();

conectarDB();
server.listen();