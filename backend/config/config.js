import mongoose from "mongoose";

const conectarDB = async() => {
    try {
        const connectionDB = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser : true,
            useUnifiedTopology : true
        });
        const url = `CONECTADO A MONGODB SERVER, HOST: ${connectionDB.connection.host}, PORT : ${connectionDB.connection.port}`;
        console.log(url);
    } catch (error) {
        console.log(error);
        process.exit(1);
    };
    
}
export default conectarDB;