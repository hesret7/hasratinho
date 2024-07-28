module.exports = {
  apps: [
    {
      name: "backend",
      script: "./server.js",
      cwd: "/root/hasratinho/backend",
    },
    {
      cwd: "/root/hasratinho/frontend",
      name: "frontend",
      script: "./node_modules/next/dist/bin/next",
      args: "start -p 80",
    },
  ],
};
