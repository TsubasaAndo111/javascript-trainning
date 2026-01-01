// jest.config.cjs
module.exports = {
  testEnvironment: "node",
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)",
    "**/*.test.cjs", // ← これを追加
  ],
};
