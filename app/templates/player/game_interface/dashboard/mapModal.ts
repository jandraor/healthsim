import * as Handlebars from '../../../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <div class = "modal fade" id = "mdlMap" tabindex="-1" role="dialog"
    aria-labelledby = "mdlMap" aria-hidden = "true">
    <div class = "modal-dialog modal-lg" role = "document">
      <div class = "modal-content">
        <div class = "modal-header">
          <h5 class = "modal-title">Map</h5>
          <button type = "button" class = "close" data-dismiss = "modal" aria-label = "Close">
            <span aria-hidden = "true">&times;</span>
          </button>
        </div>
        <div class="modal-body sea" id = 'mdlMapBody'>
          <div class = 'mx-auto' id = "divSvgMap">
            <svg id = "svgMap" height = 500 width = 320></svg>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
`);
