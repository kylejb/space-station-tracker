import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

cssnano({
    preset: [
        'default',
        {
            discardComments: {
                removeAll: true,
            },
        },
    ],
});

const config = {
    plugins: {
        '@tailwindcss/postcss': {},
        ...(process.env.NODE_ENV === 'production' ? { cssnano } : {}),
        ...(process.env.NODE_ENV === 'production' ? { autoprefixer } : {}),
    },
};

export default config;
