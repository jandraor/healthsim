import * as buttons from "./buttons/main.ts";
import * as sliders from "./sliders.ts";

export const build = (socket) => {
  buttons.clickEvents(socket);
  sliders.build();
}
