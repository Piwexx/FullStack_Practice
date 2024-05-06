const express = require('express');
const app = express();
require('dotenv').config();

const { db } = require("./src/db/db");
const  userExtractor = require('./src/middleware/userExtractor')

//Extra security packages
const cors = require('cors');
// extra security packages
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

//Routes
const notesRoutes = require('./src/routes/notesRoutes');
const usersRoutes = require('./src/routes/usersRoutes');
const loginRoutes = require("./src/routes/loginRoutes")
const registerRoutes = require('./src/routes/registerRoutes')

//error handler
const errorHandlerMiddleware = require('./src/middleware/error-handler');
const notFound = require('./src/middleware/not-found')
const configureSentry = require("./src/config/sentry");


const PORT = process.env.PORT || 3000;
const Sentry = configureSentry(app);

app.use('/images', express.static('public/images'));
app.use(express.static('../app/dist'));
app.use(express.json());
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// Routes
app.use('/api/v1/notes',userExtractor,notesRoutes);
app.use('/api/v1/user', userExtractor,usersRoutes);
app.use('/api/v1/login', loginRoutes);
app.use('/api/v1/register', registerRoutes);

// Centralized error handling
app.use(errorHandlerMiddleware);
// Custom 404 handler
app.use(notFound)

async function startServer() {
  try {
    // Connect to the database
    await db.connectDB();
    // Start the server
    const server = app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
    // Export both app and server
    module.exports = { app, server };
  } catch (error) {
    console.error('Error starting the server:', error.message);
    process.exit(1);
  }
}

// Start the server
startServer();