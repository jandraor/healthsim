'use strict';

const startGame = (socket, gameCollection, io, payload) => {
  const initConditions = payload.initConditions;
  const nRounds = payload.rounds;
  const virusSeverity = payload.virusSeverity;
  const writeCsv = require('../../../helpers/csvFiles.js');
  writeCsv(initConditions, './R_Models/games/game_1/model/data/Countries.csv');
  const exec = require('child_process').exec;
  const filePath = 'R_Models/games/game_1/srv_initialise.R';
  const fs = require('fs');
  if(!fs.existsSync(filePath)){
      const error = {
        'statusCode': 404,
        'error': 'File not found'
      };
      console.log(error);
  }

  exec(`Rscript ${filePath} ${virusSeverity}`, (error, stdout, stderr) => {
    const initValues = JSON.parse(stdout);
    const gameId = payload.gameId;
    const ids = gameCollection.gameList.map(elem => {
      return elem.id;
    });
    const gamePos = ids.indexOf(gameId);
    //it might be replaced by
    //gamePos = findGamePos(gameId);
    gameCollection.gameList[gamePos].status = 'on flight';
    const teamNames = gameCollection.gameList[gamePos].teams.map(elem => {
      return elem.name;
    });

    teamNames.forEach(elem => {
      const recipientTeam = elem;
      const otherTeams = teamNames.filter(elem2 => {
        return elem2 != recipientTeam;
      });

      const teamData = initValues.filter(dataRow => {
        return dataRow.Name === recipientTeam;
      });

      const playerPayload = {
        'yourTeam': recipientTeam,
        'population': teamData[0].Population,
        'incomeLevel': teamData[0].Category,
        'reportingDelay': teamData[0].ReportingDelay,
        'otherTeams': otherTeams,
        'rounds': nRounds,
        'resources': {
          'antivirals': teamData[0].InitAntiviralStockpile,
          'vaccines': teamData[0].InitVaccineStockpile,
          'ventilators': teamData[0].InitVentilatorStockpile,
          'financial': teamData[0].InitialFinancialResources,
        },
        'unitCosts': {
          'antivirals': teamData[0].AntiviralCostPerUnit,
          'vaccines': teamData[0].VaccineCostPerUnit,
          'ventilators': teamData[0].VentilatorCostPerUnit,
        },
        'infected': {
          'total': teamData[0].Infected,
          'nonSevere': teamData[0].Infected,
          'severe': 0,
          'quarantine': 0,
          'antivirals': 0,
        }
      }

      io.to(`${recipientTeam}_${gameId}`).emit('game started', playerPayload);
    });

    const teamsObject = generateTeamsObject(initValues);
    const instructorPayload = {
      'teams': teamsObject,
      'rounds': nRounds,
    }
    io.to(`instructor_${gameId}`).emit('game started', instructorPayload);
    gameCollection.gameList[gamePos]
  });
}

const generateTeamsObject = initValues => {
  const teamsObject = initValues.map(row => {
    const teamObject = {
      'name': row.Name,
      'population': row.Population,
      'incomeLevel': row.Category,
    }
    return teamObject;
  });
  return teamsObject
}

module.exports = startGame;
