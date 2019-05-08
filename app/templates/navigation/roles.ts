import * as Handlebars from '../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
  <!-- Modal instructor -->
  <div class="modal fade" id="instructorModal" tabindex="-1" role="dialog" aria-labelledby="instructorModalLabel" aria-hidden="true">
    <div class="modal-dialog" role = "document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Game setup</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="iptGameName">Game name *
                <span class="errorText invisible">This field is required</span>
              </label>
              <input type="text" class="form-control" id="iptGameName"
              placeholder = "Please type the name of the game" required>
              <div class = "invalid-feedback">
                Please provide a name for the game
              </div>
            </div>
            <div class="form-group">
              <label for="inputNTeams">Number of teams *</label>
              <select id="inputNTeams" class="form-control">
                <option value = "2" selected>2</option>
                <option value = "3">3</option>
                <option value = "4">4</option>
                <option value = "5">5</option>
                <option value = "6">6</option>
                <option value = "7">7</option>
                <option value = "8">8</option>
                <option value = "9">9</option>
                <option value = "10">10</option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" id = "bConfirmCG">Confirm</button>
        </div>
      </div>
    </div>
  </div> <!-- Closes instructor modal-->
  <!-- Modal player -->
  <div class = "modal fade" id = "playerModal" tabindex="-1" role = "dialog" aria-labelledby="playerModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role = "document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Games</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" id = "divListGames"></div>
        <div class="modal-footer">
        <button type = "button" class = "btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
      </div>
    </div>
  </div> <!-- Close player modal-->
  <div id = "divRoles" class = "mt-3">
    <p class = "my-1"> ROLES</p>
    <hr class = "my-1" />
    <div class = "container py-5 text-muted">
      <!-- role cards -->
      <div class = "row">
        {{#if is_Instructor}}
        <div class = "col-5">
          <div class = 'card'>
            <div class="card-header">
              <span class = 'text-dark'>Instructor</span>
            </div>
            <div class = 'card-body'>
              <p>
                Description of what a instructor is & can do
              </p>
              <button class = "btn btn-primary" id = 'bCreateGame'
                data-toggle = "modal" data-target = "#instructorModal">
                Create game
              </button>
            </div>
          </div>
        </div>
        {{/if}}
        <div class = "col-5">
          <div class = 'card'>
            <div class="card-header">
              <span class = 'text-dark'>Player</span>
            </div>
            <div class = 'card-body'>
              <p>
                Description of what a player is & can do
              </p>
              <button type = "button" class = "btn btn-primary" id = 'bJoinGame'
                 data-toggle="modal" data-target = "#playerModal">
                 Join Game
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`);
