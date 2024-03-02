import express from "express";
import compression from "compression";

const app = express();
const port = 3000
const json = {
  fruit: 'Apple',
  size: 'Large',
  color: 'Red'
}

app.use(compression());

app.get('/', (_req, res) => {
  res.json(json)
})

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
