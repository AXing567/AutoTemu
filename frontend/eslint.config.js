const nextEslintPlugin = require("@next/eslint-plugin-next");

module.exports = [
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@next/next": nextEslintPlugin,
    },
    rules: {
      ...nextEslintPlugin.configs.recommended.rules,
      ...nextEslintPlugin.configs["core-web-vitals"].rules,
    },
  },
];
