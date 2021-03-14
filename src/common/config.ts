import { homedir } from "os";
import { mkdir } from "shelljs";

export const CONFIG_DIRECTORY = homedir() + "/.moxy";
export const COLLECTIONS_PATH = CONFIG_DIRECTORY + "/collections";

export function init() {
  mkdir("-p", COLLECTIONS_PATH);
}
