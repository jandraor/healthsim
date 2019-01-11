import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div class="modal fade" id="mdlFinDon" tabindex="-1" role="dialog" aria-labelledby="mdlFinDonLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Financial donations</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" id = 'mdlFinDonBody'>
          <p class = "my-1 text-secondary">Financial resources: $
            <label class = "lUnallocatedFin" id = "lRemainingFin">{{finResources}}</label>
            <label class = "invisible" id = "lblInvFin2">{{finResources}}</label>
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
`);
