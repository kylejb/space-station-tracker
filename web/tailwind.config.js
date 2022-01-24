module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            boxShadow: {
                input: 'inset 0px 0px 3px 2px #4287f5',
            },
            keyframes: {
                'fade-in': {
                    from: {
                        opacity: '0',
                    },
                    to: {
                        opacity: '100',
                    },
                },
            },
            animation: {
                'fade-in': 'fade-in 0.6s linear forwards',
            },
            fontFamily: {
                basier: ['"Basier Circular"', 'sans-serif'],
                garet: ['"Garet Heavy"', 'sans-serif'],
            },
            letterSpacing: {
                search: '.20em',
            },
        },
    },
    plugins: [],
    //   corePlugins: {    preflight: true  }
};
