/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                greenTran: {
                    950: 'rgba(105, 165, 104, .50)',
                },
            },
        },
    },
    plugins: [],
}
