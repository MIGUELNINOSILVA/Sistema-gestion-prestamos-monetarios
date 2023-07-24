import express from "express";
import cors from "cors";
import clienteRoute from "../routes/cliente.routes.js";

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        /* Paths */
        this.clientePath = "/api/clientes"; 
        /* Middlewares */
        this.middlewares();
        /* Routing */
        this.routes();
    }

    middlewares() {
        /* Public direction */
        this.app.use(express.static('public'));
        /* Cors */
        this.app.use(cors());
        /* Express Json */
        this.app.use(express.json());
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Server Runing on port ${this.port}`);
        });
    }

    routes(){
        this.app.use(this.clientePath, clienteRoute);
    }
}

export default Server;