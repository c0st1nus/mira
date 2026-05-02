module.exports = {
  apps: [
    {
      name: "decentra-hack",
      script: "npm",
      args: "start",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
      max_memory_restart: "512M",
      autorestart: true,
      watch: false,
    },
  ],
};
