const express = require('express');
const server = express();
const helmet = require("helmet");

const projectsRouter = require('./projects/projects-router');   
const actionsRouter = require('./actions/actions-router');

server.use(helmet());
server.use(express.json());

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

//sanity check
server.get('/', (req, res) => {
    res.status(200).json(`<h2>Let's write some middleware!</h2>`);
  });

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
    });
});

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
