import * as startGameButton from './startGame.ts';
import * as randomButton from './randomSpecification.ts';

export const clickEvents = socket => {
  startGameButton.onClick(socket);
  randomButton.onClick();
}
