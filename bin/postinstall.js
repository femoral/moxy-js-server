if (process.env.MOXY_GITHUB_INSTALL) {
  require("child_process").exec("npm run build", {
    cwd: require("path").join(__dirname, ".."),
  });
}
