import * as startGameButton from './startGame.ts';
import * as randomButton from './randomSpecification.ts';
import * as equalButton from './equalSpecification.ts';

export const clickEvents = socket => {
  startGameButton.onClick(socket);
  randomButton.onClick();
  equalButton.onClick();
}
