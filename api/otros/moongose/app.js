const express = require('express');
require('dotenv').config();
const db = require("./src/db/db")
const cors = require('cors')
const notesRoutes = require('./src/routes/notesRoutes');
const errorHandler = require('./src/middleware/errorHandler');
const configureSentry = require("./src/config/sentry");

const app = express();
const PORT = process.env.PORT || 3000;
const Sentry = configureSentry(app)

app.use(express.json());
app.use('/images', express.static('public/images'));
app.use(cors())


// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

//Routes
app.use('/notes', notesRoutes);

// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

//errorHandler
app.use(errorHandler)

//Peticion no existe
app.use((req, res) => {
  res.status(404).end()
})


// Conexión a la base de datos al iniciar la aplicación
async function iniciarAplicacion() {
  try {
    await db.connectDB();    
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    process.exit(1); 
  }
}

iniciarAplicacion()