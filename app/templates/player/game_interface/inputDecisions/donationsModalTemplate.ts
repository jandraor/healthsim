import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div class = "modal fade" id = "mdl{{params.prefix}}Don" tabindex="-1" role="dialog"
    aria-labelledby = "mdl{{params.prefix}}DonLabel" aria-hidden = "true">
    <div class = "modal-dialog" role = "document">
      <div class = "modal-content">
        <div class = "modal-header">
          <h5 class = "modal-title">{{params.title}} donations</h5>
          <button type = "button" class = "close" data-dismiss = "modal" aria-label = "Close">
            <span aria-hidden = "true">&times;</span>
          </button>
        </div>
        <div class="modal-body" id = 'mdl{{params.prefix}}DonBody'>
          <p class = "my-1 text-secondary">{{params.resource}}:
            <label id = "lRemaining{{params.prefix}}">{{params.availableResources}}</label>
            <label class = "invisible" id = "lblInv{{params.prefix}}">{{params.availableResources}}</label>
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
`);
