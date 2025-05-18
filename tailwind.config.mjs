/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,jsx,ts,tsx}",     // אם הפרויקט שלך בתוך src
    "./components/**/*.{js,jsx,ts,tsx}", // אם יש תיקיית components
    "./pages/**/*.{js,jsx,ts,tsx}",    // אם זה פרויקט Next.js
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
