import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <p class = "text-secondary">
    Team:
    <span class = "text-dark" id = "lTeamId">{{paramsTeam.name}}</span>
    <span class = "ml-5">
      Population:
      <span class = "text-dark" id = "lPopulation">{{paramsTeam.population}}</span>
    </span>
    <span class = "ml-5">
      Income level:
      <span class = "text-dark" id = "lIncome">{{paramsTeam.incomeLevel}}</span>
    </span>
  </p>
`);
