const NODE_ENV = process.env.NODE_ENV;

const env = {
  isDev: NODE_ENV === 'dev' || NODE_ENV === 'development' || !NODE_ENV,
  isProd: NODE_ENV === 'prod' || NODE_ENV === 'production',
};

export { NODE_ENV, env };
