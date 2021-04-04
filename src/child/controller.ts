import { ChildProcess, fork } from "child_process";

const moduleExtension = require.extensions[".ts"] ? "ts" : "js";
let child: ChildProcess | undefined;
let restartTimeout: NodeJS.Timeout;

type ChildControllerConfig = {
  childPort: string;
  debounceTime: number;
  configPath: string;
};

export type ChildController = {
  restart: () => void;
  start: () => Promise<void>;
};

const makeChildController = ({
  childPort,
  debounceTime = 5000,
  configPath,
}: ChildControllerConfig): ChildController => {
  const start = () => {
    return new Promise<void>((resolve) => {
      child = fork(`${__dirname}/app.${moduleExtension}`, [
        childPort,
        configPath,
      ]);
      child.once("message", (message) => {
        console.log(message);
        resolve();
      });
    });
  };

  const restart = () => {
    clearTimeout(restartTimeout);
    restartTimeout = setTimeout(async () => {
      await stop();
      await start();
    }, debounceTime);
  };

  const stop = () => {
    return new Promise<void>((resolve) => {
      child?.once("exit", () => {
        child = undefined;
        resolve();
      });
      child?.kill();
    });
  };

  return {
    start,
    restart,
  };
};

export default makeChildController;
