import makeChildController from "./child/controller";
import makeMoxyApiRouter from "./controller";
import makeRestartMiddleware from "./controller/middleware/restart.middleware";

const makeMoxyApi = ({
  childPort,
  configPath,
  debounceTime,
}: {
  childPort: string;
  configPath: string;
  debounceTime: number;
}) => {
  const childController = makeChildController({
    childPort,
    debounceTime,
    configPath,
  });

  const moxyApiRouter = makeMoxyApiRouter({
    childPort,
    restartMiddleware: makeRestartMiddleware(childController),
    configPath,
  });

  return {
    childController,
    moxyApiRouter,
  };
};
export default makeMoxyApi;
