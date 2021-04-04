const makeChangeMiddleware = <T extends (arg: any) => Promise<any>>({
  changeFunction,
  messagePrefix,
  onChange,
}: {
  changeFunction: T;
  messagePrefix: string;
  onChange: Function;
}): T => {
  const getMessage = (argument: any) => {
    return `${messagePrefix} ${argument.id || argument}`;
  };

  return <T>(async (arg: any) => {
    return changeFunction(arg).then((result) => {
      onChange(getMessage(arg));
      return result;
    });
  });
};

export default makeChangeMiddleware;