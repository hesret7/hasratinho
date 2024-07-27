module.exports = {
  apps: [
    {
      name: "backend",
      script: "./server.js",
      cwd: "C:\\Users\\Fuad\\Desktop\\hesret\\backend",
    },
    {
      cwd: "C:\\Users\\Fuad\\Desktop\\hesret\\frontend",
      name: "frontend",
      script: "./frontend/node_modules/next/dist/bin/next",
      args: "start",
    },
  ],
};
