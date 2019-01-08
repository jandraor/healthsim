import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div class="modal fade" id="mdlAntDon" tabindex="-1" role="dialog" aria-labelledby="mdlAntDonLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Antiviral donations</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" id = 'mdlAntDonBody'>
          <p class = "my-1 text-secondary">Antivirals:
            <label id = "lRemainingAnt">{{antiviralsAvailable}}</label>
            <label class = "invisible" id = "lblInvAnt">{{antiviralsAvailable}}</label>
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
`);
