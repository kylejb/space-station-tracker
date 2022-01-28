module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            boxShadow: {
                input: 'inset 0px 0px 3px 2px #4287f5',
            },
            keyframes: {
                'custom-pulse': {
                    '0%': {
                        opacity: '.9',
                    },
                    '50%': {
                        opacity: '.2',
                    },
                    '100%': {
                        opacity: '.9',
                    },
                },
                'fade-in': {
                    from: {
                        opacity: '0',
                    },
                    to: {
                        opacity: '100',
                    },
                },
                'fade-out': {
                    from: {
                        opacity: '100',
                    },
                    to: {
                        opacity: '0',
                    },
                },
            },
            animation: {
                'fade-in': 'fade-in 1.5s linear forwards',
                'fade-out': 'fade-out 2s linear forwards',
                'custom-pulse': 'custom-pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            fontFamily: {
                basier: ['"Basier Circular"', 'sans-serif'],
                garet: ['"Garet Heavy"', 'sans-serif'],
            },
        },
    },
    plugins: [],
    //   corePlugins: {    preflight: true  }
};
