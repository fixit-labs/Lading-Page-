/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./contexts/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'azure-blue': '#0A62F8',
                'midnight-navy': '#0B2848',
                'soft-gray': '#E7E7E7',
            },
            fontFamily: {
                sans: ['Noto Sans', 'sans-serif'],
            },
            borderRadius: {
                '2xl': '1rem',
            },
        },
    },
    plugins: [],
}
