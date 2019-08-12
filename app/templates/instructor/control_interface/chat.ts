import * as Handlebars from '../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div id = "divChatBoard" class = "border chatBody"></div>
  <div id = "divTypeMessage" class = "border">
    <div class="input-group">
      <input type="text" class="form-control" id = "iptMessage" maxlength="500"
        placeholder="Type your message here..."
        aria-label="Type your message here..."
        aria-describedby = "button-addon2">
      <div class="input-group-append">
        <button class="btn btn-outline-primary" type="button"
          id="bSendMessage">Send</button>
      </div>
    </div>
  </div>
`);
