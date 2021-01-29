module.exports = {
  apps: [
    {
      name: "rule-validation-api",
      script: "src/server.js",
      instances: 1,
      autorestart: true,
      exec_mode: "cluster",
      watch: false,
      max_memory_restart: "1G",
      env_development: {
        NODE_ENV: "development",
        port: 4002,
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],

  deploy: {
    production: {
      user: "SSH_USERNAME",
      host: "SSH_HOSTMACHINE",
      ref: "origin/master",
      repo: "GIT_REPOSITORY",
      path: "DESTINATION_PATH",
      "pre-deploy-local": "",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
    },
  },
};
