const express = require('express')
const compression = require('compression')
const router = require('./src/router');

const app = express();
const port = process.env.PORT || 3000;

app.use(compression());

app.use((err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  
  return;
});

app.use('/', router);


const server = app.listen(port, () => console.log(`Example app listening on port ${port}`));

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

function shutDown() {
  console.log('Received kill signal, shutting down gracefully');
  server.close(() => {
    console.log('Exiting');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
}
