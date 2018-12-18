import * as Handlebars from '../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div class = "mt-5 ml-5" id = "divHeatMap">
    <select>
      <option value = "infected">Infected</option>
      <option value = "susceptible">Susceptible</option>
      <option value = "recovered">Recovered</option>
    </select>
  </div>
`);
