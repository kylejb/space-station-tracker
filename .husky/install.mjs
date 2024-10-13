const isCI = Boolean(process.env.CI);
const isProd = process.env.NODE_ENV === 'production';

if (!isCI && !isProd) (await import('husky')).default;
