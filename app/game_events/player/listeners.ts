const $ = require('jquery');
import * as d3 from 'd3';
import * as templates from '../../templates/main.ts'
import * as interfaces from '../../interfaces/interfaces.ts';

export const listAvailableGames = (socket) => {
  socket.on('available games sent', (gamesObject) => {
    console.log(gamesObject);
    if(gamesObject.n_Games === 0){
      d3.select('#divListGames')
        .text('No games available');
    }

    if(gamesObject.n_Games > 0){
      d3.select('#divListGames').html('');
      const table = d3.select('#divListGames').append('table')
        .attr('class', 'mx-auto');
      const headers = ['Instructor', 'Team', 'Action']
      const thead = table.append('thead');
      const tbody = table.append('tbody');
      const ncols = headers.length;
      const headerRow = thead.append('tr');
      headers.forEach(elem => {
        headerRow.append('th')
          .attr('class','px-5')
          .text(elem)
      });
      gamesObject.games.forEach(elem => {
        const tr = tbody.append('tr').attr('class', 'text-center');
        tr.append('td').text(elem.instructor);
        const teamsSelect = tr.append('td').append('select')
          .attr('id', `sel${elem.id}`);
        const options = teamsSelect.selectAll("option")
          .data(elem.teams)
          .enter()
          .append("option");

        options.text(d => {
          return d.name;
        })
          .attr("value", d => {
            return d.name;
          });

        const markup = `
          <button class = "btn btn-primary"
            id = "bJoin${elem.id}">Join</button>
        `;
        tr.append('td').attr('class','py-1').html(markup);
        d3.select(`#bJoin${elem.id}`)
          .on('click', () => {
            const joinInfo = {
              'id': elem.id,
              'email': 'healthsimnuig@gmail.com',
              'team': d3.select(`#sel${elem.id}`).property("value"),
            }
            socket.emit('join game', joinInfo);
          });
      });
    }
  });
}

export const onPlayerAdded = (socket)=> {
  socket.on('player added', () => {
    $('#playerModal').modal('hide');
    $('#playerModal').on('hidden.bs.modal', e => {
      window.location.hash = '#player';
    });
  });
}

export const onGameStarted = socket => {
  socket.on('game started', payload => {
    templates.player.gameInterface(payload);
    const intPlayer = interfaces.player();
    intPlayer.buildGameInterface(socket, payload);
  });
}

export const onMessage = socket => {
  socket.on('message', payload => {
    templates.player.chatMessage(payload);
    const intPlayer = interfaces.player();
    intPlayer.newMessage();
  });
}

export const onPlayerDecisions = socket => {
  socket.on('player decisions received', () => {
    const intPlayer = interfaces.player();
    intPlayer.disableSimButton();
  });
}

export const onSimulationResults = socket => {
  socket.on('simulation result', payload => {
    const intPlayer = interfaces.player();
    intPlayer.updateOnResults(payload);
  });
}

export const onNewRoundStarted = socket => {
  socket.on('new round started', () => {
    const intPlayer = interfaces.player();
    intPlayer.startNewRound();
  });
}
