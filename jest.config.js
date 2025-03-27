export default {
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
    },
    moduleNameMapper: {
      "\\.(css|scss|less)$": "identity-obj-proxy"
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    testMatch: ["<rootDir>/src/**/*.test.{js,jsx,ts,tsx}"]
  };
  