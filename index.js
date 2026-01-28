const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { sequelize } = require("./models/database");
const autor = require("./routes/autor");
const genero = require("./routes/genero");
const libro = require("./routes/libro");
const auth = require('./routes/auth')

app.use(express.json());

app.use('/autor', autor);
app.use('/genero', genero);
app.use('/libro',libro);
app.use('/auth', auth)

const start = async () => {
    try {
        await sequelize.authenticate();
        console.log("Base de datos conectada");
        app.listen(PORT, ()=>{
            console.log("Escuchando desde el puerto "+ PORT);
        });
    } catch (error) {
        console.log("No se pudo conectar a la base de datos, Error: "+error);
    }
}

start();