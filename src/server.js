const Hapi = require('@hapi/hapi');
const Routes = require('./routes.js');

// Inisiasi server hapi
const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: '0.0.0.0', // karena belajar docker ubah dulu ke 0.0.0.0 semula nya localhost
  });

  // Route
  server.route(Routes);
  await server.start();

  console.log('Server running on %s', server.info.uri);
};

// error handling jika server error
process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
