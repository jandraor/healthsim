import * as Handlebars from '../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div id = 'toBeChanged' class = "mt-3">
  <h1> Players' game interface </h1>
  </div>
  <div id ="divPlayerChat" class = "border p">
    <div id = "divChatBoard" class = "border py-4">
      <h1>Chat body</h1>
    </div>
    <div id = "divTypeMessage" class = "border py-5 my-2">
      <div class="input-group">
        <input type="text" class="form-control" id = "iptMessage"
          placeholder="Type your message here..."
          aria-label="Type your message here..."
          aria-describedby = "button-addon2">
        <div class="input-group-append">
          <button class="btn btn-outline-primary" type="button"
            id="bSendMessage">Send</button>
        </div>
      </div>
    </div>
  </div>
`);
