module.exports = {
  extends: [
    "eslint:recommended", // ESLint が提供する 推奨ルールセット
    "prettier", // Prettier と競合する ESLint ルールを無効化
  ],
  
  ignorePatterns: [
    "ex01/format_sample.js" // lint対象から除外
  ]

};
