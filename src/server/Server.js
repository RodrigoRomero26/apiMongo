import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { User } from '../Schemas/User.js';

dotenv.config();

const userDB = process.env.MONGO_USER;
const passwordDB = process.env.MONGO_PASS;
const port = process.env.PORT;

export const createServer = () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    mongoose.connect(`mongodb://${userDB}:${passwordDB}@localhost:27017/app?authSource=admin`, )
    .then("Conectado correctamente")
    .catch("Error al conectar");

    app.get("/user", async (req, res) => {
        const data = await User.find();
        res.send(data);
    }
    );

    app.post("/addUser", async (req, res) => {
        try{
            const { name, age, email } = req.body;
            const user = new User({ name, age, email });

            await user.save().then("Usuario guardado en la base de datos").catch((err) => {
                console.error("Error al guardar el usuario:", err);
                });

            res.send(user);
        } catch (error) {
            console.error("Error al guardar el usuario:", error);
            res.status(500).send("Error al guardar el usuario");
        }})


    app.listen(port, () =>{
        console.log(`Servidor escuchando en el puerto ${port}`);
    })
}