const { start } = require('./src/app');

start().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Erro ao iniciar servidor', error);
  process.exit(1);
});