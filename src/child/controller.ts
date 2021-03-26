import { ChildProcess, fork } from "child_process";

const moduleExtension = process.env.NODE_ENV === "production" ? "js" : "ts";
let child: ChildProcess | undefined;
const debounceTime = 5000;
let restartTimeout: NodeJS.Timeout;

export function start() {
  return new Promise<void>((resolve) => {
    child = fork(`${__dirname}/app.${moduleExtension}`, process.argv.slice(2));
    child.once("message", (message) => {
      console.log(message);
      resolve();
    });
  });
}

export function restart() {
  clearTimeout(restartTimeout);
  restartTimeout = setTimeout(async () => {
    await stop();
    await start();
  }, debounceTime);
}

function stop() {
  return new Promise<void>((resolve) => {
    child?.once("exit", () => {
      child = undefined;
      resolve();
    });
    child?.kill();
  });
}
