import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

//https://ptetutorials.com/images/user-profile.png
export const html = Handlebars.compile(`
  <div class="incoming_msg ml-2 mt-1">
    <div class="incoming_msg_img"> <img src= {{teamLogo}}> </div>
    <div class="received_msg">
      <div class="received_withd_msg">
        <p>
          {{messageText}}
        </p>
        <span class="time_date"> {{time}} | {{month}} {{day}}</span>
      </div>
    </div>
  </div>
`);
