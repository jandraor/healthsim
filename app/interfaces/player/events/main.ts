import * as clicks from "./clicks/main.ts"

export const add = socket => {
  clicks.add(socket);
}
