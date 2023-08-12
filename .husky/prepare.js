const isCI = Boolean(process.env.CI);
const isProd = process.env.NODE_ENV === 'production';

if (!isCI && !isProd) require('husky').install();
