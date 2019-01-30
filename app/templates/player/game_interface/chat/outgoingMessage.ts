import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div class="outgoing_msg">
    <div class="sent_msg">
      <p>{{messageText}}</p>
      <span class = "time_date"> {{time}} | {{month}} {{day}}</span>
     </div>
  </div>
`);
