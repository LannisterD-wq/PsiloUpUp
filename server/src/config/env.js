const path = require('path');

function env(name, defaultValue) {
  const value = process.env[name];
  if (value === undefined || value === null || value === '') {
    return defaultValue;
  }
  return value;
}

const NODE_ENV = env('NODE_ENV', 'development');
const isProduction = NODE_ENV === 'production';

const config = {
  env: NODE_ENV,
  isProduction,
  port: Number(env('PORT', 3000)),
  jwtSecret: env('JWT_SECRET', 'dev-secret'),
  database: {
    url: env('DATABASE_URL', ''),
    dialect: env('DB_DIALECT', 'sqlite'),
    storage: env('DB_STORAGE', path.join(__dirname, '../../data.sqlite')),
    logging: env('DB_LOGGING', 'false') === 'true',
  },
  shipping: {
    originCep: env('ORIGIN_CEP', '03401030'),
    defaultPackage: {
      height: Number(env('DEFAULT_PACKAGE_HEIGHT_CM', 8)),
      width: Number(env('DEFAULT_PACKAGE_WIDTH_CM', 16)),
      length: Number(env('DEFAULT_PACKAGE_LENGTH_CM', 24)),
      weight: Number(env('DEFAULT_PACKAGE_WEIGHT_KG', 0.3)),
    },
    freeShippingThresholdCents: Number(env('FREE_SHIPPING_THRESHOLD_CENTS', 39900)),
    flatShippingCents: Number(env('SHIP_BASE_CENTS', 1990)),
    melhorEnvioToken: env('MELHORENVIO_TOKEN', ''),
    superFrete: {
      token: env('SUPERFRETE_TOKEN', ''),
      baseUrl: env('SUPERFRETE_BASE_URL', 'https://sandbox.superfrete.com'),
      userAgent: env('SUPERFRETE_USER_AGENT', 'PsiloUp (dev@psiloup.local)'),
      services: env('SUPERFRETE_SERVICES', '1,2'),
    },
  },
  mercadoPago: {
    accessToken: env('MP_ACCESS_TOKEN', ''),
    backUrls: {
      success: env('BACK_URL_SUCCESS', 'http://localhost:8080/'),
      failure: env('BACK_URL_FAILURE', 'http://localhost:8080/'),
      pending: env('BACK_URL_PENDING', 'http://localhost:8080/'),
    },
  },
};

module.exports = config;



