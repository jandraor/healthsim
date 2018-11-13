import * as Handlebars from '../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div class = "col-4 mt-3">
    <div class = "card" id = 'card{{teamName}}'>
      <div class = "card-header">
        {{teamName}}
      </div>
      <div class = "card-body">
        <p class = "text-secondary">Players:</p>
        <ul class = 'playerList'></ul>
      </div>
      <div class = "card-footer">
        Initial parameters
      </div>
    </div>
  </div>
`);
