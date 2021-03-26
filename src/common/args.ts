import yargs from "yargs";

const args = yargs(process.argv.slice(2)).argv;

export const port: string = (args.port as string) || "3500";
export const childPort: string = (args.childPort as string) || "3501";
