import express from 'express'
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
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
