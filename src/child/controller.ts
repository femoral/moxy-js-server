import { ChildProcess, fork } from "child_process";

const moduleExtension = process.env.NODE_ENV === "production" ? "js" : "ts";
let child: ChildProcess | undefined;

export function start() {
  return new Promise<void>((resolve) => {
    child = fork(`${__dirname}/app.${moduleExtension}`);
    child.once("message", (message) => {
      console.log(message);
      resolve();
    });
  });
}

export async function restart() {
  await stop();
  await start();
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
