import * as Handlebars from '../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div class="modal fade" id="mdlVacDon" tabindex="-1" role="dialog" aria-labelledby="mdlVacDonLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Vaccine donations</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" id = 'mdlVacDonBody'>
          <p class = "my-1 text-secondary">Vaccines:
            <label id = "lRemainingVac">0</label> <!-- This should be parameterised -->
            <label class = "invisible" id = "lblInvVac"> 10000</label> <!-- This should be parameterised -->
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Confirm</button>
        </div>
      </div>
    </div>
  </div>
`);
